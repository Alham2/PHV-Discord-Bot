const { CommandInteraction, MessageEmbed } = require('discord.js');

// In-memory storage for warnings
const warnings = new Map();

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to warn',
            required: true,
        },
        {
            name: 'reason',
            type: 'STRING',
            description: 'Reason for warning',
            required: true,
        },
    ],
    run: async (client, interaction) => {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');

            if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
                return interaction.reply("You don't have permission to warn members.");
            }

            if (!warnings.has(user.id)) {
                warnings.set(user.id, []);
            }

            warnings.get(user.id).push(reason);

            const embed = new MessageEmbed()
                .setTitle('User Warned')
                .setDescription(`User ${user.tag} has been warned.\nReason: ${reason}`)
                .setColor('#E74C3C');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.followUp('An error occurred while warning the user.');
        }
    },
};

