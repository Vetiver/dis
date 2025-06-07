module.exports = {
    getUserInfo(member) {
        const user = member.user;
        const status = member.presence ? member.presence.activities[0] : null;
        let statusMessage;
        if (!status) {
            statusMessage = 'Не играет в игру'; 
        } else if (status.name === 'Custom Status') {
            statusMessage = 'Не играет в игру'; 
        } else {
            statusMessage = `Играет в ${status.name}`; 
        }


        return {
            username: user.globalName,
            status: statusMessage,
        };
    },
};