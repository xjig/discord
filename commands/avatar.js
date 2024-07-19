const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Get the avatar of a user',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;

        const avatarEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ format: 'png', dynamic: true }));

        message.reply({ embeds: [avatarEmbed] });
    },
};
