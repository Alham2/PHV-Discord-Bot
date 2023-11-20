const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
  name: 'remove-welcome',
  description: 'Remove / disable welcoming feature',
  aliases: ['remove-welcoming'],
  emoji: '<a:guild:1142698028130631712>',
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Schema.findOneAndDelete({ Guild: message.guild.id });

    const embed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Welcoming Feature Disabled')
      .setDescription('<a:Yes:1142456509922541648> I will not send welcome messages to this server anymore.');

    message.reply({ embeds: [embed] });
  },
};

