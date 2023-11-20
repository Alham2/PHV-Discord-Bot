const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
  name: 'check-welcome',
  description: 'Check where the welcoming system is enabled',
  aliases: ['check-welcoming'],
  emoji: '<a:guild:1142698028130631712>',
  userperm: ['MANAGE_GUILD'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        return message.reply({
          content: `This guild has no data stored.`,
        });
      }

      const channel = client.channels.cache.get(data.Channel);

      const embed = new MessageEmbed()
        .setColor('#7289DA')
        .setTitle('Welcoming Channel Information')
        .setDescription(
          `<a:Yes:1142456509922541648> The welcoming channel has been set to: ${channel}\n\nThe bot will automatically send a welcoming message to ${channel} when someone joins the server!`
        );

      message.reply({ embeds: [embed] });
    });
  },
};
