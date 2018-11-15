const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
// const auth = require('./authtoken.js');
const auth = process.env.AUTH_TOKEN;
const messageHandler = require('./messagehandler.js');
// const settings = require('./settings.js');

client.on('ready', () => {
	console.log('Ready!');
	/* for (const channel in settings.general.channels) {
		writeContent(channel);
	} */
	const channels = findSiteChannels();
	for (let i = 0; i < channels.length; i++) {
		writeContent(channels[i]);
	}
	console.log(findSiteChannels());
	client.destroy();
});
client.login(auth);


function writeContent(channel) {
	const generalChan = client.channels.find('name', channel);
	// const channelType = settings.general.channels[channel];

	const channelSettings = {};
	const fromTopic = generalChan.topic.split(',').map(pair => pair.split(':'));
	fromTopic.forEach(([key, value]) => channelSettings[key] = value);
	console.log(channelSettings.type);


	generalChan.fetchMessages({ limit:100 })
		.then(messages => {
			messages.array().forEach(message => {

				const time = new Date(message.createdTimestamp);
				const year = time.getUTCFullYear();
				const month = ('0' + (time.getUTCMonth() + 1).toString()).slice(-2);
				const day = ('0' + (time.getUTCDate()).toString()).slice(-2);
				const date = year + '-' + month + '-' + day;
				// const hourminute = time.getUTCHours() + time.getUTCMinutes() + time.getUTCSeconds();
				messageHandler(message, channelSettings.type, date).then(function(result) {
					fs.writeFile('src/site/' + (channelSettings.type === 'post' || channelSettings.type === 'media' ? 'posts/' : '') + result.title + '-' + date + '.md', result.content, function(err) {
						if (err) throw err;
					});
				})
					.catch(console.error);
			//	TODO: for each published post, message.react('✅');
			});
		})
		.catch(console.error);
}

function findSiteChannels() {
	const channels = [];
	client.channels.forEach(channel => {
		if(channel.permissionsFor(client.user).has('MANAGE_CHANNELS')) {
			channels.push(channel.name);
		}
	});
	return channels;
}