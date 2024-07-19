const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roles',
    description: 'List all roles in the server',
    execute(message) {
        const roles = message.guild.roles.cache.map(role => role.name).join(', ');

        const rolesEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Server Roles')
            .setDescription(roles || 'No roles found.');

        message.reply({ embeds: [rolesEmbed] });
    },
};
