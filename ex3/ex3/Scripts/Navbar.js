$(document).ready(function () {
    if ((sessionStorage.getItem("Name") == undefined)) {
        
        $('#navigationDiv').load("menuBar.html");
    }
    else {
        $('#navigationDiv').load("menuBarAfterLogin.html");
    }
});
