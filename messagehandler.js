const getMetadata = require('./metadata.js');
const cheerio = require('cheerio');
const rp = require('request-promise');

module.exports = function messageHandler(msg) {
	msg = msg.toString();
	let url = msg.match(/\bhttps?:\/\/\S+/gi);

	if (url !== null) {
		const options = {
			uri: url.toString(),
			transform: function(body) {
				return cheerio.load(body);
			},
		};
		return rp(options)
			.then(function($) {
				console.log('1 ' + url);
				const title = $('title').text();
				// return $('title').text();
				// console.log('2 ' + url);
				console.log(title);
				// return title;


				// url = url.toString();

				// YOUTUBE EMBED
				if (url.includes('youtube.com') || url.includes('youtu.be')) {
					const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
					const id = url.match(regExp);
					if (id && id[2].length == 11) {
						msg = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + id[2] + '" frameborder="0" allowfullscreen></iframe>';
					}

				}

				// SPOTIFY embed
				if (url.includes('spotify.com')) {
					msg = msg + '\n<iframe src="' + url + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
				}
				console.log('WAT:' + title);
				// console.log(url);
				// const title =  getMetadata(url);
				return '---\n title: ' + title + '\n---\n' + msg;
				// console.log(msg);
				// getData(url);

				// return msg;
			});
	}
	else {
		return new Promise(function(resolve, reject) {
			if (msg.length > 15000) {
				reject('error');
			}
			else {
				resolve(msg);
			}

		});
	}

};
