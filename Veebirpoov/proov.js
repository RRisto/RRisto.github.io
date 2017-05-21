/**
 * Created by Risto on 21.05.2017.
 */
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
    alert('Küpsis "' + name+'" olemas');
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            alert('The value of the cookie is ' + c.substring(nameEQ.length, c.length));
            // return c.substring(nameEQ.length, c.length);
    }
    // return null;
    alert('The value of the cookie is null');
}



function eraseCookie(name) {
    createCookie(name, "", -1);
}
