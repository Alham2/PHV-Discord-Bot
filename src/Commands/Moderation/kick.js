const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    aliases: [],
    emoji: '<:Kick:1142837775276703815>',
    userperm: ['KICK_MEMBERS', 'SEND_MESSAGES'],
    botperm: ['KICK_MEMBERS', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to kick!');

        if (message.member.roles.highest.position <= member.roles.highest.position)
            return message.reply("<a:No:1142458327469654070> You can't punish this member because either you have the same role or your role is lower.");

        const reason = args.slice(1).join(' ') || 'No Reason Provided';
        const memberPfp = member.user.displayAvatarURL({ size: 512, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle(`<a:Yes:1142456509922541648> Successfully kicked ${member.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .addFields(
                { name: 'Kicked user', value: member.user.tag },
                { name: 'Moderator', value: `<@${message.author.id}>` },
                { name: 'Reason', value: reason }
            )
            .setColor('RED')
            .setTimestamp();

        try {
            await member.kick(reason);
            message.author.send({ embeds: [embed] }); // Sending the message only to the moderator
        } catch (err) {
            message.channel.send(`An error has occurred while trying to kick!\nError message:\n\`\`\`yml\n${err}\n\`\`\``);
        }
    },
};
