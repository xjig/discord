const axios = require('axios');
const { EmbedBuilder } = require('discord.js'); 

module.exports = {
    name: 'cat',
    description: 'Get a random cat picture',
    async execute(message) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            const catImage = response.data[0].url;

            const catEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Here\'s a cute cat!')
                .setImage(catImage);

            message.reply({ embeds: [catEmbed] });
        } catch (error) {
            message.reply('There was an error fetching a cat picture.');
        }
    },
};
