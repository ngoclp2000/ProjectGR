const AccountRepo = require('../repos/accountRepo');
const ErrorCode = require('../shared/enums/errorCode');
const accountRepo = new AccountRepo();

module.exports = {
    signUp : async function(payload) {
        let res = {
            isError: false,
            data : {},
            errorCode: ErrorCode.None
        };
        if(payload && payload.roleId == null){
            payload.roleId = 'e094cc15-1cbb-11ed-bbb9-34415dd21b70';
        }
        payload.avatar = 'https://res.cloudinary.com/mp32022/image/upload/UserAvatar/default-avatar.jpg';

        // Kiểm tra xem tài khoản đã tồn tại hay chưa
        let fieldsPayload = {
            "username" : payload.username
        };
        let account = await accountRepo.getAsyncByFields(fieldsPayload);
        if(account != null){
            res.isError = true;
            res.data = null;
            res.errorCode = ErrorCode.DuplicateUserName;
        }else{
            res.data = await accountRepo.signUp(payload);
        }
        
        return res;
    },
    completeProfile : async function(payload){
        if(payload){
            return await accountRepo.completeProfile(payload);
        }
    },
    signIn : async function(account,password){
        if(account && password){
            return await accountRepo.signIn(account,password);
        }
    }

}