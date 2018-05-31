module.exports = function messageHandler(msg) {

	// msg = msg.toString();
	const embed = msg;

	msg = msg.content;
	console.log(msg);


	if (embed.embeds[0] !== undefined) {
		const title = embed.embeds[0].title;
		const embedThis = embed.embeds[0].url;
		return new Promise(function(resolve, reject) {
			if (msg.length === 0) {
				reject('error: NO MESSAGE');
			}
			else {
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

				if (embedThis.includes('soundcloud.com')) {
					msg = embedThis + '\n SoundCloud widgets are stupid.';
				}
				resolve('---\n layout: post \n title: "' + title + '"\n---\n' + msg);
			}
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
