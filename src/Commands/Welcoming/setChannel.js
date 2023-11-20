const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
  name: 'set-welcome',
  description: 'Set welcoming system channel',
  aliases: ['set-welcoming'],
  emoji: '<a:guild:1142698028130631712>',
  userperm: ['MANAGE_GUILD'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply({ content: 'Please mention a channel!' });

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Channel = channel.id;
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }

      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Welcome Channel Set')
        .setDescription(`<a:Yes:1142456509922541648> ${channel} has been set as the welcome channel!`);

      message.reply({ embeds: [embed] });
    });
  },
};
