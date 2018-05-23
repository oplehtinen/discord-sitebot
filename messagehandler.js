const cheerio = require('cheerio');
const rp = require('request-promise');
const Autolinker = require('autolinker');

module.exports = function messageHandler(msg) {
	// msg = msg.toString();
	let url2 = msg.match(/\bhttps?:\/\/\S+/gi);
	let url = Autolinker.parse(msg, { urls: true, email: false, phone: false });
	let urltest;
	if (url2 !== null) {
		console.log(url.length);
		for (let i = 0; i < url.length; i++) {
			// console.log(url[i].getUrl());
			urltest = url[i].getUrl();
			// console.log(urltest);
		}
		url2 = url2.toString();
		const options = {
			uri: urltest,
			transform: function(body) {
				return cheerio.load(body);
			},
		};
		return rp(options)
			.then(function($) {
				const title = $('title').text();
				url = url.toString();
				Autolinker.link(msg, {
					replaceFn : function(match) {
						const embedThis = match.getUrl();
						console.log(title, urltest);

						if (embedThis.length === msg.length) {
							msg = '';
						}

						if (embedThis.includes('youtube.com') || embedThis.includes('youtu.be')) {
							const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
							const id = embedThis.match(regExp);

							if (id && id[2].length == 11) {
								msg = msg + '\n<iframe width="560" height="315" src="//www.youtube.com/embed/' + id[2] + '" frameborder="0" allowfullscreen></iframe>';
							}

						}
						// SPOTIFY embed
						if (embedThis.includes('spotify.com')) {
							msg = msg + '\n<iframe src="' + embedThis + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
							// console.log(title, msg);
						}

					},
				});

				return '---\n layout: post \n title: "' + title + '"\n---\n' + msg;
			});
	}
	else {
		// MAKE THIS PROMISE USEFUL SOME DAY
		return new Promise(function(resolve, reject) {
			if (msg.length > 15000) {
				reject('error: Message too long to parse');
			}
			else {
				msg = '---\n layout: post \n title: "' + titleCreator(msg) + '"\n---\n' + msg;
				resolve(msg);
			}

		});
	}
	function titleCreator(str) {
		return str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '');
	}
};
