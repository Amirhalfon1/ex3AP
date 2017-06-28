$(document).ready(function () {
    var name = sessionStorage.getItem("Name");
    console.log(name);
    document.getElementById("hello").innerHTML = "Hello " + name;
})


function logout() {
    sessionStorage.removeItem("Name");
    window.location.replace("LoginPage.html");
}

