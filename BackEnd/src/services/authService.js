const Authentication = require('../models/authentication');
const RedisWrapper = require('../helpers/wrapper/redisWrapper');
const AccountRepo = require('../repos/accountRepo');
const accountRepo = new AccountRepo();

module.exports = {
    refreshToken: async function (payload) {
        if (payload && payload.refreshToken) {
            const {
                refreshToken,
                userId
            } = payload;
            let checkRefreshToken = await RedisWrapper.checkExistElementInRedisArray(userId + ':refreshToken', refreshToken);

            if (checkRefreshToken) {

                let checkRefreshTokenValid = await Authentication.checkRefreshToken(refreshToken);
                if (checkRefreshTokenValid) {
                    let userData = await accountRepo.getDataById(userId);
                    if (userData) {
                        let payload = {
                            userId: userData.userId,
                            avatar: userData.avatar,
                            fullName: userData.fullName,
                            email: userData.email,
                        };
                        return await Authentication.createAccessToken(payload);
                    }
                } else {
                    await RedisWrapper.removeElementFromRedisArray(userId + ':refreshToken', refreshToken);
                }
            }
            return null;
        }
    },
    removeToken: async function (payload) {
        try{
            if(payload){
                let res = await RedisWrapper.removeElementFromRedisArray(payload.userId + ':refreshToken',payload.refreshToken);
                return res;
            }
        }catch(e){
        }
        return false;
    }
}