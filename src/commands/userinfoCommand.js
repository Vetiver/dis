const userController = require('../controllers/userController');

module.exports = {
    name: 'userinfo',
    description: 'Получает информацию о пользователе',
    execute(message, args) {
        userController.handleUserInfoCommand(message);
    },
};