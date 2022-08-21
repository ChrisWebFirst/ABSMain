function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue) {
    var date = new Date();
    const d = new Date(date.getTime() + 15 * 60000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

let loginCookie = getCookie("PVFk00GV+zNJNP25G");

let loginCount = 5;
if (loginCookie != "") {
    loginCount = Number(loginCookie);
}
if (loginCount != 5) {
    debugger;
    if (loginCount == 0) {
        document.getElementById("loginBtn").style.display = "none";
    }
    let countdiv = document.getElementById("count_num");
    countdiv.innerHTML = loginCount;
    let validationFailed = document.getElementById("validationfailed");
    validationFailed.style.display = "block";
}
const failedLogin = () => {
    loginCount--;
    setCookie("PVFk00GV+zNJNP25G", loginCount);
    if (loginCount == 0) {
        document.getElementById("loginBtn").style.display = "none";
    }
    let countdiv = document.getElementById("count_num");
    countdiv.innerHTML = loginCount;
    let validationFailed = document.getElementById("validationfailed");
    validationFailed.style.display = "block";
}
async function submitForm(event) {
    event.preventDefault();
    let userName = document.getElementById("login-email");
    let password = document.getElementById("login-password");
    var recaptcharesponse = grecaptcha.getResponse();
    if (recaptcharesponse.length != 0) {

        userName = userName.value;
        password = password.value;
        if (userName == null || userName == "" || password == null || password == "") {
            failedLogin();
            return false;
        }
        const params = {
            UserName: userName,
            Password: password
        };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params)
        };
        let response = await fetch('https://connect.alliedbuildingstores.com/api/Auth/Authenticate', options);

        if (!response.ok) {
            if (response.status == 401) {
                failedLogin();
                console.log(response.status);
            }
            throw new Error(`Error! status: ${response.status}`);
        }
        setCookie("PVFk00GV+zNJNP25G", 5);
        let data = await response.text();
        console.log(data);
        var token = JSON.parse(atob(data.split('.')[1]));
        console.log(token);
        let userid = token.sup;
        let type = token.type;
        let email = token.Email;
        let expire = token.Expire;
        let start = token.Start;
        //1 vendor
        //2 dealer
        //3 staff
        //5 outsidesales
        var url = ""
        switch (type) {
            case "1"://vendor

                break;
            case "2"://dealer
                url = "http://alliedbuildingstores.com/auth/remotelogin?token=" + data;
                break;
            case "3"://staff
                url = "http://alliedbuildingstores.com/auth/remotelogin?token=" + data;
                break;
            case "4"://outside sales

                break;
        }
        debugger;
        document.location = url;
    }
    else {
        failedLogin();
    }

}
let submit = document.getElementById("loginForm");
submit.addEventListener("submit", submitForm, false);


