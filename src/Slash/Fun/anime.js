const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'fact',
    description: 'Get a random fact!',
    emoji: '📚', // Emoji for the command
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        fetch('https://useless-facts.sameerkumar.website/api')
            .then(res => res.json())
            .then(data => {
                const fact = data.data;

                const embed = new MessageEmbed()
                    .setTitle('Random Fact')
                    .setDescription(fact)
                    .setColor('#FFA500');

                interaction.followUp({ embeds: [embed] });
            })
            .catch(err => {
                const errorEmbed = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`An error occurred while fetching random fact.`)
                    .setColor('RED');
                interaction.followUp({ embeds: [errorEmbed] });
                console.log(err);
            });
    },
};
