# Importar exactamente la entrega de Claude — Informática 8

**Estado:** preparado, pero **la importación binaria aún no se ha ejecutado**. El sitio público continúa en la versión previa hasta publicar la entrega.

## Fuente autorizada

Archivo: `Inform-tica-Octavo-completo.zip`, entregado por el usuario en ChatGPT.

SHA-256 exacto:

```
d6ad80f0a1d67cb3bc161a2414e20486a064b05dba5e4f1de5de2040c497e39a
```

Contiene 43 archivos, incluyendo **30 GIF** originales bajo `assets/gifs/`, `motion-figures.js`, `motion-figures.css`, `hub-enhanced.css` y las páginas HTML. El ZIP adicional `gifs-informatica-8.zip` reproduce estos archivos de animación y **no es necesario** para completar la importación.

## Único paso necesario

1. Abrir https://github.com/IJR-JD/Inform-tica-Octavo/releases/new.
2. Crear un tag nuevo (por ejemplo `claude-ti8-v1`) desde `main`.
3. Adjuntar **sin modificar** el ZIP exacto llamado `Inform-tica-Octavo-completo.zip`.
4. Publicar la release.

El workflow `.github/workflows/import-claude-package.yml` se ejecutará, comprobará el SHA-256 y el formato GIF, extraerá todos los archivos, actualizará `main` y publicará GitHub Pages en un solo proceso. No es necesario transcribir código ni subir 30 GIF individualmente.

El workflow no aceptará un ZIP diferente aunque tenga el mismo nombre. Se mantendrá el sitio anterior si la validación falla.

## Verificación previa ya efectuada

- `node --check motion-figures.js`: PASS.
- JavaScript embebido en `index.html` y `unidad-01-excel/index.html`: PASS.
- Enlaces locales a scripts y estilos: existentes en el paquete.
- Animaciones: 30 archivos GIF presentes.
- No se rediseñaron ni reescribieron los recursos de Claude.

**Nota:** las operaciones de GitHub Actions mediante `GITHUB_TOKEN` pueden estar limitadas por permisos de la organización; si el importador falla al hacer `git push`, se debe comprobar el permiso `contents: write` en las políticas de Actions del repositorio.
