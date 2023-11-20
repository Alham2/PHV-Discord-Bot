const { Client, Message } = require('discord.js');

module.exports = {
    name: 'calculator',
    description: 'Use a calculator to perform basic calculations.',
    aliases: ['calc', 'cal', 'math'],
    emoji: '<a:mathink:1142110925600600105>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args.length !== 3) {
            return message.channel.send('Usage: calculator <num1> <operator> <num2>');
        }

        const num1 = parseFloat(args[0]);
        const operator = args[1];
        const num2 = parseFloat(args[2]);

        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
            case 'x':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    return message.channel.send("Cannot divide by zero.");
                }
                break;
            default:
                return message.channel.send('Invalid operator. Use +, -, *, or /.');
        }

        message.channel.send(`Result: ${result}`);
    },
};
