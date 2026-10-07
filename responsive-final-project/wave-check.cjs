const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}});
  await page.goto('https://wave.webaim.org/report#/https://lebaohungk05.github.io/table-tennis-basics/responsive-final-project/', {waitUntil: 'networkidle', timeout: 60000});
  await page.waitForFunction(() => /AIM Score: \d/.test(document.body.innerText), null, {timeout: 45000}).catch(() => console.log('WAVE report did not finish within 45 seconds.'));
  console.log((await page.locator('body').innerText()).slice(0,16000));
  await page.screenshot({path: __dirname + '/wave-report.png', fullPage: true});
  await browser.close();
})().catch(e => {console.error(e); process.exit(1);});
