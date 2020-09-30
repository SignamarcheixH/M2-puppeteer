class InstaBot {
	constructor() {
		this.firebase = require('./firebase_db.js')
		this.config = require('./config/puppeteer.json')
	}

	async initPuppeteer() {
		const pupeeteer = require("puppeteer");
		this.browser = await pupeeteer.launch({
			headless: this.config.settings.headless
		});
		this.page = await this.browser.newPage();
		await this.page.setViewport({width: 1500, height: 764})
	}

	async visitInsta() {
		await this.page.goto(this.config.base_url);
		await this.page.waitForTimeout(2500);
		await this.page.click(this.config.selectors.username_field);
		await this.page.keyboard.type(this.config.username)
		await this.page.click(this.config.selectors.password_field);
		await this.page.keyboard.type(this.config.password)
		await this.page.click(this.config.selectors.login_button);
		await this.page.waitForTimeout(2500);
		let declineCredsButton = await this.page.evaluate((x)=> {
			let buttons = document.querySelectorAll(x) 
			return buttons[buttons.length - 1]
		}, this.config.selectors.register_creds_modal)
		// console.log(declineCredsButton)
		// if(declineCredsButton) {
		// 	console.log(declineCredsButton)
		// }
	
	}

	async searchTag(tag) {
		await this.page.waitForTimeout(2500);
		await this.page.goto(`${this.config.base_url}explore/tags/${tag}`)

		const items = await this.page.$$('article > div:nth-child(1) a > div') //posts
		
		for(let item of items) {
			await this.handleItem(item)
		}
	}

	async handleItem(item) {
		await item.click()
		await this.page.waitForTimeout(2000)
		let svg_button = await this.page.$(this.config.selectors.svg_button)
		let color = await this.page.$eval(this.config.selectors.svg_like, item => item.getAttribute('fill'))
		if(color == "#262626") { //ie not liked yet
			await svg_button.click()
		}
		let sub_button = await this.page.$(this.config.selectors.subscribe_button)
		let text = await this.page.$eval(this.config.selectors.subscribe_button, item => item.innerText)
		console.log(text)
		if(text.localeCompare("S’abonner") == 0) { //ie same text
 			await sub_button.click()
		}

		await this.page.keyboard.press('Escape')
	}
}

module.exports = InstaBot;