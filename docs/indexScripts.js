//The scripts for the index page

//Global variables used for the mock up features
var loginCredentials = {'Admin@admin.com': 'Password'};

//Code that runs when the the pages are loaded. It opens the first tab on each page
function indexLoad() {
	document.getElementById('loginTabBtn').click();
}

//Code for switching tabs on the login screen
function loginSwitchTab(evt, tab) {
	var i, loginTabContent, loginTabLinks;
  
	//Sets the title to the current tab
	document.getElementById('title').innerHTML = 'Notes - ' + tab; 

	//Goes through all the tabs and hides them
	loginTabContent = document.getElementsByClassName('loginTabContent');
	for (i = 0; i < loginTabContent.length; i++) {
		loginTabContent[i].style.display = "none";
	}

	//Goes through all the buttons and 'unclicks' them
	loginTabLinks = document.getElementsByClassName('loginTabLinks');
	for (i = 0; i < loginTabLinks.length; i++) {
		loginTabLinks[i].className = loginTabLinks[i].className.replace(' active', '');
	}

	//Reveals the clicked tab and sets the button to 'clicked'
	document.getElementById(tab).style.display = 'block';
	evt.currentTarget.className += ' active'; 
}

//Code for the login form. Gets the login credentials dictionary and compares them to those...
//...that the user provided. If they match then the main.html page is loaded, else an alert is sent
function login() {
	var val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	email = document.getElementById('loginEmail').value;
	password = document.getElementById('loginPassword').value;

	if (email == '' || password == ''){
		indexModal('Please fill out the form boxes');
	} else if (val.test(String(email).toLowerCase()) == false) {
		indexModal('Invalid email');
	} else if (loginCredentials[email] == password) {
		window.location.href = 'main.html';
	} else {
		indexModal('Incorrect email or password');
	}
}

//Code for the register form. Takes in the two passwords and see if they match. If they do then the...
//...credentials are added to the dictionary and an alert tells the user that an account has been made...
//... - else an alert tells the user that the passwords do not match
function register() {
	var val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	email = document.getElementById('registerEmail').value;
	password1 = document.getElementById('registerPassword').value;
	password2 = document.getElementById('registerPasswordAgain').value;
	
	if(email == '' || password1 == '' || password2 == '') {
		indexModal('Please fill out the form boxes');
	} else if (val.test(String(email).toLowerCase()) == false) {
		indexModal('Invalid email');
	} else if(email in loginCredentials) {
		indexModal('Email already taken');
	} else if(password1 == password2) {
		loginCredentials[email] = password1;
		indexModal('Account created');
	} else {
		indexModal('Passwords do not match!');
	}	
}

//Code for the forgotten password. It only produces a message at the moment until server side is added
function forgot() {
	var val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	email = document.getElementById('forgotEmail').value;
	
	if (email == '') {
		indexModal('Please enter your email in the box above');
	} else if (val.test(String(email).toLowerCase()) == false) {
		indexModal('Invalid email');
	} else if(email in loginCredentials) {
		indexModal('An email has been sent to you with a link to the password reset page');
	} else {
		indexModal('That email is not registered');
	}
}

//Code for changing the password associated with an email. Mainly error checking and validation
function change() {
	var val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	email = document.getElementById('changeEmail').value;
	currentPassword = document.getElementById('changeCurrentPassword').value;
	newPassword = document.getElementById('changeNewPassword').value;
	newPasswordAgain = document.getElementById('changeNewPasswordAgain').value;
	
	if (email == '' || currentPassword == '' || newPassword == '' || newPasswordAgain == ''){
		indexModal('Please fill out the form boxes');
	} else if (val.test(String(email).toLowerCase()) == false) {
		indexModal('Invalid email');
	} else {
		if (email in loginCredentials) {
			if (loginCredentials[email] == currentPassword){
				if (currentPassword != newPassword && currentPassword != newPasswordAgain) {
					if (newPassword == newPasswordAgain) {
						loginCredentials[email] = newPassword;
						indexModal('Password has been changed');
					} else {
						indexModal('New passwords do not match');
					}
				} else {
					indexModal('New password cannot be the same and current password');
				}
			} else {
				indexModal('Wrong current password');
			}
		} else {
			indexModal('That email is not registered');
		}
	}
}

//Code that presses the button at the bottom of the current tab when enter is pressed unless the pop-up is...
//... open in which case it closes it
function enterButton(event, mode) {
	if (event.keyCode === 13) {
		if (document.getElementById('indexModal').style.display == 'none') {
			event.preventDefault();
			if(mode == 'login') {
				document.getElementById('loginBtn').click();
			} else if(mode == 'register') {
				document.getElementById('registerBtn').click();
			} else if(mode == 'forgot') {
				document.getElementById('forgotBtn').click();
			} else if(mode == 'change') {
				document.getElementById('changeBtn').click();
			}
		} else {
			document.getElementById('indexModal').style.display = 'none';
		}
	}
}

//Code for index message boxes
function indexModal(text) {
	var modal = document.getElementById('indexModal');
	modal.style.display = 'block';
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	}
	document.getElementById('registrationText').innerHTML = text;
}
