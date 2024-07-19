const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'close',
    description: 'Close a ticket',
    async execute(message) {
        const { channel, member } = message;
        const { adminRoleId } = require('../config.json');

        if (!member.roles.cache.has(adminRoleId)) {
            return message.reply('You do not have permission to close tickets.');
        }

        // Confirm closure
        const closeEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Ticket Closed')
            .setDescription('This ticket has been closed. If you need further assistance, please create a new ticket.');

        await channel.send({ embeds: [closeEmbed] });

        // Delete the channel after a short delay
        setTimeout(() => channel.delete(), 10000); // Adjust delay as needed
    },
};
