require('dotenv').config();
const client = require('../../index');
const chalk = require('chalk');
const prefix = process.env.PREFIX;
const ownerID = '1066367509965574215'; // Replace with the actual owner's user ID
const ownerEmoji = '<a:Owner:1142471386112209071>'; // Replace with the actual emoji

const statuses = [
  { name: `${prefix}help`, type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: 'On You', type: 'STREAMING', url: 'https://twitch.tv/#' },
  { name: `${prefix}serverstats`, type: 'STREAMING', url: 'https://twitch.tv/#' },
  // Add more statuses as needed
];

let statusIndex = 0;

client.on('ready', async () => {
  setStatus();

  console.log(
    `${chalk.grey.bold('[INFO]  ')}${chalk.blueBright.bold(client.user.tag)} ${chalk.white('is')} ${chalk.green.bold(
      'Online'
    )}`
  );

  // Change (optionally) the time.
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    setStatus();
  }, 10000); // 10 seconds
});

client.on('message', (message) => {
  if (message.author.id === ownerID) {
    message.react(ownerEmoji)
      .catch((error) => {
        console.error(`Failed to react to message: ${error}`);
      });
  }
});

function setStatus() {
  const { name, type, url } = statuses[statusIndex];
  client.user.setActivity(name, { type, url });
}
