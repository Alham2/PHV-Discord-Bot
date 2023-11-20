const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    options: [
        {
            type: 6,  // User type
            name: 'member',
            description: 'Member to ban',
            required: true,
        },
        {
            type: 3,  // String type
            name: 'reason',
            description: 'Reason why you want to ban this member',
        },
    ],
    userperm: ['BAN_MEMBERS'],
    botperm: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const member = interaction.options.getMember('member');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!member.bannable || interaction.member.roles.highest.position <= member.roles.highest.position) {
            return interaction.followUp({
                content: "You can't ban because either you have the same role, or your role is lower than the member's.",
                ephemeral: true,
            });
        }

        const memberPfp = member.user.displayAvatarURL({ size: 512, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle(`Successfully banned ${member.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .addFields(
                { name: 'Banned user', value: member.toString() },
                { name: 'Moderator', value: `<@${interaction.user.id}>` },
                { name: 'Reason', value: reason }
            )
            .setColor('RED')
            .setTimestamp();

        try {
            await member.ban({ reason: reason });
            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            interaction.followUp({
                content: `An error occurred while trying to ban!\nError message:\n\`\`\`yml\n${error}\n\`\`\``,
                ephemeral: true,
            });
        }
    },
};
