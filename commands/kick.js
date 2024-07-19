module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('You do not have permissions to use this command.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention a user to kick.');
        }

        const member = message.guild.members.resolve(user);
        if (member) {
            try {
                await member.kick();
                message.reply(`${user.tag} has been kicked.`);
            } catch (error) {
                console.error(error);
                message.reply('I was unable to kick the member.');
            }
        } else {
            message.reply('That user is not in this guild.');
        }
    },
};
