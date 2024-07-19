const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'remindme',
    description: 'Set a reminder',
    execute(message, args) {
        const time = parseInt(args[0], 10);
        const reminder = args.slice(1).join(' ');

        if (isNaN(time) || !reminder) {
            return message.reply('Please provide a valid time and reminder.');
        }

        setTimeout(() => {
            message.author.send(`Reminder: ${reminder}`);
        }, time * 60000);

        message.reply(`I will remind you in ${time} minutes.`);
    },
};
