module.exports = function messageHandler(msg) {
	msg = msg.toString();


	// YOUTUBE EMBED
	if (msg.includes('youtube.com') || msg.includes('youtu.be')) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const id = msg.match(regExp);
		if (id && id[2].length == 11) {
		//	return id[2];
			console.log(id[2]);
			return '<iframe width="560" height="315" src="//www.youtube.com/embed/' + id[2] + '" frameborder="0" allowfullscreen></iframe>';
		}
		else {
			return msg;
		}
	}
};
