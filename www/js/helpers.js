var EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/,
PASSWORD_PATTERN = /^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;

function check_valid_email(email){
    return EMAIL_PATTERN.test(email);
}
function check_valid_password(pass){
    return PASSWORD_PATTERN.test(pass);
}