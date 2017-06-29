function isLogin() {
    if ((sessionStorage.getItem("Name") == undefined)) {
        alert("You have to login first");
        //ev.preventDefault();
        return false;
    }
    else {
        window.location.replace("MultiPlayerPage.html"); 
    }
}