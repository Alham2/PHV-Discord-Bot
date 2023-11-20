const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite me to your server',
    emoji: '<a:Invite:1142483044050161684>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setTitle('<a:Invite:1142483044050161684> Invite PHV to your server!')
            .setDescription(
                `${emojis.bullet} [Click Me to Invite](https://discord.com/api/oauth2/authorize?client_id=871245361656758292&permissions=8&scope=bot)\n` +
                `${emojis.bullet} [Click Me to Join support server]()`
            )
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};

// Emoji for bullet points
const emojis = {
    bullet: '<a:GLOWRIGHTARROW:1139602266467352701>',
};
