module.exports = async client => {
    client.user.setPresence({
        status: 'online',
        game: {
            name: '🧉 Pampa-Bot 🧉',
            // type: 'STREAMING',
            // url: 'https://www.twitch.tv/felipeallmeida',
        },
    });
};