function frontMatter(message, ...metaData) {
	return '--- \n' + metaData.join('\n') + '\n---\n' + message;
}
function titleCreator(str) {
	str = str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '');
	str = str.split('\n')[0];
	return str.substring(0, 50);
}

module.exports = function messageHandler(msg, type, date) {

	const embed = msg;
	msg = msg.content;

	if (embed.embeds[0] !== undefined || embed.embeds !== [] || embed.embeds[0].title !== undefined) {
		


		return new Promise(function(resolve, reject) {

			if (msg.length === 0 || msg === undefined || type === undefined || date === undefined  ) {
				reject('error: NO MESSAGE');
			}



			if (type === 'media' && (embed.embeds[0] === undefined )) {
				reject('error: Media type defined. Not processed since no embed was found.');
			}


			else {
				const title = embed.embeds[0].title;
				const embedThis = embed.embeds[0].url;
				const user = embed.embeds[0].message.author.username;
				
				if (embedThis.length === msg.length) {
					msg = '';
				}
				
				if (msg.includes(embedThis)) {
					msg = msg.replace(embedThis, '');
				}


				if (embedThis.includes('youtube.com') || embedThis.includes('youtu.be')) {
					const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
					const id = embedThis.match(regExp);

					if (id && id[2].length == 11) {
						msg = msg + '\n<iframe width="560" height="315" src="//www.youtube.com/embed/' + id[2] + '" frameborder="0" allowfullscreen></iframe>';
					}
				}

				if (embedThis.includes('spotify.com')) {
					msg = msg + '\n<iframe src="' + embedThis + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
				}

				if (embedThis.includes('soundcloud.com')) {
					msg = embedThis + '\n SoundCloud widgets are stupid.';
				}

				resolve({ "content": frontMatter(msg, 
						'title: ' + titleCreator(title),
						   'author: ' + user,
						   "tags: " + type,
						   "date: " + date),
						   // FRONT MATTER ABOVE THIS
						   "title": titleCreator(title).replace('/\s/g','_'),
						});
			}
		});
	}
	else if (type !== 'media') {
		// MAKE THIS PROMISE USEFUL SOME DAY
		return new Promise(function(resolve, reject) {
			if (msg.length > 15000) {
				reject('error: Message too long to parse');
			}
			else {
				resolve({ "content": frontMatter(msg, 
					'title: ' + titleCreator(msg),
					   // 'author: ' + user,
					   "tags: " + type,
					   "date: " + date),
					   // FRONT MATTER ABOVE THIS
					   "title": titleCreator(msg).replace('/\s/g','_'),
					});
			}

		});
	}

};
