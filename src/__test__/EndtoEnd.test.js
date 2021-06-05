import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event-container');
    });
    afterAll(() => {
        browser.close();
    });
    test('An event element is collasped by default', async () => {
        const eventDetails = await page.$('.event-container .event-details');
        expect(eventDetails).toBeNull();
    });
    test('User can expand an event to see it details', async () => {
        await page.click('.event-container .show-hide');
        const eventDetails = await page.$('.event-container .event-details');
        expect(eventDetails).toBeDefined();
    });
    test('user can collaspe an event to hide its details', async () => {
        await page.click('.event-container .show-hide');
        const eventDetails = await page.$('.event-container .event-details');
        expect(eventDetails).toBeNull();
    });
});