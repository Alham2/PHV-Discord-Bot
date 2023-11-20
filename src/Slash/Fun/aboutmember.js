const { CommandInteraction, Client, MessageEmbed, Intents } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get detailed information about a mentioned user',
    options: [
        {
            type: 'USER', // Specify that the option is of type USER
            name: 'user',
            description: 'User to get information about',
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user'); // Retrieve the user option

        const emojiArrow = '➡️';
        const emojiYes = '✅';

        const member = interaction.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setTitle(`${emojiArrow} User Information`)
            .setDescription(`${emojiYes} Here is detailed information about ${user}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField(`${emojiArrow} Username`, user.username, true)
            .addField(`${emojiArrow} Tag`, user.tag, true)
            .addField(`${emojiArrow} ID`, user.id, true)
            .addField(`${emojiArrow} Joined Server`, member.joinedAt ? member.joinedAt.toDateString() : 'Unknown', true)
            .addField(`${emojiArrow} Account Created`, user.createdAt.toDateString(), true)
            .addField(`${emojiArrow} Status`, member.presence?.status?.toUpperCase() || 'Offline', true)
            .addField(`${emojiArrow} Roles`, member.roles.cache.map(role => role.toString()).join(' ') || 'None', true)
            .setColor('#3498DB');

        interaction.reply({ embeds: [embed] });
    },
};
