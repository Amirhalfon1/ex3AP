if (localStorage.getItem("mazeRows") != null) {
    $('#rowsInput').val(localStorage.getItem("mazeRows"));
}
if (localStorage.getItem("mazeCols") != null) {
    $('#colsInput').val(localStorage.getItem("mazeCols"));
}
if (localStorage.getItem("mazeAlg") != null) {
    $('#algSelect').val(localStorage.getItem("mazeAlg"));
}
function saveClick() {
    if (settingsValidation()) {
        localStorage.mazeRows = $('#rowsInput').val();
        localStorage.mazeCols = $('#colsInput').val();
        localStorage.mazeAlg = $('#algSelect').val();
        window.location.replace("HomePage.html");
    }
};