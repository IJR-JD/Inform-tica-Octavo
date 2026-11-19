# TI-8 · Supabase Infrastructure (Instituto Jorge Robledo)

**Target project:** `cbrekmtcjxsmwgeqzhlb` · `https://cbrekmtcjxsmwgeqzhlb.supabase.co`

## Status

The SQL migration in `migrations/001_ti8_academic_foundation.sql` is **prepared in GitHub but NOT yet executed** on TI-8. Supabase connector authorization is not currently granted for this institutional project. The connected connector presently lists a separate personal project. Do not run this migration against that project.

The project dashboard confirms that TI-8 exists and is healthy, but not that the tables already exist.

## Student onboarding when emails are unknown

Do not invent emails or create fake Supabase Auth accounts. Use a stable opaque internal student code (not a password, not a national ID, not necessarily the class-list number), associated with a class and later linked to `auth.users.id`.

Proposed onboarding stages:

1. **Stage A — before students are known:** prepare classes `8A`, `8B`, `8C` and lessons. Keep roster empty.
2. **Stage B — after receiving the official student list:** import students under temporary identifiers, avoiding personal data on GitHub. This is a private administrative operation; `student_code` is not proof of identity.
3. **Stage C — student authentication:** select **one** institution-approved sign-in option. Prefer verified school email or staff-provisioned accounts with a recovery procedure. If choosing Supabase anonymous authentication, plan for loss of access after clearing browser data, abuse prevention, student-to-identity linking and explicit RLS treatment of `is_anonymous`. Do not enable it for production just to bypass lack of emails.
4. **Stage D — link:** authenticated student's UUID is connected to one roster entry after a coordinator-approved or teacher-verified enrollment process. Never allow a publicly submitted code alone to claim another student's history.
5. **Stage E — assessment:** configure authorized write endpoints, validation against the official answer key and teacher-controlled grading. Until then, the public Learning Hub's browser-local exercises remain **formative**, and are **not** persisted as institutional marks.

## Data model

| Table | Purpose |
| --- | --- |
| `ti8_classes` | School year and teaching groups |
| `ti8_staff` | Teacher/coordinator/admin identities |
| `ti8_students` | Email-independent roster, with optional future Supabase Auth UUID |
| `ti8_class_memberships` | Student membership in a particular class |
| `ti8_lessons` | Course catalog |
| `ti8_lesson_progress` | Lesson progress linked to student identity |
| `ti8_evaluation_attempts` | Formative attempts and evaluated work, without public writes |

The migration enables **RLS on every new public table**, limits student-facing reads to their own records, and deliberately does not grant student writes, public code claiming, or teacher-admin access before an institutional authentication/authorization process exists.

## Authorized deployment steps

1. Reconnect the Supabase plugin under the **IJR-JD organization**, granting access to project `cbrekmtcjxsmwgeqzhlb`.
2. Inspect existing `public` tables, migrations and security advisors. Avoid duplicate names or unexpected collisions.
3. Apply the migration to **TI-8 only** using the Supabase migration tool. Verify tables, constraints, RLS, policies, and insert/read restrictions.
4. Add the authorized teacher's actual Supabase Auth UUID to `ti8_staff` through a privileged administrative operation (never from public JS).
5. Create actual class groups after confirming labels with coordination.
6. Select the authorized onboarding method and implement the secure registration endpoint, membership management, rate limiting, abuse protections and identity recovery.
7. Only then configure GitHub Pages with the project URL and *publishable* key and connect the Learning Hub. **Never deploy service_role or secret keys to GitHub Pages.**
8. Run a two-user security test: one student's JWT must never read or write another student's records. Exercise unauthenticated access and a revoked/disabled account as well.

## Confidentiality and minors

Avoid real student names, grades, email addresses, contact details and enrollment codes in GitHub issues, commits, Pages, or public repositories. Student progress and assessment records should be held only in the secured institutional database, subject to the school's data protection policy and consent/notice process.

## References

- [Supabase authentication without email](https://supabase.com/docs/guides/auth/auth-anonymous)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Authentication configuration](https://supabase.com/docs/guides/auth/general-configuration)
