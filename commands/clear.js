module.exports = {
    name: 'clear',
    description: 'Clear a number of messages from the channel',
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to use this command.');
        }

        const amount = parseInt(args[0], 10);
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Please specify a valid number of messages to delete.');
        }

        message.channel.bulkDelete(amount, true)
            .then(deleted => message.reply(`Deleted ${deleted.size} messages.`))
            .catch(err => message.reply('There was an error deleting messages.'));
    },
};
