$(document).ready(function () {
    var usersUri = ("../api/UserDetailsModels");
    var table = document.getElementById("rankTable");
    var body = document.createElement('tbody');
    $.get(usersUri).done(function (data) {

        for (i = 0; i < data.length; i++) {
            var tr = document.createElement('TR');

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(i + 1));
            tr.appendChild(td);

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[i].Name));
            tr.appendChild(td);

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[i].Wins));
            tr.appendChild(td);

            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[i].Loses));
            tr.appendChild(td);

            body.appendChild(tr);
            table.appendChild(body);
        }
    });
})