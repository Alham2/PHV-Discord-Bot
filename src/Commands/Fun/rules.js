const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rules',
  description: 'Display the server rules.',
  execute: async (message, args) => {
    // Define the server rules
    const rules = [
      '1. **Be Respectful**: Treat all members with respect and kindness. No hate speech, bullying, or harassment will be tolerated.',
      '2. **No Spamming**: Avoid sending repetitive or irrelevant messages. Keep the chat constructive and meaningful.',
      '3. **Appropriate Content**: Do not post explicit, adult, or graphic content. Keep discussions and media suitable for all ages.',
      '4. **No Advertising**: Avoid promoting other servers, websites, or products without permission from staff.',
      '5. **Stay On Topic**: Keep conversations relevant to the appropriate channels. Off-topic discussions should be moved to appropriate areas.',
      '6. **No Self-Promotion**: Refrain from excessive self-promotion, including links to personal content, without permission.',
      '7. **Respect Privacy**: Do not share personal information about yourself or others without consent.',
      '8. **Use Proper Channels**: Utilize designated channels for different topics. For example, use the "vent" channel for personal discussions.',
      '9. **No Spoilers**: Avoid sharing spoilers without proper warning. Respect the enjoyment of others.',
      '10. **Follow Staff Instructions**: Obey instructions given by staff members. Ignoring warnings may lead to consequences.',
      '11. **No Backseat Moderating**: Let staff handle rule violations. Avoid acting as a moderator if you\'re not one.',
      '12. **No Excessive Caps**: Refrain from typing in all capital letters as it can be considered shouting.',
      '13. **No NSFW Content**: Explicit or adult content is not allowed. Use the designated NSFW channels for such discussions.',
      '14. **English Only**: Please use English in text chats to ensure everyone can understand and participate.',
      '15. **No Drama**: Avoid causing drama or arguments. Keep disagreements respectful and constructive.',
    ];

    // Create an embed to display the rules
    const rulesEmbed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Server Rules')
      .setDescription(rules.join('\n'))
      .setFooter('PHV MODERATION');

    // Send the embed to the channel where the command was invoked
    message.channel.send(rulesEmbed);
  },
};
