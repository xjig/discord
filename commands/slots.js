const { getBalance, addBalance } = require('../economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'slots',
    description: 'Play a slot machine game for a chance to win coins',
    execute(message, args) {
        const amount = parseInt(args[0], 10);

        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please specify a valid amount to gamble.');
        }

        const userId = message.author.id;

        getBalance(userId, (err, balance) => {
            if (err) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error processing your slot machine game. Ensure you have enough balance.');

                return message.reply({ embeds: [errorEmbed] });
            } else if (balance < amount) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Insufficient Funds')
                    .setDescription('You do not have enough balance to play the slot machine.');

                return message.reply({ embeds: [errorEmbed] });
            }

            const slots = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];
            const result = [];
            for (let i = 0; i < 3; i++) {
                result.push(slots[Math.floor(Math.random() * slots.length)]);
            }

            const isWinner = result[0] === result[1] && result[1] === result[2];
            const winAmount = amount * 3;

            const slotsEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Slot Machine')
                .setDescription(`${result.join(' | ')}\n\n${isWinner ? `Congratulations! You won ${winAmount} coins.` : `Sorry, you lost ${amount} coins.`}`);

            if (isWinner) {
                addBalance(userId, winAmount, () => {});
            } else {
                addBalance(userId, -amount, () => {});
            }

            message.reply({ embeds: [slotsEmbed] });
        });
    },
};
