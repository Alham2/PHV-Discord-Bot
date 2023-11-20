const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'story',
    description: 'Story of PHV Bot',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const prefix = process.env.PREFIX; // Get the custom prefix from the environment variable

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Story')
                .setDescription(
                    ''
                )
                .addField('Join Our Discord', '[Discord]()', true)
                .addField('', '[GitHub]()', true)
                .setFooter(`Thank you for using the story command!`);

            // Process the interaction response in a single location
            const processInteractionResponse = () => {
                interaction.reply({ embeds: [embed] })
                    .catch(error => {
                        console.error('Failed to send interaction response:', error);
                    });
            };

            // Add your other event listeners or middleware for interactions
            // ...

            // Call the function to send the interaction response
            processInteractionResponse();
        } catch (error) {
            console.error(error);
        }
    },
};
