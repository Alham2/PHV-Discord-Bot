require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restart the client',
    aliases: ['reboot'],
    emoji: '<a:restart:1142455492405370971>', 
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ownerId = '808560199811858454'; // Replace 'YOUR_OWNER_ID' with the actual owner's ID

        if (message.author.id !== ownerId) {
            const notAuthorizedEmbed = new MessageEmbed()
                .setTitle(`<a:No:1142458327469654070> Access Denied`)
                .setDescription(`You can't use this command as you are not the owner of the bot!`)
                .setColor('RED');

            return message.channel.send({ embeds: [notAuthorizedEmbed] });
        }

        await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle(`<a:Yes:1142456509922541648> Successfully rebooted!`)
                    .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                    .setDescription(
                        `The client is successfully crashed with exit code 1.\n\nLoaded commands: ${client.commands.size}\n\nJust wait for the process to restart automatically. Or, if I am going offline, you can restart manually by visiting the hosting dashboard!`
                    )
                    .setColor('GREEN')
                    .setFooter(`Restarted by ${message.author.username}`)
                    .setTimestamp(),
            ],
        });

        const masterLogger = client.channels.cache.get('1146041145021976706');
        if (masterLogger) {
            await masterLogger.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Client Restarted')
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setDescription(`**Actioned by**: ${message.author.tag}`)
                        .setColor('GREEN')
                        .setTimestamp(),
                ],
            });
        }

        return process.exit();
    },
};
