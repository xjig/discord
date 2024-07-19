const { transferBalance } = require('../economy');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'transfer',
    description: 'Transfer money to another user',
    execute(message, args, MessageEmbed) {
        const fromId = message.author.id;
        const toUser = message.mentions.users.first();
        const amount = parseInt(args[1], 10);

        if (!toUser || isNaN(amount) || amount <= 0) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Invalid Input')
                .setDescription('Please mention a valid user and specify a valid amount.');

            return message.reply({ embeds: [errorEmbed] });
        }

        transferBalance(fromId, toUser.id, amount, (err) => {
            if (err) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('There was an error transferring money. Ensure you have enough balance.');

                return message.reply({ embeds: [errorEmbed] });
            } else {
                const successEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Success')
                    .setDescription(`Successfully transferred ${amount} coins to ${toUser.tag}.`);

                message.reply({ embeds: [successEmbed] });
            }
        });
    },
};
