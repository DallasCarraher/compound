import test from '@playwright/test'

test.describe('Routes', () => {
	test('end-to-end', async ({ page }) => {
		await page.goto('http://localhost:8080/end-to-end')
		await page.waitForSelector('.tl-canvas')
	})

	test('basic', async ({ page }) => {
		await page.goto('http://localhost:8080/develop')
		await page.waitForSelector('.tl-canvas')
	})

	test('api', async ({ page }) => {
		await page.goto('http://localhost:8080/api')
		await page.waitForSelector('.tl-canvas')
	})

	test('hide-ui', async ({ page }) => {
		await page.goto('http://localhost:8080/custom-config')
		await page.waitForSelector('.tl-canvas')
	})

	test('custom-config', async ({ page }) => {
		await page.goto('http://localhost:8080/custom-config')
		await page.waitForSelector('.tl-canvas')
	})

	test('custom-ui', async ({ page }) => {
		await page.goto('http://localhost:8080/custom-ui')
		await page.waitForSelector('.tl-canvas')
	})

	test('exploded', async ({ page }) => {
		await page.goto('http://localhost:8080/exploded')
		await page.waitForSelector('.tl-canvas')
	})

	test('scroll', async ({ page }) => {
		await page.goto('http://localhost:8080/scroll')
		await page.waitForSelector('.tl-canvas')
	})

	test('multiple', async ({ page }) => {
		await page.goto('http://localhost:8080/multiple')
		await page.waitForSelector('.tl-canvas')
	})

	test('error-boundary', async ({ page }) => {
		await page.goto('http://localhost:8080/error-boundary')
		await page.waitForSelector('.tl-canvas')
	})

	test('user-presence', async ({ page }) => {
		await page.goto('http://localhost:8080/user-presence')
		await page.waitForSelector('.tl-canvas')
	})

	test('ui-events', async ({ page }) => {
		await page.goto('http://localhost:8080/ui-events')
		await page.waitForSelector('.tl-canvas')
	})

	test('store-events', async ({ page }) => {
		await page.goto('http://localhost:8080/store-events')
		await page.waitForSelector('.tl-canvas')
	})

	test('persistence', async ({ page }) => {
		await page.goto('http://localhost:8080/persistence')
		await page.waitForSelector('.tl-canvas')
	})

	test('snapshots', async ({ page }) => {
		await page.goto('http://localhost:8080/snapshots')
		await page.waitForSelector('.tl-canvas')
	})
})
