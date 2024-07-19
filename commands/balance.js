const { getBalance } = require('../economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'Check your balance',
    execute(message, args) {
        const userId = message.author.id;

        getBalance(userId, (err, balance) => {
            if (err) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error fetching your balance.');

                return message.reply({ embeds: [errorEmbed] });
            }

            const balanceEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Balance')
                .setDescription(`Your balance is ${balance} coins.`);

            message.reply({ embeds: [balanceEmbed] });
        });
    },
};
