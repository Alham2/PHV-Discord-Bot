const { CommandInteraction, MessageEmbed } = require('discord.js');

// In-memory storage for warnings
const warnings = new Map();

module.exports = {
    name: 'unwarn',
    description: 'Remove a warn from a user',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to unwarn',
            required: true,
        },
        {
            name: 'index',
            type: 'INTEGER',
            description: 'The warn number to remove',
            required: true,
        },
    ],
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const index = interaction.options.getInteger('index');

            if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
                return interaction.reply("You don't have permission to unwarn members.");
            }

            if (!warnings.has(user.id) || index < 1 || index > warnings.get(user.id).length) {
                return interaction.reply('Invalid warn index.');
            }

            const removedWarn = warnings.get(user.id).splice(index - 1, 1)[0];

            const embed = new MessageEmbed()
                .setTitle('Warn Removed')
                .setDescription(`A warn has been removed from user ${user.tag}.\nReason for the removed warn: ${removedWarn}`)
                .setColor('#2ECC71');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.followUp('An error occurred while removing the warn.');
        }
    },
};
