const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
// const auth = require('./authtoken.js');
const auth = process.env.AUTH_TOKEN;
const messageHandler = require('./messagehandler.js');
const settings = require('./settings.js');

client.on('ready', () => {
	console.log('Ready!');
	for (const channel in settings.general.channels) {
		writeContent(channel);
	}
	client.destroy();
});
client.login(auth);


function writeContent(channel) {
	const generalChan = client.channels.find('name', channel);
	const channelType = settings.general.channels[channel];
	const channelSettings = {};
	const fromTopic = generalChan.topic.split(',').map(pair => pair.split(':'));
	fromTopic.forEach(([key, value]) => channelSettings[key] = value);
	console.log(channelSettings.type);

	generalChan.fetchMessages({ limit:100 })
		.then(messages => {
			messages.array().forEach(message => {

				const time = new Date(message.createdTimestamp);
				const year = time.getUTCFullYear();
				const month = time.getUTCMonth() + 1;
				const day = time.getUTCDate();
				// const hourminute = time.getUTCHours() + time.getUTCMinutes() + time.getUTCSeconds();
				messageHandler(message, channelType).then(function(result) {
					fs.writeFile('src/site/posts/' + result.title + '-' + year + '-' + month + '-' + day + '.md', result.content, function(err) {
						if (err) throw err;
					});
				})
					.catch(console.error);
			//	TODO: for each published post, message.react('✅');
			});
		})
		.catch(console.error);
}
