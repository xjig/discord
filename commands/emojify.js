module.exports = {
    name: 'emojify',
    description: 'Convert text to emoji',
    execute(message, args) {
        const text = args.join(' ');
        if (!text) {
            return message.reply('Please provide text to convert to emoji.');
        }

        const emojiText = text.split('').map(char => `:${char}:`).join(' ');

        message.reply(emojiText);
    },
};
