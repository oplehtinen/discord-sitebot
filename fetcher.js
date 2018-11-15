const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const auth = require('./authtoken.js');
const messageHandler = require('./messagehandler.js');
const settings = require('./settings.js');

client.on('ready', () => {
	console.log('Ready!');
	for (const channel in settings.general.channels) {
		writeContent(channel);
	}
});
client.login(auth);


function writeContent(channel) {
	const generalChan = client.channels.find('name', channel);
	const channelType = settings.general.channels[channel];


	generalChan.fetchMessages({ limit:100 })
		.then(messages => {
			messages.array().forEach(message => {

				const time = new Date(message.createdTimestamp);
				const year = time.getUTCFullYear();
				const month = time.getUTCMonth() + 1;
				const day = time.getUTCDate();
				const hourminute = time.getUTCHours() + time.getUTCMinutes() + time.getUTCSeconds();
				// console.log(message.embeds[0].description);
				messageHandler(message, channelType).then(function(result) {
					fs.writeFile('posts/' + year + '-' + month + '-' + day + '-' + hourminute + '.md', result, function(err) {
						// console.log(result);
						if (err) throw err;
					});
				})
					.catch(console.error);
			//	TODO: for each published post, message.react('✅');
			});
		})
		.catch(console.error);
}
