const { addBalance } = require('../economy');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'addmoney',
    description: 'Add money to a user\'s balance (admin only)',
    execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Permission Denied')
                .setDescription('You do not have permissions to use this command.');

            return message.reply({ embeds: [errorEmbed] });
        }

        const user = message.mentions.users.first();
        const amount = parseInt(args[1], 10);

        if (!user || isNaN(amount) || amount <= 0) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Invalid Input')
                .setDescription('Please mention a valid user and specify a valid amount.');

            return message.reply({ embeds: [errorEmbed] });
        }

        addBalance(user.id, amount, (err) => {
            if (err) {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error adding money.');

                return message.reply({ embeds: [errorEmbed] });
            }

            const successEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Success')
                .setDescription(`${amount} coins have been added to ${user.tag}'s balance.`);

            message.reply({ embeds: [successEmbed] });
        });
    },
};
