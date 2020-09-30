const Bot = require('./Bot');
const config = require('./Bot/config/puppeteer.json')

const run = async () => {
	const bot = new Bot();

	await bot.initPuppeteer().then(() => {
		console.log('Puppeteer est lancé')
	});
	await bot.visitInsta().then(() => {
		console.log('Connexion sur Insta réussie')
	});
	let tags = config.searchTags
	for(let tag of tags) {
		await bot.searchTag(tag)
	}
}

run().catch(e=> console.log(e.message))