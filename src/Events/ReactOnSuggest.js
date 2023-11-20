const client = require('../../index');

const channel = '1146041177381023826';
client.on('messageCreate', message => {
    if (channel.includes(message.channel.id)) {
        if (message.author.bot) {
            message.react('<a:Yes:1142456509922541648>');
            message.react('<a:No:1142458327469654070>');
            message.react('<a:shrug1:1142762523687403550>');
        }
        if (!message.author.bot) return;
    }
});
