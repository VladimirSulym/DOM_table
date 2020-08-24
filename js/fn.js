//document.addEventListener('DOMContentLoaded', handleAddStudentButtonClick)

document.getElementById('butInsertUser').addEventListener('click', handleAddStudentButtonClick);
document.getElementById('userRank').addEventListener('change', handleChangeRank);
//document.querySelector('h5').addEventListener('click', insertRowToTable)

function handleAddStudentButtonClick (e) {
    // userFname userSname userEmail userKurs userRank userDisabled
    e.preventDefault();
    let data = {
        userFname: document.getElementById('userFname').value,
        userSname: document.getElementById('userSname').value,
        userEmail: document.getElementById('userEmail').value,
        userKurs: document.getElementById('userKurs').value,
        userRank: document.getElementById('userRank').value,
        userDisabled: document.getElementById('userDisabled').checked,
    }
    console.log(`User data`, data);

    if (!data.userFname.trim().length) {
        let Fname = document.getElementById('userFname');
        Fname.classList.add('is-invalid');
        Fname.parentElement.querySelector('#userFnameHelp').style.display = 'block';
    } else {
        let Fname = document.getElementById('userFname');
        Fname.classList.add('is-valid');
    }

    if (!data.userSname.trim().length) {
        let Sname = document.getElementById('userSname');
        Sname.classList.add('is-invalid');
        Sname.parentElement.querySelector('#userSnameHelp').removeAttribute('hidden');
    } else {
        let Sname = document.getElementById('userSname');
        Sname.classList.add('is-valid');
    }

    if ((data.userEmail.indexOf('@') === data.userEmail.lastIndexOf('@')) && (data.userEmail.indexOf('@')>= 0) && (data.userEmail.indexOf('.') === data.userEmail.lastIndexOf('.')) && (data.userEmail.indexOf('.')>= 0)){
        let Email = document.getElementById('userEmail');
        Email.classList.add('is-valid');
    } else {
        let Email = document.getElementById('userEmail');
        Email.classList.add('is-invalid');
        Email.parentElement.querySelector('#userEmailHelp').removeAttribute('hidden');
    }

    insertRowToTable(data);
    e.target.closest('form').reset();
}

function creatActivUserIcon (parent, status) {
    let icon = document.createElement('i');
    icon.className = 'fas fa-user text-'+ (status ? 'danger' : 'success');
    parent.appendChild(icon);
}

function insertRowToTable (data) {
    let table = document.getElementById('usersList');
    let tbody = table.querySelector('tbody');
    let newTR = document.createElement('tr');
    let totalRow = tbody.childElementCount;
    tbody.appendChild(newTR);


    let arrTD = ['id', 'userDisabled','userFname', 'userSname', 'userEmail', 'userKurs', 'userRank'];
    arrTD.forEach(function (value) {
        let newTD = document.createElement('td');
        if (value === 'id'){
            newTD.innerText = totalRow + 1;
        } else if (value === 'userDisabled'){
            creatActivUserIcon(newTD, data[value]);
        } else {
            newTD.innerText = data[value];
        }
        tbody.lastChild.appendChild(newTD);
    });
}

function handleChangeRank (e) {
    //document.getElementById('showRank').innerText = document.getElementById('userRank').value;
    e.target.parentElement.querySelector('span').innerText = document.getElementById('userRank').value;
}