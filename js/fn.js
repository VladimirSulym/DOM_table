//document.addEventListener('DOMContentLoaded', handleAddStudentButtonClick)


let STATE = {
    tableEditFlag: false,
    tableRowEditIndex: null,
    oldCellData: null,
    fieldCellNames: ['id', 'userDisabled','userFname', 'userSname', 'userEmail', 'userKurs', 'userRank'],
    editableTRID: 'editableTRID',
}

document.getElementById('butInsertUser').addEventListener('click', handleAddStudentButtonClick);
document.getElementById('userRank').addEventListener('change', handleChangeRank);
//document.querySelector('h5').addEventListener('click', incertInfoToTr);

addHandlersToTableRows();

function addHandlersToTableRows () {
    let allTRs = document.getElementById('usersList').querySelector('tbody').children;
    for (let i=0; i<allTRs.length; i++) {
        let oneTR = allTRs[i];
        oneTR.addEventListener('click', handleTRClick);
    }
}

function handleTRClick (e) {
    let currentElement = e.currentTarget;
    insertSaveCancelControls(currentElement);
    // if (Array.from(currentElement.classList).includes('editable')) {
    if (STATE.tableEditFlag) {
        return null;
    }

    STATE.tableEditFlag = true;

    currentElement.classList.add('editable');
    let allTDs = currentElement.children;
    let textData = '';
    for (let i=0; i<allTDs.length; i++) {
        let oneTD = allTDs[i];
        if (!i) {
            STATE.tableRowEditIndex = +oneTD.innerText - 1
        }

        let iconUserDisable = oneTD.querySelector('i')
        if (iconUserDisable){
            let iconUserDisableValue = Array.from(iconUserDisable.classList).includes('text-danger')
            creatSelectForTableCell(oneTD, iconUserDisableValue, STATE.fieldCellNames[i]);
            saveBacupData(i, iconUserDisableValue);
        } else {
            textData = oneTD.innerText;
            creatInputForTableCell(oneTD, textData, STATE.fieldCellNames[i]);
            saveBacupData(i, textData);
        }
    }
}

function saveBacupData (index, cellData) {
    let oldCellData = STATE.oldCellData || {};
    let field = STATE.fieldCellNames[index];
    oldCellData[field]=cellData;

    STATE.oldCellData = oldCellData;
}

function creatInputForTableCell (parent, text, fieldName) {
    let inpunEl = document.createElement('input');
    inpunEl.setAttribute('type', 'text');
    inpunEl.setAttribute('id', fieldName+'Inline');
    inpunEl.className = 'form-control';
    inpunEl.value = text;
    parent.innerHTML ='';
    parent.appendChild(inpunEl);
}

function creatSelectForTableCell (parent, value, fieldName) {
    let selectEl = document.createElement('select');
    selectEl.setAttribute('id', fieldName+'Inline');
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    selectEl.className = 'form-control';
    parent.innerHTML ='';
    parent.appendChild(selectEl);
    selectEl.appendChild(option1);
    selectEl.appendChild(option2);
    option1.innerText = 'Нет';
    option2.innerText = 'Да';

    option1.setAttribute('value', 'Нет');
    option2.setAttribute('value', 'Да');
    if (value) {
        option1.setAttribute('selected', 'true');
    } else {
        option2.setAttribute('selected', 'true');
    }

}

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


    let arrTD = STATE.fieldCellNames;
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

function insertSaveCancelControls (previoserTR) {

    if (STATE.tableEditFlag) {
        return null;
    }

    let newTR = document.createElement('tr');
    newTR.className = 'editable';
    newTR.setAttribute('id', STATE.editableTRID);
    newTR.innerHTML = '<td colspan="7" align="center">\n' +
        '<button onclick="handleUpdateDataInCells()" type="button" class="btn btn-outline-success">Сохранить</button>' +
        '<button onclick="handleCancelEdit()" type="button" class="btn btn-outline-secondary btn-space">Отменить</button>' +
        '<button onclick="handleDeleteRow()" type="button" class="btn btn-outline-danger btn-space">Удалить</button>' +
        '</td>';
    let parent = previoserTR.parentElement;
    parent.insertBefore(newTR, previoserTR.nextSibling);
}

function handleCancelEdit () {
    const oldCellData = STATE.oldCellData;
    const parent = remuveEditControlsTable();
    let editableTR = parent.querySelector('.editable');
    incertInfoToTr(oldCellData, editableTR);

}

function incertInfoToTr (values, trToOperate) {
    let childTR = trToOperate.children;
    for (let i=0; i < childTR.length; i++) {
        let oneCell = childTR[i];
        oneCell.innerText ='';

        let field = STATE.fieldCellNames[i];
        let textData = values [field];

        if (field === 'userDisabled') {
            let icon = document.createElement('i');
            icon.className = 'fas fa-user text-'+ (textData ? 'danger' : 'success');
            oneCell.appendChild(icon);
        } else {
            oneCell.innerText = textData;
        }
    }
}

function handleDeleteRow () {
    const parent = remuveEditControlsTable();
    const editableTR = parent.querySelector('.editable');
    parent.removeChild(editableTR);
}

function remuveEditControlsTable () {
    const editControl = document.getElementById(STATE.editableTRID);
    const parent = editControl.parentElement;
    parent.removeChild(editControl);

    STATE.tableEditFlag = false;
    STATE.oldCellData = null;

    return parent;

}

function handleUpdateDataInCells () {
    const parent = remuveEditControlsTable();
    let newDateForCells = {};

    STATE.fieldCellNames.forEach(function (item, index) {
        let text = document.getElementById(item+'Inline').value;
        if ("userDisabled" === item) {
            text = text === "Да" ? false : true;
        }
        newDateForCells[ item ] = text;
        });
    const editableTR = parent.querySelector('.editable');
    incertInfoToTr(newDateForCells, editableTR)
}