const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about Owner',
    emoji: '<a:Owner:1142471386112209071>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ownerId = '808560199811858454'; // Replace with your owner's ID
        try {
            const owner = await client.users.fetch(ownerId);
            const embed1 = new MessageEmbed()
                .setTitle('Owner Info')
                .setDescription('Here is some detailed information about the owner and the bot:')
                .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '<a:Owner:1142471386112209071> Owner', value: `<@${ownerId}>` },
                    { name: '<a:Owner:1142471386112209071> Owner Name', value: owner.username },
                    { name: '<a:Owner:1142471386112209071> Owner Discord Tag', value: owner.tag },
                    { name: '<a:GLOWRIGHTARROW:1139602266467352701> Bot Name', value: client.user.username },
                    { name: '<a:GLOWRIGHTARROW:1139602266467352701> Bot Discord Tag', value: client.user.tag },
                    { name: '<a:GLOWRIGHTARROW:1139602266467352701> Bot Description', value: 'A bot developed by the owner for various purposes.' },
                    { name: '<a:GLOWRIGHTARROW:1139602266467352701> Bot Development', value: 'Bot development, YouTube, Discord Bots' },
                    {
                        name: '<a:GLOWRIGHTARROW:1139602266467352701> Socials',
                        value: '[Website]() | [GitHub]() | [YouTube]()',
                    },
                    { name: '<a:GLOWRIGHTARROW:1139602266467352701> Discord', value: '[Join discord]()' }
                )
                .setColor(owner.hexAccentColor || '#800080');
            message.channel.send({ embeds: [embed1] });
        } catch (error) {
            console.error('Error fetching owner:', error);
            message.channel.send('An error occurred while fetching owner information.');
        }
    },
};
