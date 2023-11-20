const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans off the user from the server',
    aliases: ['bonk'],
    emoji: '<a:ban:1142805413411176611>',
    userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to ban!');

        if (message.member.roles.highest.position <= member.roles.highest.position)
            return message.reply("You can't punish because you either have the same role or your role is lower.");

        const reason = args.slice(1).join(' ') || 'No Reason Provided';
        const memberPfp = member.user.displayAvatarURL({ size: 512, dynamic: true });

        const fields = [
            { name: 'Banned user', value: member.toString() },
            { name: 'Moderator', value: `<@${message.author.id}>` },
            { name: 'Reason', value: reason },
        ];

        const embed = new MessageEmbed()
            .setTitle(`Successfully banned ${member.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .setColor('RED')
            .setTimestamp();

        // Embed the animated emojis
        const banEmoji = '<a:ban:1142805413411176611>';
        const yesEmoji = '<a:Yes:1142456509922541648>';
        const noEmoji = '<a:No:1142458327469654070>';
        embed.setDescription(`${banEmoji} ${yesEmoji} ${noEmoji}`);

        // Validate and add fields to the embed
        fields.forEach(field => {
            const { name, value } = field;
            if (name && value) {
                embed.addField(name, value);
            }
        });

        try {
            // Ban the member
            await member.ban({ reason: reason });

            // Send the embed to the specified log channel
            const logChannelId = '1175501245889380463'; // Replace with your log channel's ID
            const logChannel = client.channels.cache.get(logChannelId);
            if (logChannel) {
                logChannel.send({ embeds: [embed] });
            }

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            message.channel.send(`An error occurred while trying to ban!\nError message:\n\`\`\`yml\n${error}\n\`\`\``);
        }
    },
};
