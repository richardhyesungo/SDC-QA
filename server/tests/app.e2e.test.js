describe('Catwalk', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });
  // afterAll(async () => {
  //   await page.close();
  // });

  it('should display "Camo Onesie" text on page', async () => {
    await expect(page).toMatch('Camo Onesie');
  });

  it('should click on camo onesie', async () => {
    await page.click('a');
  });

  it('Should have text on the page', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    await expect(text).toContain('SELECT');
  });

  it('Should have camo on the page', async () => {
    const text2 = await page.evaluate(async () => document.body.textContent);
    await expect(text2).toContain('SELECT SIZE');
  });
  it('should be titled "Catwalk"', async () => {
    await expect(page.url()).toEqual('http://localhost:8080/products/39333');
  });
});
