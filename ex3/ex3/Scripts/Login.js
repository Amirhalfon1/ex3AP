function login() {
    var name = $("#userName").val();
    var password = $("#password").val();
    //var passwordAfterKey = SHA1(str2);
    var formInvalid = loginValidation();

    if (formInvalid) {

        var apiUrl = "../api/UserDetailsModels/RealGet";
        $.get(apiUrl, { userName: name }).done(function (data) {

            //hashing and encripte the password.
            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(password);
            var hashedPassword = shaObj.getHash("HEX");

            if (data.Password.localeCompare(hashedPassword) == 0) {
                sessionStorage.setItem("Name", name);
                var helloMessage = "Hello " + name;
                alert(helloMessage);
                window.location.replace("HomePage.html");
            } else {
                alert("The password does not match.Try another password");
            }
        })
            .fail(function (jqXHR, textStatus, err) {
                alert("userName not found");
            });
    }
}
$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});
