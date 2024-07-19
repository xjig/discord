const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'Get a random dog picture',
    async execute(message) {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            const dogImage = response.data.message;

            const dogEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Here\'s a cute dog!')
                .setImage(dogImage);

            message.reply({ embeds: [dogEmbed] });
        } catch (error) {
            message.reply('There was an error fetching a dog picture.');
        }
    },
};
