const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Get information about the bot',
    execute(message) {
        const { client } = message;

        const botInfoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Information')
            .addFields(
                { name: 'Bot Name', value: client.user.username, inline: true },
                { name: 'Bot ID', value: client.user.id, inline: true },
                { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${client.users.cache.size}`, inline: true }
            );

        message.reply({ embeds: [botInfoEmbed] });
    },
};
