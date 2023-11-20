const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns Pong from PHV',
    emoji: '<a:ping:1141773007291957328>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const userLatency = Date.now() - message.createdTimestamp;
        const embed = new MessageEmbed()
            .setTitle(`Pong!`)
            .setDescription(`<a:ping:1141773007291957328> Websocket latency: ${client.ws.ping} ms!\n<:ping:1141773007291957328> 
            Your latency: ${userLatency} ms`)
            .setColor('#800080');
        message.channel.send({ embeds: [embed] });
    },
};
