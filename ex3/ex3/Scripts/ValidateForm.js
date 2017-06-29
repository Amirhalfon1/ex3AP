function singleGameValidation() {
    var name = $('#mazeName').val();
    var rows = Number($('#rows').val());
    var cols = Number($('#cols').val());

    if ((name == "") || (rows == "") || (cols == "")) {
        alert("Please fill all fields");
        return false;
    }

    if (!(isNumber(rows) && isNumber(cols))) {
        alert('Rows and Cols have to be numbers');
        return false;
    }
    return true;
}

function multiGameValidation() {
    var name = $('#name').val();
    var rows = Number($('#rows').val());
    var cols = Number($('#cols').val());

    if ((name == "") || (rows == "") || (cols == "")) {
        alert("Please fill all fields");
        return false;
    }

    if (!(isNumber(rows) && isNumber(cols))) {
        alert('Rows and Cols have to be numbers');
        return false;
    }

    return true;
}

function settingsValidation() {
    var rows = Number($('#rowsInput').val());
    var cols = Number($('#colsInput').val());

    if ((rows == "") || (cols == "")) {
        alert("Please fill all fields");
        return false;
    }

    if (!(isNumber(rows) && isNumber(cols))) {
        alert('Rows and Cols have to be numbers');
        return false;
    }
    return true;
}


function loginValidation() {
    var name = $("#userName").val();
    var password = $("#password").val();

    if ((name == "") || (password == "")) {
        alert("Please fill all fields");
        return false;
    }

    return true;
}


function registerValidation() {
    var name = $("#userName").val();
    var password = $("#password").val();
    var passwordCon = $("#passwordConfirmation").val();
    var mail = $("#email").val();

    if ((name == "") || (password == "") || (mail == "") || (passwordCon == "")) {
        alert("Please fill all fields");
        return false;
    }

    return true;
}

function theSamePassword(str1, str2) {
    var ret = str1.localeCompare(str2);
    if (ret == 0) {
        return 1;
    } else {
        return 0;
    }
}

function validMail(mail) {
    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (pattern.test(mail)) {
        return 1;
    } else {
        return 0;
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}   