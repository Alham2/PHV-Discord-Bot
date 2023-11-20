const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Play rock-paper-scissors!',
    emoji: '✊✋✌️',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const choices = ['rock', 'paper', 'scissors'];
        const userChoice = args[0]?.toLowerCase();

        if (!userChoice || !choices.includes(userChoice)) {
            return message.reply('Please choose either "rock," "paper," or "scissors" as your choice.');
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = getWinner(userChoice, botChoice);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Rock-Paper-Scissors')
            .setDescription(`**${message.author.tag}**, you chose ${userChoice}.\nI chose ${botChoice}.\n${result}`)
            .setFooter('100% not Rigged', client.user.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};

function getWinner(userChoice, botChoice) {
    if (userChoice === botChoice) {
        return "It's a tie! 🤝";
    } else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
    ) {
        return 'You win! 🎉';
    } else {
        return 'I win! 😄';
    }
}
