-- TI-8 / Instituto Jorge Robledo
-- Migration 001: protected academic foundation, email-independent identity.
-- Apply ONLY to project cbrekmtcjxsmwgeqzhlb after confirming access.
-- No student accounts, student names, emails, or enrolment secrets are created here.
create extension if not exists pgcrypto;

create table if not exists public.ti8_classes (
 id uuid primary key default gen_random_uuid(),
 academic_year integer not null check (academic_year between 2026 and 2100),
 code text not null check (char_length(code) between 2 and 32),
 title text not null check (char_length(title) between 2 and 120),
 active boolean not null default true,
 created_at timestamptz not null default now(),
 unique (academic_year,code)
);
create table if not exists public.ti8_staff (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('teacher','coordinator','admin')),
 created_at timestamptz not null default now()
);
create table if not exists public.ti8_students (
 id uuid primary key default gen_random_uuid(),
 auth_user_id uuid unique references auth.users(id) on delete set null,
 student_code text unique not null check (student_code ~ '^[A-Z0-9_-]{4,24}$'),
 display_alias text check (display_alias is null or char_length(display_alias) <= 60),
 account_status text not null default 'pending' check (account_status in ('pending','active','disabled')),
 created_at timestamptz not null default now(),
 linked_at timestamptz,
 constraint ti8_linked_status_consistency check (auth_user_id is null or linked_at is not null)
);
create table if not exists public.ti8_class_memberships (
 class_id uuid not null references public.ti8_classes(id) on delete cascade,
 student_id uuid not null references public.ti8_students(id) on delete cascade,
 status text not null default 'enrolled' check (status in ('enrolled','inactive','completed')),
 joined_at timestamptz not null default now(),
 primary key (class_id,student_id)
);
create index if not exists ti8_class_memberships_student_idx on public.ti8_class_memberships(student_id);
create table if not exists public.ti8_lessons (
 id text primary key check (id ~ '^ti8-[a-z0-9-]{3,80}$'),
 title text not null,
 unit_number integer not null check (unit_number between 1 and 60),
 position integer not null default 1,
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create index if not exists ti8_lessons_unit_idx on public.ti8_lessons(unit_number,position);
create table if not exists public.ti8_lesson_progress (
 student_id uuid not null references public.ti8_students(id) on delete cascade,
 lesson_id text not null references public.ti8_lessons(id) on delete cascade,
 state text not null default 'not_started' check (state in ('not_started','in_progress','completed')),
 completed_steps integer not null default 0 check (completed_steps between 0 and 100),
 last_seen_at timestamptz not null default now(),
 completed_at timestamptz,
 primary key (student_id,lesson_id)
);
create table if not exists public.ti8_evaluation_attempts (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.ti8_students(id) on delete cascade,
 lesson_id text not null references public.ti8_lessons(id) on delete cascade,
 attempted_at timestamptz not null default now(),
 submitted_at timestamptz,
 attempt_number integer not null check (attempt_number > 0),
 score numeric(6,2) check (score is null or score between 0 and 100),
 max_score numeric(6,2) check (max_score is null or max_score > 0),
 answer_data jsonb not null default '{}'::jsonb,
 evaluated_by text not null default 'formative' check (evaluated_by in ('formative','teacher')),
 unique(student_id,lesson_id,attempt_number)
);
create index if not exists ti8_attempts_student_lesson_idx on public.ti8_evaluation_attempts(student_id,lesson_id,attempted_at desc);

-- RLS: every exposed table is explicitly protected.
alter table public.ti8_classes enable row level security;
alter table public.ti8_staff enable row level security;
alter table public.ti8_students enable row level security;
alter table public.ti8_class_memberships enable row level security;
alter table public.ti8_lessons enable row level security;
alter table public.ti8_lesson_progress enable row level security;
alter table public.ti8_evaluation_attempts enable row level security;

-- Grant only access required for reading own information. No public writes
-- to student identities, memberships or role assignments.
revoke all on public.ti8_classes,public.ti8_staff,public.ti8_students,
  public.ti8_class_memberships,public.ti8_lessons,
  public.ti8_lesson_progress,public.ti8_evaluation_attempts from anon;
grant select on public.ti8_classes,public.ti8_staff,public.ti8_students,
  public.ti8_class_memberships,public.ti8_lessons,
  public.ti8_lesson_progress,public.ti8_evaluation_attempts to authenticated;

-- Policies are created in a single DO block to keep migrations idempotent.
do $policies$
begin
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_staff' and policyname='staff_self_read') then
  create policy staff_self_read on public.ti8_staff for select to authenticated
  using (user_id = (select auth.uid()));
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_students' and policyname='student_self_read') then
  create policy student_self_read on public.ti8_students for select to authenticated
  using (auth_user_id = (select auth.uid()) and account_status = 'active');
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_classes' and policyname='classes_member_read') then
  create policy classes_member_read on public.ti8_classes for select to authenticated
  using (exists (
    select 1 from public.ti8_class_memberships m
    join public.ti8_students s on s.id = m.student_id
    where m.class_id = id and s.auth_user_id = (select auth.uid()) and s.account_status = 'active' and m.status = 'enrolled'
  ));
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_class_memberships' and policyname='membership_self_read') then
  create policy membership_self_read on public.ti8_class_memberships for select to authenticated
  using (exists (
    select 1 from public.ti8_students s
    where s.id = student_id and s.auth_user_id = (select auth.uid()) and s.account_status = 'active'
  ));
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_lessons' and policyname='published_lessons_read') then
  create policy published_lessons_read on public.ti8_lessons for select to authenticated
  using (published = true);
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_lesson_progress' and policyname='progress_self_read') then
  create policy progress_self_read on public.ti8_lesson_progress for select to authenticated
  using (exists (
    select 1 from public.ti8_students s
    where s.id = student_id and s.auth_user_id = (select auth.uid()) and s.account_status = 'active'
  ));
 end if;
 if not exists(select 1 from pg_policies where schemaname='public' and tablename='ti8_evaluation_attempts' and policyname='attempt_self_read') then
  create policy attempt_self_read on public.ti8_evaluation_attempts for select to authenticated
  using (exists (
    select 1 from public.ti8_students s
    where s.id = student_id and s.auth_user_id = (select auth.uid()) and s.account_status = 'active'
  ));
 end if;
end $policies$;

-- Seed only curriculum entries, never identifying student data.
insert into public.ti8_lessons (id,title,unit_number,position,published) values
 ('ti8-excel-foundations','Excel: celdas, filas y columnas',1,1,true),
 ('ti8-excel-arithmetic','Operaciones con celdas',2,1,true),
 ('ti8-excel-debugging','Errores y depuración',3,1,true),
 ('ti8-excel-charts','Gráficos y decisiones',4,1,true),
 ('ti8-excel-business','Proyecto comercial',5,1,true),
 ('ti8-excel-references','Referencias relativas y absolutas',6,1,true),
 ('ti8-excel-functions','Funciones estadísticas básicas',7,1,true),
 ('ti8-html-structure','HTML: estructura',8,1,true),
 ('ti8-css-design','CSS: diseño y accesibilidad',9,1,true),
 ('ti8-html-content','Organización de contenidos web',10,1,true),
 ('ti8-html-project','Proyecto final web',11,1,true),
 ('ti8-qa','Validación de proyectos',12,1,true)
on conflict (id) do nothing;

-- Deliberately excluded until institution decides the registration method:
-- (1) code-based account claim, (2) anonymous Auth onboarding,
-- (3) teacher-side management API and student write policies.
-- A public registration token is NOT safe as the sole authentication factor.
