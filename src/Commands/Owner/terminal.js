const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'trivia',
    description: 'Get a random trivia question to answer.',
    aliases: [],
    emoji: '❓',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=1');
            const triviaData = await response.json();

            const triviaQuestion = triviaData.results[0];
            const formattedQuestion = `${triviaQuestion.question}\n\n${triviaQuestion.incorrect_answers.join('\n')}`;

            const embed = new MessageEmbed()
                .setTitle('Trivia Question')
                .setDescription(formattedQuestion)
                .setColor('#FFA500');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching the trivia question.');
        }
    },
};
