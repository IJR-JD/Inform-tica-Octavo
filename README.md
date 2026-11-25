# Inform-tica-Octavo
Informática-Octavo

## Demostraciones animadas
- `motion-figures.js` / `motion-figures.css`: motor compartido (hoja de cálculo y editor HTML/CSS). Lo usan el Hub (`index.html`, vista Theory) y `unidad-01-excel/`.
- `hub-enhanced.css`: refinamientos visuales del Hub.
- `assets/gifs/`: GIF de cada tema (`topic-01…12.gif`) y de cada ejercicio de la unidad 01 (`u01-*.gif`); `assets/gifs/thumbs/` contiene las miniaturas ligeras de las tarjetas.

## TI8 Learning Studio
- `studio-shell.css`: shared light workspace appearance and global navigation across all seven routes.
- `tests/studio-shell-qa.mjs`: checks navigation, responsive widths and consistent diagnostic wording.
- Existing lesson engines, media, grading rules and browser storage are unchanged. The visual reference is an interpretation of AniMotionPDF; the private source was unavailable for exact parity.

### Vector media workspace
12 resolution-independent lesson previews generated from the original SVG engine; a direct step timeline and playback speed; 7 Unit 01 interactive figures and 15 contextual seed-based SVG illustrations in units 02–04. Existing MP4 files are retained as optional media. No external AniMotionPDF assets are copied because the private repository is inaccessible from the current connection.

### Shared Excel Core
All four calculation surfaces use `excel-core.js`. Scalar educational subset, not the Microsoft Excel engine. Spanish mode uses semicolon arguments and decimal comma (also decimal dot for existing exercises); English mode uses comma arguments and decimal dot. The extended lab provides ten optional challenges without changing existing module progress keys. Exclusions: full workbooks, arrays, dates, named ranges, exact Excel paste/format behavior, arbitrary Excel functions. Circular and syntax errors retain simulator-specific labels. Regression tests: `tests/excel-core-qa.mjs`.
