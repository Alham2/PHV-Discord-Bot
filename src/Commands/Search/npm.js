const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    description: 'Get a random joke to brighten your day!',
    aliases: ['randomjoke', 'funny'],
    emoji: '😂',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const res = await fetch('https://official-joke-api.appspot.com/jokes/random').catch(err =>
            console.log(err)
        );

        if (res.status !== 200) {
            return message.channel.send({
                content: "I couldn't fetch a joke at the moment. Please try again later.",
            });
        }

        const joke = await res.json();

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**${joke.setup}**\n*${joke.punchline}*`)
            .setFooter('Please Rate my joke out of 10')
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
