const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roll',
    description: 'Roll a dice and get a random number between 1 and 6',
    execute(message) {
        const roll = Math.floor(Math.random() * 6) + 1;

        const rollEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Dice Roll')
            .setDescription(`You rolled a ${roll}!`);

        message.reply({ embeds: [rollEmbed] });
    },
};
