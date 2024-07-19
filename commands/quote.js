const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'quote',
    description: 'Get a random quote',
    execute(message) {
        const quotes = [
            '“The greatest glory in living lies not in never falling, but in rising every time we fall.” – Nelson Mandela',
            '“The purpose of our lives is to be happy.” – Dalai Lama',
            '“Life is what happens when you’re busy making other plans.” – John Lennon',
            '“Get busy living or get busy dying.” – Stephen King',
        ];

        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const quoteEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Random Quote')
            .setDescription(quote);

        message.reply({ embeds: [quoteEmbed] });
    },
};
