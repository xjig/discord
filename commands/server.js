const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Display information about the server',
    execute(message) {
        const { guild } = message;
        const serverInfoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Server Info for ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created On', value: guild.createdAt.toDateString(), inline: true },
                { name: 'Region', value: guild.preferredLocale, inline: true }
            );

        message.reply({ embeds: [serverInfoEmbed] });
    },
};
