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
client.login(auth.token);


function writeContent(channel) {
	const generalChan = client.channels.find('name', channel);
	generalChan.fetchMessages({ limit:0 })
		.then(messages => {
			messages.array().forEach(message => {
			// console.log(message.author.toString() + ': ' + message.content + message.createdAt);
				const time = new Date(message.createdTimestamp);
				const year = time.getUTCFullYear();
				const month = time.getUTCMonth() + 1;
				const day = time.getUTCDate();
				const hourminute = time.getUTCHours() + time.getUTCMinutes() + time.getUTCSeconds();
				messageHandler(message.content).then(function(result) {
					fs.writeFile('posts/' + year + '-' + month + '-' + day + '-' + hourminute + '.md', result, function(err) {
						if (err) throw err;
					});
				});

			});
		})
		.catch(console.error);
}
