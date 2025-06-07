module.exports = {
    name: 'извинись',
    description: 'Отправляет приветственное сообщение!',
    execute(message, args) {
        message.channel.send('Пошел нахуй');
    },
};