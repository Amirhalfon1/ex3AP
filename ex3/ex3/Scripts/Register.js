function register() {
    var str1 = $("#password").val();
    var str2 = $("#passwordConfirmation").val();
    if (theSamePassword(str1, str2)) {
        var userName = $("#userName").val();
        var password = $("#password").val();
        var email = $("#email").val();
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
                        $("#register").text(helloUser);
                        $("#register").attr("href", "#");
                        $("#login").text("Logout");
                        $("#login").attr("href", "#");
                        window.location.replace("HomePage.html");
                    })

            }

        });


    } else {
        alert("There is a conflict between passwords");
    }

}

function theSamePassword(str1, str2) {
    var ret = str1.localeCompare(str2);
    if (ret == 0) {
        return true;
    } else {
        return false;
    }
}

$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});
