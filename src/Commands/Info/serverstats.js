const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverstats',
    description: 'Display server statistics in an embed.',
    emoji: '<a:stats:1144309863242010705>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const server = interaction.guild;

            const totalMembers = server.memberCount;
            const totalChannels = server.channels.cache.size;
            const totalBots = server.members.cache.filter(member => member.user.bot).size;
            const totalBoosts = server.premiumSubscriptionCount || 0;

            const emoji = '<a:arrow:1142869362307510434>'; // Animated emoji

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Server Statistics')
                .addFields(
                    { name: `${emoji} Total Members`, value: totalMembers.toString(), inline: true },
                    { name: `${emoji} Total Channels`, value: totalChannels.toString(), inline: true },
                    { name: `${emoji} Total Bots`, value: totalBots.toString(), inline: true },
                    { name: `${emoji} Total Boosts`, value: totalBoosts.toString(), inline: true }
                )
                .setFooter(`Server ID: ${server.id}`);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    },
};
