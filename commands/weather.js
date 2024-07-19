const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Get the current weather for a location',
    async execute(message, args) {
        const location = args.join(' ');
        if (!location) {
            return message.reply('Please specify a location.');
        }

        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=7187f25308f3414c8a205707241907&q=${location}`);
            const data = response.data;

            const weatherEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Weather for ${data.location.name}`)
                .setDescription(`Current temperature: ${data.current.temp_c}°C\nCondition: ${data.current.condition.text}`)
                .setThumbnail(data.current.condition.icon);

            message.reply({ embeds: [weatherEmbed] });
        } catch (error) {
            message.reply('There was an error fetching the weather information.');
        }
    },
};
