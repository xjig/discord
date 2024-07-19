const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    execute(message, args) {
        const question = args.slice(0).join(' ');
        if (!question) {  
            return message.reply('Please provide a question for the poll.');
        }

        const pollEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Poll')
            .setDescription(question)
            .setFooter({ text: 'React with 👍 or 👎 to vote!' });

        message.reply({ embeds: [pollEmbed] }).then(sentMessage => {
            sentMessage.react('👍');
            sentMessage.react('👎');
        });
    },
};
