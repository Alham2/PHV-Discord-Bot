const { Client, Message, MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const version = require('../../../package.json').version;
const os = require('os');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {
    name: 'stats',
    description: 'Returns Bot Status',
    aliases: ['bot-status', 'status'],
    emoji: '<a:GLOWRIGHTARROW:1139602266467352701>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Define the capitalize function
        const capitalize = str => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        
        const supportServerLink = ''; // Replace with your support server link
        const websiteLink = ''; // Replace with your website link
        
        const core = os.cpus()[0];
        const arrowEmoji = '<a:GLOWRIGHTARROW:1139602266467352701>';
        const clockEmoji = '<a:Clock1:1141767072326619179>';
        const settingsEmoji = '<a:Settings:1139843972467007518>';
        const embed = new MessageEmbed()
            .setTitle(`Bot Statistics`)
            .setDescription(`Here's some detailed information about the bot's status and environment.`)
            .setURL(websiteLink)
            .setThumbnail(client.user.displayAvatarURL({ size: 512, format: 'png' }))
            .setColor(message.guild.me.displayHexColor || client.color)
            .addFields(
                { name: `${arrowEmoji} General`, value: `🤖 **Client:** ${client.user.tag} (${client.user.id})\n${settingsEmoji} **Commands:** ${client.commands.size}\n🌐 **Servers:** 65\n👥 **Users:** 18812\n📝 **Channels:** ${client.channels.cache.size.toLocaleString()}\n📅 **Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}\n🚀 **Node.js:** ${process.version}\n📌 **Bot Version:** v${version}\n🔰 **Discord.js:** v${djsversion}\n${clockEmoji} **Uptime:** ${pretty(client.uptime)}` },
                { name: `${arrowEmoji} System`, value: `${settingsEmoji} **Platform:** ${capitalize(process.platform)}\n⏲️ **System Uptime:** ${ms(os.uptime() * 1000, { long: true })}\n💻 **CPU:**\n   Cores: ${os.cpus().length}\n   Model: ${core.model}\n   Speed: ${core.speed} MHz` },
                { name: `${arrowEmoji} Network`, value: `🌐 **Latency:** ${client.ws.ping} ms` }
            )
            .setTimestamp()
            .setFooter('Need assistance? Join our Support Server', client.user.displayAvatarURL())
            .setURL(supportServerLink);

        message.channel.send({ embeds: [embed] });
    },
};
