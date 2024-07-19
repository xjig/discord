const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'joke',
    description: 'Get a random joke',
    async execute(message) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const joke = response.data;

            const jokeEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Here\'s a joke for you!')
                .setDescription(`${joke.setup}\n\n*${joke.punchline}*`);

            message.reply({ embeds: [jokeEmbed] });
        } catch (error) {
            message.reply('There was an error fetching a joke.');
        }
    },
};
