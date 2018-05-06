const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const auth = require('./authtoken.js');
const messageHandler = require('./messagehandler.js');

client.on('ready', () => {
	console.log('Ready!');
	const generalChan = client.channels.find('name', 'general');
	generalChan.fetchMessages({ limit:0 })
		.then(messages => {
			messages.array().forEach(message => {
				console.log(messageHandler(message.content));
				// console.log(message.author.toString() + ': ' + message.content + message.createdAt);
				fs.writeFile('posts/' + message.createdTimestamp + '.md', messageHandler(message.content), function(err) {
					if (err) throw err;
				//	console.log(message.content);
				});

			});
		})
		.catch(console.error);
});
client.login(auth.token);
