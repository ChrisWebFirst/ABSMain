

const employees = new Array();


class Employee {
    constructor(data) {
        this.Name = `${data.FirstName}  ${data.LastName}`;
        this.Title = data.Title;
        this.Department = data.Department;
        this.SubDepartment = data.SubDepartment;
        this.ViewOrder = data.ViewOrder;
        this.Email = data.EmailAddress;
        this.Photo = data.Photo;
    }
}

const getEmployees = () => {
    const options = {
        method: 'POST',
        headers: {
            //'Authorization': 'Bearer ' + token,
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    var subCategories = "";
    fetch('https://connect.alliedbuildingstores.com/api/publicsite/employees', options)
        .then(response => response.json())
        .then(data => {

            let d = JSON.parse(data);

            for (let i = 0; i < d.length; i++) {

                let employee = new Employee(d[i]);

                let userCard = document.createElement("div");
                userCard.classList.add("col-sm-10");
                userCard.classList.add("col-md-6");
                userCard.classList.add("col-xxl-4");

                let team = document.createElement("div");
                team.classList.add("team");
                userCard.appendChild(team);

                let teamInner = document.createElement("div");
                teamInner.classList.add("team-inner");
                team.appendChild(teamInner);

                let teamImage = document.createElement("div");
                teamImage.classList.add("team-image");
                teamInner.appendChild(teamImage);

                let image = document.createElement("img");
                image.src = employee.Photo;
                image.alt = "employe pic";
                teamImage.appendChild(image);

                let teamContent = document.createElement("div");
                teamContent.classList.add("team-content");
                teamInner.appendChild(teamContent);

                let userName = document.createElement("h5");
                let userNameText = document.createTextNode(employee.Name);
                userName.appendChild(userNameText);
                teamContent.appendChild(userName);

                let teamOffice = document.createElement("div");
                teamOffice.classList.add("team-office");
                teamContent.appendChild(teamOffice);

                let teamOfficeSpan = document.createElement("span");
                let titleText = document.createTextNode(employee.Title);
                teamOfficeSpan.appendChild(titleText);
                teamOffice.appendChild(teamOfficeSpan);

                let teamDivider = document.createElement("div");
                teamDivider.classList.add("team-divider");
                teamContent.appendChild(teamDivider);

                let teamemail = document.createElement("a");
                teamemail.setAttribute("href", "mailto:#");
                let emailText = document.createTextNode(employee.Email);
                teamemail.appendChild(emailText);
                teamContent.appendChild(teamemail);
                let titleCaseDepartment = titleCase(employee.Department).replace(",", "").replace(" ", "");





                if (titleCaseDepartment != "Administration") {
                    let row = document.getElementById("EmployeeRow_" + titleCaseDepartment);
                    if (row != null) {
                        if ((employee.Department != employee.SubDepartment) && !subCategories.includes(employee.SubDepartment)) {
                            subCategories += employee.SubDepartment;
                            let subDept = document.createElement("h5");
                            subDept.classList.add("col-xs-12");
                            let subDeptText = document.createTextNode(employee.SubDepartment);
                            subDept.appendChild(subDeptText);
                            row.appendChild(subDept);
                        }
                        row.appendChild(userCard);
                    }
                }
                employees.push(employee);
            }
        });

}

function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join();
}

getEmployees();