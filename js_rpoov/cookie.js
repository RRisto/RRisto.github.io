function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

function saveIt(name) {
	var x = document.forms['cookieform'].cookievalue.value;
	if (!x)
		alert('Please fill in a value in the input box.');
	else {
		Cookies.create(name,x,7);
		alert('Cookie created');
	}
}

function readIt(name) {
	alert('The value of the cookie is ' + Cookies[name]);
}

function eraseIt(name) {
	Cookies.erase(name);
	alert('Cookie erased');
}

function init() {
	for (var i=1;i<3;i++) {
		var x = Cookies['ppkcookie' + i];
		if (x) alert('Cookie ppkcookie' + i + '\nthat you set on a previous visit, is still active.\nIts value is ' + x);
	}
}
