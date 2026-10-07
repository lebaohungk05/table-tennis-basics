# The Art of the Rally

Responsive Design final project by Le Bao Hung.

- Website: https://lebaohungk05.github.io/table-tennis-basics/responsive-final-project/
- Responsive homework: https://lebaohungk05.github.io/table-tennis-basics/responsive/
- Earlier CSS project: https://lebaohungk05.github.io/table-tennis-basics/final-project/

Adapted from the [WD4E starter structure](https://github.com/academic-innovation-online-learning/WD4E-Advanced_Styling_with_Responsive_Design/tree/main/RD-week4-final_project_starter). All starter images and paragraph text have been replaced. The nine SVG illustrations come from my earlier table-tennis project.

## Rubric

The stylesheet has exactly four media queries, in this order:

1. `min-width: 772px`: two columns, circular figures, final figure spans both columns.
2. `min-width: 992px`: square corners, every third figure spans both columns.
3. `prefers-reduced-motion: reduce`: anchor scrolling becomes instant.
4. `prefers-color-scheme: dark`: dark figures, pale yellow text, black borders.

The mobile base uses a one-column grid and a 10px gap. No `max-width` rules and no repeated `display: grid` declarations are used. The page also has a keyboard skip link, visible focus styles, descriptive alt text for all nine images, and a jump-to-top link.

## Verification — 2026-10-07

- W3C Nu HTML checker: zero errors or warnings.
- Chrome layout checks at 320, 390, 771, 772, 820, 991, 992 and 1440px: passed, including no horizontal overflow and circular tablet figures.
- Live GitHub Pages checks: all nine images load; breakpoint behavior and both preference queries pass.
- Figure text contrast: 11.52:1 light, 9.71:1 dark.
- axe-core 4.10.3: zero violations in both color schemes.
- WAVE on the public website: zero errors, zero contrast errors, zero alerts; AIM score 10/10. Automated checks do not replace manual accessibility review.

`check.cjs` runs the local checks with an installed Playwright package. Set `PLAYWRIGHT_MODULE` if Playwright is outside the project, `SITE_URL` to check a hosted copy, and optionally `AXE_SCRIPT` to an axe-core script file. Chrome must be installed. Generated screenshots are local review artifacts.
