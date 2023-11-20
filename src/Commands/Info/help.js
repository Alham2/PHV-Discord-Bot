const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Help Commands',
    aliases: ['h'],
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    emoji: '<:Help:1142712921231720468>', // Add the emoji here
    run: async (client, message, args) => {
        try {
            const emojis = {
                config: '⚙️',
                developer: '<a:Owner:1142471386112209071>',
                fun: '<:funny:1142701309796040724>',
                games: '<a:games:1142697900808359976>',
                guild: '<a:guild:1142698028130631712>',
                info: '<a:info:1142698127669862452>',
                levelling: '<:level:1142702050564657192>',
                moderation: '<a:Moderation:1142698411133509733>',
                owner: '<:owner:1116770983341203476>',
                search: '<:search:942368492252954664>',
                user: '<a:user:1142698806895444018>',
                utility: '<a:utility:1142697682255749192>',
                welcoming: '<a:welcoming:1142699032070869074>',
            };

            const directories = [...new Set(client.commands.map(cmd => cmd.directory))];
            const formatString = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

            const categories = directories.map(dir => {
                const getCommands = client.commands
                    .filter(cmd => cmd.directory === dir)
                    .map(cmd => {
                        return {
                            name: cmd.name || 'No Name',
                            description: cmd.description || 'No Description Provided',
                            emoji: cmd.emoji || '',
                        };
                    });

                return {
                    directory: formatString(dir),
                    commands: getCommands,
                };
            });

            const color = message.guild.me.displayHexColor;

            const embed = new MessageEmbed()
                .setTitle('PHV Help Desk')
                .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                .setDescription(`Please choose a category in the Dropdown menu!`)
                .setColor(color)
                .setFooter('Made with 💖 and Discord.js');

            const components = [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('help-menu')
                        .setPlaceholder('Please select a category')
                        .addOptions(
                            categories.map(cmd => {
                                return {
                                    label: cmd.directory,
                                    value: cmd.directory.toLowerCase(),
                                    description: `Commands from ${cmd.directory} category`,
                                    emoji: emojis[cmd.directory.toLowerCase()] || null,
                                };
                            })
                        )
                ),
            ];

            const initialMessage = await message.channel.send({
                embeds: [embed],
                components: components,
            });

            const filter = interaction => interaction.user.id === message.author.id;

            const collector = initialMessage.createMessageComponentCollector({
                filter,
                componentType: 'SELECT_MENU',
            });

            collector.on('collect', interaction => {
                const [directory] = interaction.values;
                const category = categories.find(x => x.directory.toLowerCase() === directory);

                const categoryEmbed = new MessageEmbed()
                    .setTitle(`${emojis[directory.toLowerCase()]} ${formatString(directory)} Commands`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setDescription(`Here is the list of commands!`)
                    .setColor(color)
                    .addFields(
                        category.commands.map(cmd => {
                            return {
                                name: `${cmd.emoji} \`${cmd.name}\``,
                                value: cmd.description,
                                inline: true,
                            };
                        })
                    )
                    .setTimestamp()
                    .setFooter('Made with 💖 and Discord.js');

                interaction.update({ embeds: [categoryEmbed] });
            });
        } catch (err) {
            console.error(err);
            message.channel.send({
                content: 'Uh oh! Something unexpected happened. Try running the command again!',
            });
        }
    },
};
