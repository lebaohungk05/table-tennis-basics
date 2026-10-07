// Run locally with PLAYWRIGHT_MODULE pointing to an installed playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const page = await browser.newPage();
  const url = process.env.SITE_URL || pathToFileURL(path.join(__dirname, 'index.html')).href;
  for (const width of [320, 390, 771, 772, 820, 991, 992, 1440]) {
    await page.setViewportSize({width, height: 900});
    await page.goto(url);
    const layout = await page.evaluate(() => {
      const figures = [...document.querySelectorAll('figure')];
      return {
        columns: getComputedStyle(document.querySelector('.grid')).gridTemplateColumns.split(' ').length,
        gap: getComputedStyle(document.querySelector('.grid')).gap,
        overflow: document.documentElement.scrollWidth > innerWidth,
        figures: figures.map(f => ({span: getComputedStyle(f).gridColumn, radius: getComputedStyle(f).borderRadius, w: f.clientWidth, h: f.clientHeight})),
        images: [...document.images].every(i => i.hasAttribute('alt') && i.alt.length > 0)
      };
    });
    assert.equal(layout.columns, width < 772 ? 1 : 2);
    assert.equal(layout.gap, '10px');
    assert.equal(layout.overflow, false);
    assert.equal(layout.images, true);
    layout.figures.forEach((f, i) => {
      if (width >= 772 && width < 992) { assert.equal(f.radius, '50%'); assert.ok(Math.abs(f.w-f.h) <= 1); }
      if (width >= 992) { assert.equal(f.radius, '0px'); assert.equal(f.span === '1 / -1', (i+1)%3 === 0); }
    });
    if (width >= 772 && width < 992) assert.equal(layout.figures[8].span, '1 / -1');
    console.log(`PASS layout ${width}px`);
  }
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({colorScheme, reducedMotion: 'reduce'});
    const result = await page.evaluate(() => {
      const f = getComputedStyle(document.querySelector('figure'));
      const luminance = color => {
        const c = color.match(/\d+/g).slice(0,3).map(Number).map(v => {v /= 255; return v <= 0.04045 ? v/12.92 : ((v+0.055)/1.055)**2.4;});
        return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
      };
      const a = luminance(f.color), b = luminance(f.backgroundColor);
      return {scroll: getComputedStyle(document.documentElement).scrollBehavior, border: f.borderColor, contrast: (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)};
    });
    assert.equal(result.scroll, 'auto');
    assert.ok(result.contrast >= 4.5);
    if (colorScheme === 'dark') assert.equal(result.border, 'rgb(0, 0, 0)');
    console.log(`PASS ${colorScheme}: reduced motion; contrast ${result.contrast.toFixed(2)}:1`);
    if (process.env.AXE_SCRIPT) {
      await page.addScriptTag({path: process.env.AXE_SCRIPT});
      const audit = await page.evaluate(async () => (await axe.run()).violations.map(v => ({id:v.id, impact:v.impact, description:v.description})));
      console.log('Accessibility audit', colorScheme, JSON.stringify(audit));
      assert.equal(audit.length, 0);
    }
    for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); }
    await page.screenshot({path: path.join(__dirname, `${colorScheme}-preview.png`), fullPage: true});
  }
  await page.emulateMedia({reducedMotion: 'no-preference'});
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'smooth');
  for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); }
  console.log('PASS all 9 images load; default smooth scrolling');
  await browser.close();
})().catch(e => {console.error(e); process.exit(1);});
