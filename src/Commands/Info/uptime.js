const { Client, Message, MessageEmbed } = require('discord.js');
const pretty = require('pretty-ms');

module.exports = {
    name: 'uptime',
    description: "Returns information about Uptime",
    emoji: '<a:Clock1:1141767072326619179>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const totalUptime = pretty(client.uptime, { verbose: true });

        const embed = new MessageEmbed()
            .setTitle('<a:Clock1:1141767072326619179> Uptime Information')
            .setDescription(`I have been online for **${totalUptime}**.`)
            .addFields(
                { name: 'Uptime Details', value: `**Total Uptime:** ${totalUptime}` },
                { name: 'Uptime Since', value: `**${new Date(Date.now() - client.uptime).toLocaleString()}**` },
                { name: 'Last Restart', value: `**01/08/2023**` }
            )
            .setColor(message.guild.me.displayHexColor);

        message.channel.send({ embeds: [embed] });
    },
};
