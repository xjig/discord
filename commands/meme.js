const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Get a random meme from Reddit',
    async execute(message) {
        try {
            const response = await axios.get('https://www.reddit.com/r/memes/random/.json');
            const meme = response.data[0].data.children[0].data;

            const memeEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(meme.title)
                .setImage(meme.url)
                .setURL(`https://www.reddit.com${meme.permalink}`);

            message.reply({ embeds: [memeEmbed] });
        } catch (error) {
            message.reply('There was an error fetching a meme.');
        }
    },
};
