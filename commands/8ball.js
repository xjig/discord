module.exports = {
    name: '8ball',
    description: 'Ask the magic 8 ball a question',
    async execute(message, args) {
        const responses = [
            'Yes.',
            'No.',
            'Maybe.',
            'Definitely.',
            'I don\'t know.',
            'Ask again later.',
            'Absolutely not.',
            'Certainly.'
        ];
        if (!args.length) return message.reply('You need to ask a question.');
        const response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    },
};
