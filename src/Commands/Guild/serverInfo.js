const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Returns information about the server.',
    emoji: '🗂',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    run: async (client, message, args) => {
        const vanityCode = message.guild.vanityURLCode;
        const vanityInvite = vanityCode ? `https://discord.gg/${vanityCode}` : 'No custom URL';
        
        const roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(role => role.toString());

        const textChannels = message.guild.channels.cache.filter(channel => channel.type === 'text').size;
        const voiceChannels = message.guild.channels.cache.filter(channel => channel.type === 'voice').size;
        const categories = message.guild.channels.cache.filter(channel => channel.type === 'category').size;

        const emojis = message.guild.emojis.cache;
        const animatedEmojis = emojis.filter(emoji => emoji.animated);

        const boosters = message.guild.premiumSubscriptionCount;
        
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`Server Information: ${message.guild.name}`)
            .setColor('#3498db')
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .addField('General Information', `:id: ID: ${message.guild.id}\n:crown: Owner: ${(await message.guild.fetchOwner()).user}`)
            .addField('Counts', `:busts_in_silhouette: Members: ${message.guild.memberCount}\n:scroll: Roles: ${roles.length}\n:speech_balloon: Channels: ${message.guild.channels.cache.size}\n:text: Text Channels: ${textChannels}\n:loud_sound: Voice Channels: ${voiceChannels}\n:file_folder: Categories: ${categories}\n:smiley: Emojis: ${emojis.size} (Regular: ${emojis.size - animatedEmojis.size}, Animated: ${animatedEmojis.size})`)
            .addField('Additional Information', `:calendar: Created at: ${moment(message.guild.createdTimestamp).format('LLL')} (${moment(message.guild.createdTimestamp).fromNow()})\n:globe_with_meridians: Region: ${message.guild.region}\n:sparkles: Boost level: ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\n:star2: Boosters: ${boosters}\n:lock: Verification level: ${message.guild.verificationLevel}\n:link: Vanity URL: ${vanityInvite}`)
            .addField(`Roles [${roles.length}]`, roles.length ? roles.slice(0, 10).join(', ') + (roles.length > 10 ? ` and ${roles.length - 10} more...` : '') : 'No roles');

        message.channel.send({ embeds: [embed] });
    },
};
