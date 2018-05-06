module.exports = function messageHandler(msg) {
	msg = msg.toString();


	// YOUTUBE EMBED
	if (msg.includes('youtube.com') || msg.includes('youtu.be')) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const id = msg.match(regExp);
		if (id && id[2].length == 11) {
			msg = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + id[2] + '" frameborder="0" allowfullscreen></iframe>';
		}

	}

	// SPOTIFY embed
	if (msg.includes('spotify.com')) {
		msg = '<iframe src="' + msg + '" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
	}
	msg = '---\n---\n' + msg;
	return msg;
};
