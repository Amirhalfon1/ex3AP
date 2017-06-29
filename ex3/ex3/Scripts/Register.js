function register() {

    if (registerValidation()) {

        var str1 = $("#password").val();
        var str2 = $("#passwordConfirmation").val();
        var email = $("#email").val();
        var areSamePasswords = theSamePassword(str1, str2);
        var isValidMail = validMail(email);
        if (areSamePasswords && isValidMail) {
            var userName = $("#userName").val();
            var password = $("#password").val();
            //hashing and encripte the password.
            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(password);
            var hashedPassword = shaObj.getHash("HEX");
            var UserObject = {
                Name: userName,
                Email: email,
                Password: hashedPassword,
                Wins: 0,
                Loses: 0,
                Record: 0
            };
            var user_name = $("#userName").val();
            var registerUri = ("/api/UserDetailsModels/CheckIfExists/" + user_name);
            $.getJSON(registerUri).done(function (data) {
                /// <summary>s the specified data.</summary>
                /// <param name="data">The data.</param>
                /// <returns></returns>
                if (data == "exist") {
                    alert("User name already exist!");
                } else {
                    var apiUrl = "../api/UserDetailsModels/RealPost";
                    $.post(apiUrl, UserObject)
                        .done(function (data) {
                            alert("Register succeeded");
                            sessionStorage.setItem("Name", user_name);
                            var helloUser = "Hello " + userName;
                            window.location.replace("HomePage.html");
                        })
                }
            });
            //if Email or passwords are not valid.
        } else {
            if ((!areSamePasswords) && (!isValidMail)) {
                alert("There is a conflict between passwords and Email is not valid");
            } else if (!areSamePasswords) {
                alert("There is a conflict between passwords");
            } else if (!isValidMail) {
                alert("Email is not valid");
            }
        }
    }

}

$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});


