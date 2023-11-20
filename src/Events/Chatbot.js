const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');

// Set up your Discord bot
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const BRAINSHOP_API_URL = 'http://api.brainshop.ai/get';
const BRAINSHOP_BOT_ID = '153868'; // Replace with your Brainshop bot ID
const BRAINSHOP_API_KEY = 'rcKonOgrUFmn5usX'; // Replace with your Brainshop API key

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.channel.id === '1146041204690145310') { // Replace with your channel ID
    if (message.author.bot) return;

    const content = encodeURIComponent(message.content);

    try {
      const response = await fetch(`${BRAINSHOP_API_URL}?bid=${BRAINSHOP_BOT_ID}&key=${BRAINSHOP_API_KEY}&uid=1&msg=${content}`);
      const data = await response.json();

      if (data.cnt) {
        message.reply(data.cnt);
      } else {
        message.reply('No response received from Brainshop AI.');
      }
    } catch (error) {
      console.error('Error generating response:', error);
      message.reply('An error occurred while generating the response.');
    }
  }
});

(async () => {
  const token = process.env.TOKEN;
  client.login(token);
})();
