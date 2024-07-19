const { gamble } = require('../economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'gamble',
    description: 'Gamble a certain amount of coins for a chance to win double or lose everything',
    execute(message, args) {
        const amount = parseInt(args[0], 10);

        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please specify a valid amount to gamble.');
        }

        const userId = message.author.id;

        gamble(userId, amount, (err, result) => {
            if (err) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error processing your gamble. Ensure you have enough balance.');

                return message.reply({ embeds: [errorEmbed] });
            }

            const gambleEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Gamble Result')
                .setDescription(result);

            message.reply({ embeds: [gambleEmbed] });
        });
    },
};
