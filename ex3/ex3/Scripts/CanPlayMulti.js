function isLogin() {
    if ((sessionStorage.getItem("Name") == undefined)) {
        alert("You have to login first");
        ev.preventDefault();
    }
    else {
        window.location.replace("MultiPlayerPage.html"); 
    }
}