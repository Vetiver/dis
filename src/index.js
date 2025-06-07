require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences 
    ] 
});

const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Бот запущен!');
});

const channelId = process.env.CHANNELID; 

client.on('presenceUpdate', (oldPresence, newPresence) => {
    const member = newPresence.member;
    const status = newPresence.activities[0];
    const Dota2Player = newPresence.activities.some(activity => activity.name === 'Dota 2');
    if (Dota2Player && member.user.id === process.env.MEMBERUSERID) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString('ru-RU'); 
            const timeString = currentDate.toLocaleTimeString('ru-RU'); 
            
            channel.send(`>>> 👑👑👑\n**Его величество ${member.user.globalName} зашел в ${status.name}!**\n📅 **Дата:** ${dateString}\n🕒 **Время:** ${timeString}\n🎉🎉🎉`);
        }
    } 
    
    if (Dota2Player && member.user.id === process.env.CHELIADID) {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString('ru-RU'); 
            const timeString = currentDate.toLocaleTimeString('ru-RU'); 

            channel.send(`>>> 📅 **Дата:** ${dateString}\n🕒 **Время:** ${timeString}\n${member.user.globalName} с рангом СТРАЖ зашел в ${status.name}!`);
        }
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands.has(commandName)) {
        const command = commands.get(commandName);
        command.execute(message, args);
    }
});

client.login(process.env.DISCORD_TOKEN);