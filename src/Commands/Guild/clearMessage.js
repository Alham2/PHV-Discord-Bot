const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear and Delete Messages',
    aliases: ['cls', 'purge'],
    emoji: '<a:nuke:1141777079101309000>', // Animated emoji added here
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const amount = Number(args[0], 10) || parseInt(args[0]);
        if (isNaN(amount) || !Number.isInteger(amount))
            return message.reply({
                content: `Please enter a valid number of messages to clear!`,
            });
        if (amount <= 1 || amount > 100)
            return message.reply({
                content: `Please enter a number of messages between 2 and 100.`,
            });

        try {
            // Delete the command message
            await message.delete();

            // Bulk delete messages
            const deletedMessages = await message.channel.bulkDelete(amount, true);

            // Send a confirmation message with an animated emoji
            const nukeEmoji = '<a:nuke:1141777079101309000>';
            const embed = new MessageEmbed()
                .setColor('#00ffff')
                .setDescription(`${nukeEmoji} Cleared **${deletedMessages.size}**/**${amount}** messages!`);

            const confirmationMessage = await message.channel.send({ embeds: [embed] });
            confirmationMessage.delete({ timeout: 4000 });
        } catch (error) {
            console.error(error);

            if (error.code === 10008) {
                message.channel.send({
                    content: `Some messages could not be deleted. They may have already been deleted or are older than 14 days.`,
                });
            } else {
                message.channel.send({
                    content: `An error occurred while trying to clear messages.`,
                });
            }
        }
    },
};
