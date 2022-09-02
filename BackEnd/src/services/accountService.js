const Account = require('../models/account');

const accountInstance = new Account();

module.exports = {
    signUp : async function(payload) {
        if(payload && payload.roleId == null){
            payload.roleId = 'e094cc15-1cbb-11ed-bbb9-34415dd21b70';
        }
        payload.avatar = 'https://res.cloudinary.com/mp32022/image/upload/UserAvatar/default-avatar.jpg';
        return await accountInstance.signUp(payload);
    },
    completeProfile : async function(payload){
        if(payload){
            return await accountInstance.completeProfile(payload);
        }
    },
    signIn : async function(account,password){
        if(account && password){
            return await accountInstance.signIn(account,password);
        }
    }

}