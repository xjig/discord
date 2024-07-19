const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'urban',
    description: 'Search Urban Dictionary for a term',
    async execute(message, args) {
        const term = args.join(' ');
        if (!term) {
            return message.reply('Please specify a term to search for.');
        }

        try {
            const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);
            const definition = response.data.list[0];

            const urbanEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Definition for "${term}"`)
                .setDescription(definition ? definition.definition : 'No definition found.')
                .addFields(
                    { name: 'Example', value: definition.example || 'No example found.', inline: true },
                    { name: 'Author', value: definition.author || 'Unknown', inline: true }
                );

            message.reply({ embeds: [urbanEmbed] });
        } catch (error) {
            message.reply('There was an error searching Urban Dictionary.');
        }
    },
};
