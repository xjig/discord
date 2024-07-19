const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Display information about a user',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const userInfoEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`User Info for ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Username', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Created Account', value: user.createdAt.toDateString(), inline: true }
            );

        message.reply({ embeds: [userInfoEmbed] });
    },
};
