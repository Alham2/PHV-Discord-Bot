const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: 'Translate a text',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'Text to be translated',
            required: true,
        },
        {
            type: 3,
            name: 'language',
            description: 'Language to translate to (e.g.: English, en, Japanese, ja)',
            required: true,
        },
    ],
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [text, language] = args;

        const languageMap = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    nl: 'Dutch',
    sv: 'Swedish',
    no: 'Norwegian',
    da: 'Danish',
    fi: 'Finnish',
    ru: 'Russian',
    ar: 'Arabic',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    tr: 'Turkish',
    pl: 'Polish',
    el: 'Greek',
    hi: 'Hindi',
    th: 'Thai',
    he: 'Hebrew',
    id: 'Indonesian',
    ms: 'Malay',
    vi: 'Vietnamese',
    fil: 'Filipino',
    uk: 'Ukrainian',
    ro: 'Romanian',
    cs: 'Czech',
    hu: 'Hungarian',
    bg: 'Bulgarian',
    hr: 'Croatian',
    sr: 'Serbian',
    sk: 'Slovak',
    sl: 'Slovenian',
    et: 'Estonian',
    lv: 'Latvian',
    lt: 'Lithuanian',
    bn: 'Bengali',
    ur: 'Urdu',
    fa: 'Persian',
    gu: 'Gujarati',
    ta: 'Tamil',
    te: 'Telugu',
    kn: 'Kannada',
    ml: 'Malayalam',
    mr: 'Marathi',
    pa: 'Punjabi',
    // Add more languages and their codes here
};


        let targetLanguage = language.toLowerCase();
        if (targetLanguage in languageMap) {
            targetLanguage = languageMap[targetLanguage];
        }

        try {
            const translated = await translate(text, { to: targetLanguage });

            const embed = new MessageEmbed()
                .setTitle('Translation Result')
                .addFields(
                    { name: 'Query', value: text, inline: true },
                    { name: 'Result', value: translated.text, inline: true },
                    { name: 'Translated to', value: targetLanguage, inline: true }
                )
                .setColor('BLUE')
                .setFooter({ text: interaction.user.tag })
                .setTimestamp();
            interaction.followUp({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            interaction.followUp({
                content: `Uh oh! Something unexpected happened. Maybe you want to check the usage? Is that right?`,
                ephemeral: true,
            });
        }
    },
};
