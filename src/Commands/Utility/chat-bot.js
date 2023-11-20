const { Client, Message } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'chat',
  description: 'Chat with the bot By using !chat',
  aliases: ['cht'],
  emoji: '💭',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const input = args.join(' ');
    if (!input) return;

    try {
      const response = await axios.get(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(input)}`);
      message.reply(response.data.cnt);
    } catch (error) {
      console.error('Error generating response:', error);
      message.reply('An error occurred while generating the response.');
    }
  },
};
