// by Zwen
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const path = require('path');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

async function handleJoinAndPlay(message) {
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
        return message.reply('Sesli kanala katılman gerekiyor.');
    }
    try {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        const resource = createAudioResource(path.join(__dirname, 'ses.mp3'));
        player.play(resource);
        connection.subscribe(player);
        message.reply(`**${voiceChannel.name}** kanalında ses çalmaya başladım! 🎶`);
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    } catch (error) {
        console.error('Ses çalarken bir hata oluştu:', error);
        message.reply('Bir hata oluştu, lütfen daha sonra tekrar dene.');
    }
}

client.once('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı ve hazır!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case 'gel':
            await handleJoinAndPlay(message);
            break;
    }
});

client.login(config.token);
