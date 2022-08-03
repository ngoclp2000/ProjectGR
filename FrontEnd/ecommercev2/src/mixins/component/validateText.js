export const validateText = {
    validateRule(rule,value){
        const me = this;
        let res = true;

        switch(rule){
            case 'phoneNumber':
                res = me.validatePhoneNumber(value);
                break;
            case 'email':
                res = me.validateEmail(value);
                break;
            case 'password':
                res = me.validatePassword(value);
                break;
        }
    },
    validatePhoneNumber(value) {
        try{
            let rex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
            let result = value;
            if(!rex.test(result.trim())){
                return false;
            }
        }catch(e){
            return false;
        }
        return true;
    },
    validateEmail(value) {
        try{
            let rex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let result = value;
            if(!rex.test(result.trim())){
                return false;
            }
        }catch(e){
            return false;
        }
        return true;
    },
    validatePassword(value) {
        const me = this;
        let lengthPass = false;
        if(value  && value.length >= 8){
            lengthPass = true;
        }

        let textPass = false;
        let uppercasePass = false;
        let lowercasePass = false;

        if(value && /[^A-Z]/g.test(value)){
            uppercasePass = true;
        }
        if(value && /[^a-z]/g.test(value)){
            lowercasePass = true;
        }
        if(uppercasePass && lowercasePass){
            textPass = true;
        }

        let numberPass = false;
        if(value && /[^0-9]/g.test(value)){
            numberPass = true;
        }
        return lengthPass && textPass && numberPass;
    }
}