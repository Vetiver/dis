const userService = require('../services/userService');

module.exports = {
    handleUserInfoCommand(message) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);
        
        const userInfo = userService.getUserInfo(member);
        
        message.channel.send(`Ник: ${userInfo.username}\nСтатус: ${userInfo.status}`);
    },
};