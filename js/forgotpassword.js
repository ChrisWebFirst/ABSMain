async function sendCodeForm(event) {
    event.preventDefault();
    let userName = document.getElementById("login-email");
    var recaptcharesponse = grecaptcha.getResponse();
    if (recaptcharesponse.length != 0) {

        userName = userName.value;
        if (userName == null || userName == "") {
            return false;
        }
        const params = {
            UserName: userName
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params)
        };
        let response = await fetch('https://connect.alliedbuildingstores.com/api/Auth/GetSecurityCode', options);

        if (!response.ok) {
            if (response.status == 401) {
                alert("Email is not valid");
                console.log(response.status);
            }
            throw new Error(`Error! status: ${response.status}`);
        } else {
            let sentEmailDiv = document.getElementById("sendCodeForm");
            sentEmailDiv.style.display = "none";

            let verifyCodeForm = document.getElementById("verifyCodeForm");
            verifyCodeForm.style.display = "block";

        }

    }
    else {

    }

}
let sendCode = document.getElementById("sendCodeForm");
sendCode.addEventListener("submit", sendCodeForm, false);

let sendCodeBtn = document.getElementById("sendCodeBtn");
sendCodeBtn.addEventListener("click", sendCodeForm, false);


async function verifyCodeForm(event) {
    event.preventDefault();
    let userName = document.getElementById("login-email");
    let securityCode = document.getElementById("security_code");
    var recaptcharesponse = grecaptcha.getResponse();
    if (recaptcharesponse.length != 0) {

        const params = {
            Code: securityCode.value,
            UserName: userName.value
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params)
        };
        let response = await fetch('https://connect.alliedbuildingstores.com/api/Auth/verifySecurityCode', options);

        if (!response.ok) {
            if (response.status == 401) {
                alert("Code is not valid");
                console.log(response.status);
            }
            throw new Error(`Error! status: ${response.status}`);
        } else {
            let verifyCodeDiv = document.getElementById("verifyCodeForm");
            verifyCodeDiv.style.display = "none";

            let newPassworddiv = document.getElementById("newPasswordForm");
            newPassworddiv.style.display = "block";
        }

    }
    else {

    }

}
let verifyCode = document.getElementById("verifyCodeForm");
verifyCode.addEventListener("submit", verifyCodeForm, false);

let verifyCodeBtn = document.getElementById("verifyCodeBtn");
verifyCodeBtn.addEventListener("click", verifyCodeForm, false);


async function newPasswordForm(event) {
    event.preventDefault();
    let userName = document.getElementById("login-email").value;
    let password = document.getElementById("password").value;
    var recaptcharesponse = grecaptcha.getResponse();
    if (recaptcharesponse.length != 0) {
        const params = {
            Password: password,
            UserName: userName
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params)
        };
        let response = await fetch('https://connect.alliedbuildingstores.com/api/Auth/setNewPassword', options);

        if (!response.ok) {
            if (response.status == 401) {
                alert("Code is not valid");
                console.log(response.status);
            }
            throw new Error(`Error! status: ${response.status}`);
        } else {
            document.location = "./auth/login.html";
        }

    }
    else {

    }

}
let newPasswordCode = document.getElementById("newPasswordForm");
newPasswordCode.addEventListener("submit", newPasswordForm, false);

let newPasswordCodeBtn = document.getElementById("newPasswordBtn");
newPasswordCodeBtn.addEventListener("click", newPasswordForm, false);

const passwordCheck = () => {
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("password_confirm").value;
    let specialChars = "!@@#$%^&*()-_=+[{]}\\|;:'\",<.>/?`~";
    let numbers = "0123456789";
    let isComplete = false;

    let length = document.getElementById("length");
    let bigletter = document.getElementById("bigletter");
    let onenumber = document.getElementById("onenumber");
    let specialcharacter = document.getElementById("specialcharacter");
    let passwordsmatch = document.getElementById("passwordsmatch");
    let passwordBtn = document.getElementById("newPasswordBtnDiv");

    if (password.length < 13) {
        length.removeAttribute("checked");
        isComplete = false;
    }
    else {
        isComplete = true;
        length.setAttribute("checked", true);
    }

    if (password.toLowerCase() == password) {
        bigletter.removeAttribute("checked");
        isComplete = false;
    }
    else {
        isComplete = true;
        bigletter.setAttribute("checked", true);
    }

    let num = false;
    for (let i = 0; i < password.length && num === false; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (password[i] == numbers[j]) {
                num = true;
            }
        }
    }
    if (!num) {
        onenumber.removeAttribute("checked");
        isComplete = false;
    }
    else {
        isComplete = true;
        onenumber.setAttribute("checked", true);
    }

    let specialChar = false;
    for (let i = 0; i < password.length; i++) {
        for (let j = 0; j < specialChars.length; j++) {
            if (password[i] == specialChars[j]) {
                specialChar = true;
            }
        }
    }

    if (!specialChar) {
        specialcharacter.removeAttribute("checked");
        isComplete = false;
    }
    else {
        isComplete = true;
        specialcharacter.setAttribute("checked", true);
    }

    if (password != "" && password === passwordConfirm) {
        isComplete = true;
        passwordsmatch.setAttribute("checked", true);
    }
    else {
        passwordsmatch.removeAttribute("checked");
        isComplete = false;
    }

    if (isComplete) {
        passwordBtn.style.visibility = "visible";
    }
    else {
        passwordBtn.style.visibility = "hidden";
    }
}
