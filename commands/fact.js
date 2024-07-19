const fetch = require('node-fetch');

module.exports = {
    name: 'fact',
    description: 'Get a random fact',
    async execute(message) {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const data = await response.json();
        message.reply(data.text);
    },
};
