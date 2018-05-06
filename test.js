const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Ready!');
	const generalChan = client.channels.find('name', 'general');
	generalChan.fetchMessages({ limit:0 })
		.then(messages => {
		//	console.log(messages);
			messages.array().forEach(message => {
			//	const arr = message.content.split(' ');
				console.log(message.author.toString() + ': ' + message.content + message.createdAt);
				//	const author = message.author.toString();
				fs.writeFile('posts/' + message.createdTimestamp + '.md', message.content, function(err) {
					if (err) throw err;
					console.log('Saved!');
				});

			});
		})
		.catch(console.error);
});

client.login('NDQyNzA1NzIzNzgxMTUyNzY4.DdCuCQ.DuZEOsPJREyzk59-LV0wUAudNm8');
