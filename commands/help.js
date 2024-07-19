const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all available commands with pagination',
    async execute(message, args) {
        const commands = message.client.commands;
        const commandsPerPage = 10; 

        const commandEntries = Array.from(commands.entries());
        const pages = [];
        for (let i = 0; i < commandEntries.length; i += commandsPerPage) {
            const chunk = commandEntries.slice(i, i + commandsPerPage);
            const embed = new EmbedBuilder()
                .setTitle('Available Commands')
                .setDescription('Here is a list of all commands you can use:')
                .setColor('#0099ff')
                .setFooter({ text: `Page ${Math.ceil((i + 1) / commandsPerPage)} of ${Math.ceil(commandEntries.length / commandsPerPage)}` });

            chunk.forEach(([name, command]) => {
                embed.addFields({ name: `!${name}`, value: command.description });
            });

            pages.push(embed);
        }

        if (pages.length === 0) {
            return message.reply('No commands available.');
        }


        const pageNumber = parseInt(args[0], 10);
        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > pages.length) {
            return message.reply(`Please provide a valid page number between 1 and ${pages.length}.`);
        }

        const embedToSend = pages[pageNumber - 1];
        await message.reply({ embeds: [embedToSend] });
    },
};
