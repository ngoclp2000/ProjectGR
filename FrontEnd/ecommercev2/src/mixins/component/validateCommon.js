export const validateCommon = {
    validateRule(rule,value){
        const me = this;
        let res = true;
        
        switch(rule){
            case 'required':
                res = me.validateRequired(value);
                break;
        }
    },
    validateRequired(value){
        if(value === undefined || value === null || isNaN(value) || value == ''){
            return false;
        }
        return true;
    }
}