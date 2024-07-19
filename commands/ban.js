module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    async execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permissions to use this command.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Please mention a user to ban.');
        }

        const member = message.guild.members.resolve(user);
        if (member) {
            try {
                await member.ban();
                message.reply(`${user.tag} has been banned.`);
            } catch (error) {
                console.error(error);
                message.reply('I was unable to ban the member.');
            }
        } else {
            message.reply('That user is not in this guild.');
        }
    },
};
