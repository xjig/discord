const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s latency',
    execute(message, args) {
        const pingEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Pong!')
            .setDescription(`Bot latency is ${Date.now() - message.createdTimestamp}ms`);

        message.reply({ embeds: [pingEmbed] });
    },
};
