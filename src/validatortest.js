const body = {
    name: "",
    email: "johndoe@gmail.com",
    password: "password"
}

const rules = {
    name: {
        required: [true, "value daalna bhool gye bhaisahab"],
        min: [113, "custom message"],
        max: 4
    },
    email: {
        required: true,
        type: "email",
        unique: [true, null, "table", 'key'],
    },
    password: {
        required: true,
        min:[118, 'cus'],
        regex: 'aa'
    }
}

const errors = [];

const validate = (body, rules) => {
    console.log("Starting validation");
    console.log("");
    Object.entries(body)
        .forEach(el => {
            doValidate(el)
    })

    if(errors.length > 0){
        console.log(errors)
    }
    console.log("Validaiton finised");
}

const doValidate = (el) => {

    const param = el[0];
    const val = el[1];

    console.log(el);
    let rulesObj = {};
    if(param in rules) {
        rulesObj = rules[param];
    }

    Object.entries(rulesObj)
        .forEach(([key, value]) => {

            console.log("key: " + key + ", value: " + value);
            let customMsg = undefined;
            if(Array.isArray(value)){
                customMsg = value[1];
                console.log(customMsg);
                value = value[0];
            }
            switch(key){
                case 'required':
                    if(!val){
                        errors.push({
                            param: param,
                            message: (customMsg)? customMsg : "field required"
                        });
                    }
                    break;

                case 'min':
                    if(val.length < value){
                        errors.push({
                            param: param,
                            message: (customMsg) ? customMsg : "value should be greater than " + value
                        });
                    }
                    break;

                case 'max':
                    if(val.length > value){
                        errors.push({
                            param: param,
                            message: (customMsg) ? customMsg : "value should be less than " + value
                        });
                    }
                    break;
                case 'type':

                    switch(value){
                        case 'email':
                            if(!isMail(val)){
                                errors.push({
                                    param: param,
                                    message: (customMsg) ? customMsg : "not a valid mail"
                                });
                            }
                            break;
                    }

                    break;
            }
        });

}

const isMail = (str) => (!!(str.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)));

const isUrl = (str) => !!str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

const isMobileNo = (str) => {
    const regexExp = /^[6-9]\d{9}$/gi;

    return regexExp.test(str);
};

const size = (str, size) => str.length === size;

const min = (str, len) => str.length >= len;

const max = (str, len) => str.length <= len;

validate(body, rules);
