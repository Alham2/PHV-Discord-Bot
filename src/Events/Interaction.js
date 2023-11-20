const client = require('../../index');

client.on('interactionCreate', async interaction => {
    /**
     * @param { Client } client
     * @param { CommandInteraction } interaction
     */
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: 'An error has occured!' });

        const args = [];
        interaction.options.data.map(x => {
            args.push(x.value);
        });

        // Permission Handling
        const userperm = interaction.member.permissions.has(cmd.userperm);
        const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!userperm) {
            return interaction.reply({
                content: `You need \`${cmd.userperm || []}\` Permissions`,
                ephemeral: true,
            });
        }
        if (!botperm) {
            return interaction.reply({
                content: `I need \`${cmd.botperm || []}\` Permissions`,
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        cmd.run(client, interaction, args);

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
