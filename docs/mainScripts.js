//The scripts for the main page

//Global variables used for the mock up features
var savedNotes = {placeholder: ''};
var saves = {};
var fontSizePreference = '';
var fontColourPreference = '';
var backgroundColourPreference = '';
var createdNotes = [];
var updatedText = '';
var updateStatus = false;

//Code that runs when the the pages are loaded. It opens the first tab on each page
function mainLoad() {
	document.getElementById('welcomeBtn').click();
}


//Code for switching tabs on the notes screen
function notesSwitchTab(evt, noteName) {
	var i, notesTabContent, tabLinks;
  
	//Sets the title to the current note
	document.getElementById('title').innerHTML = 'Notes - ' + noteName;

	//Goes through all the notes and hides them
	notesTabContent = document.getElementsByClassName('notesTabContent');
	for (i = 0; i < notesTabContent.length; i++) {
		notesTabContent[i].style.display = 'none';
	}

	//Unclicks all the buttons
	tabLinks = document.getElementsByClassName('tabLinks');
	for (i = 0; i < tabLinks.length; i++) {
		tabLinks[i].className = tabLinks[i].className.replace(' active', '');
	}

	//reveals the selected note and sets the button to 'clicked'
	document.getElementById(noteName).style.display = 'block';
	evt.currentTarget.className += ' active';
}

//The function that will log the user out and go back to the index page
function logout() {
	window.location.href = 'index.html';
}

//The code that runs when the '+' tab is clicked for making new notes. A popup asks the user to type...
//...in the title of the new note tab. A button element is then created with the current class name,...
//... text, id and the function to switch tabs - all using this name when needed.
function newNote() {	
	//A pop up asks the user to type in the title of the new note tab.
	var name = prompt('Enter the title of the note');
	

	//Error handling for a blank name, repeated name or if canceled is pressed
	if(name == '' || name == null) {
		return(0);
	} else if (createdNotes.includes(name)){
		alert('That note already exists!');
		return(0);
	}
	
	//Adds the note to a array so two notes can't have the same name
	createdNotes.push(name);
	
	//A button element is then created with the current class name, text, id and the function to...
	//...switch tabs - all using this name when needed. The tab menu is then found along with the...
	//...'+' tab so that the new tab can be inserted before it
	var btn = document.createElement('button');
	btn.className = 'tabLinks';
	btn.innerHTML = name;
	btn.id = name + 'Btn';
	btn.onclick = function() {
		notesSwitchTab(event, name);
	};
	var tab = document.getElementById('tabs');
	var position = document.getElementById('addNote');
	tab.insertBefore(btn, position);
	
	//Create a div element with the id of the name and the class for note content. This class allows...
	//...for the correct CSS styling to be applied
	var note = document.createElement('div');
	note.id = name;
	note.className = 'notesTabContent';
	
	//Create an input element that takes text, has the name title, value of the name and an id of the...
	//...name with Title which is then added to the div created earlier
	var input = document.createElement('input');
	input.type = 'text';
	input.name = 'title';
	input.id = name + 'Title';
	input.value = name;
	input.style.fontSize = 25;
	input.readOnly = true;
	note.appendChild(input);
	
	//Create a textarea with the name as name with Text and a placeholder of 'Notes' which is...
	//...appended to the div
	var textArea = document.createElement('textarea');
	textArea.name = name + 'Text';
	textArea.placeholder = 'Notes';
	textArea.id = name + 'Text';
	textArea.autofocus = true;
	textArea.onkeydown = function() {
		noteEdit(name);
		liveWordCount(name);
	}

	note.appendChild(textArea);

	//Create another div for the buttons. This is given the class of control for a new CSS styling
	var controls = document.createElement('div');
	controls.id = name + 'Controls';
	controls.className = 'controls';
	
	//Create a cancel button with a click function that calls the switch tab function to the home....
	//... This is then appended to the control div
	var cancel = document.createElement('button');
	cancel.innerHTML = 'Cancel';
	cancel.id = name + 'Cancel';
	cancel.onclick = function() {
		cancelNote(name);
	};
	controls.appendChild(cancel);
	
	//Create a save button and appended to the control div
	var save = document.createElement('button');
	save.innerHTML = 'Save';
	save.id = name + 'Save';
	save.onclick = function() {
		saveNote(name);
	}
	controls.appendChild(save);
	
	//Create a delete button with a function that passes the tab's name to the delete function and...
	//...then append to the control div
	var del = document.createElement('button');
	del.innerHTML = 'Delete';
	del.id = name + 'Delete';
	del.onclick = function() {
		deleteNote(name);
	};
	controls.appendChild(del);
	
	//Update button to allow the tab to be renamed
	var update = document.createElement('button');
	update.innerHTML = 'Change Title';
	update.id = name + 'Update';
	update.onclick = function() {
		updateTitle(name);
	}
	controls.appendChild(update);
	
	//Print button to print the note
	var print = document.createElement('button');
	print.innerHTML = 'Print';
	print.id = name + 'Print';
	print.onclick = function() {
		window.print();
	}
	controls.appendChild(print);
	
	//Button to save to computer
	var saveToFile = document.createElement('button');
	saveToFile.innerHTML = 'Save File';
	saveToFile.id = name + 'SaveFile';
	saveToFile.onclick = function() {
		saveFile(name);
	}
	controls.appendChild(saveToFile);
		
	//The following code allows the user to change the font size. It includes a label, select and...
	//...multiple options within the select tag for the font sizes
	var fontSize = document.createElement('label');
	fontSize.innerHTML = 'Font Size: ';
	controls.appendChild(fontSize);
	
	var selectFontSize = document.createElement('select');
	selectFontSize.id = name + "SelectFontSize";
	selectFontSize.size = '1';
	selectFontSize.name = name + 'SelectFontSize';
	selectFontSize.onchange = function() {
		changeFontSize(this, name);
	}
	
	var nine = document.createElement('option');
	nine.value = 9;
	nine.innerHTML = '9';
	selectFontSize.appendChild(nine);
	
	var ten = document.createElement('option');
	ten.value = 10;
	ten.innerHTML = '10';
	selectFontSize.appendChild(ten);
	
	var eleven = document.createElement('option');
	eleven.value = 11;
	eleven.innerHTML = '11';
	selectFontSize.appendChild(eleven);
	
	var twelve = document.createElement('option');
	twelve.value = 12;
	twelve.innerHTML = '12';
	selectFontSize.appendChild(twelve);
	
	var fourteen = document.createElement('option');
	fourteen.value = 14;
	fourteen.innerHTML = '14';
	selectFontSize.appendChild(fourteen);
	
	var sixteen = document.createElement('option');
	sixteen.value = 16;
	sixteen.innerHTML = '16';
	selectFontSize.appendChild(sixteen);
	
	var eighteen = document.createElement('option');
	eighteen.value = 18;
	eighteen.innerHTML = '18';
	selectFontSize.appendChild(eighteen);
	
	var twenty = document.createElement('option');
	twenty.value = 20;
	twenty.innerHTML = '20';
	selectFontSize.appendChild(twenty);
	
	var twentytwo = document.createElement('option');
	twentytwo.value = 22;
	twentytwo.innerHTML = '22';
	selectFontSize.appendChild(twentytwo);
	
	var twentyfour = document.createElement('option');
	twentyfour.value = 24;
	twentyfour.innerHTML = '24';
	selectFontSize.appendChild(twentyfour);
	
	var twentysix = document.createElement('option');
	twentysix.value = 26;
	twentysix.innerHTML = '26';
	selectFontSize.appendChild(twentysix);
	
	var twentyeight = document.createElement('option');
	twentyeight.value = 28;
	twentyeight.innerHTML = '28';
	selectFontSize.appendChild(twentyeight);
	
	var thirtysix = document.createElement('option');
	thirtysix.value = 36;
	thirtysix.innerHTML = '36';
	selectFontSize.appendChild(thirtysix);
	
	var fortyeight = document.createElement('option');
	fortyeight.value = 48;
	fortyeight.innerHTML = '48';
	selectFontSize.appendChild(fortyeight);
	
	var seventyeight = document.createElement('option');
	seventyeight.value = 72;
	seventyeight.innerHTML = '72';
	selectFontSize.appendChild(seventyeight);
	
	//Append the font size selector to the control div
	controls.appendChild(selectFontSize);
	
	//Code for the font colour
	var fontColour = document.createElement('label');
	fontColour.innerHTML = 'Font Colour: ';
	controls.appendChild(fontColour);
	
	var selectFontColour = document.createElement('select');
	selectFontColour.id = name + 'SelectFontColour';
	selectFontColour.size = "1";
	selectFontColour.name = name + 'SelectFontColour';
	selectFontColour.onchange = function() {
		changeFontColour(this, name);
	}
	
	var fontBlack = document.createElement('option');
	fontBlack.value = 'Black';
	fontBlack.innerHTML = 'Black';
	selectFontColour.appendChild(fontBlack);

	var fontWhite = document.createElement('option');
	fontWhite.value = 'White';
	fontWhite.innerHTML = 'White';
	selectFontColour.appendChild(fontWhite);
	
	var fontAqua = document.createElement('option');
	fontAqua.value = 'Aqua';
	fontAqua.innerHTML = 'Aqua';
	selectFontColour.appendChild(fontAqua);	
		
	var fontBeige = document.createElement('option');
	fontBeige.value = 'Beige';
	fontBeige.innerHTML = 'Beige';
	selectFontColour.appendChild(fontBeige);	

	var fontBlue = document.createElement('option');
	fontBlue.value = 'Blue';
	fontBlue.innerHTML = 'Blue';
	selectFontColour.appendChild(fontBlue);	
	
	var fontBrown = document.createElement('option');
	fontBrown.value = 'Brown';
	fontBrown.innerHTML = 'Brown';
	selectFontColour.appendChild(fontBrown);	

	var fontCyan = document.createElement('option');
	fontCyan.value = 'Cyan';
	fontCyan.innerHTML = 'Cyan';
	selectFontColour.appendChild(fontCyan);

	var fontFuchsia = document.createElement('option');
	fontFuchsia.value = 'Fuchsia';
	fontFuchsia.innerHTML = "Fuchsia";
	selectFontColour.appendChild(fontFuchsia);

	var fontGold = document.createElement('option');
	fontGold.value = 'Gold';
	fontGold.innerHTML = 'Gold';
	selectFontColour.appendChild(fontGold);

	var fontGrey = document.createElement('option');
	fontGrey.value = 'Grey';
	fontGrey.innerHTML = 'Grey';
	selectFontColour.appendChild(fontGrey);

	var fontGreen = document.createElement('option');
	fontGreen.value = 'Green';
	fontGreen.innerHTML = 'Green';
	selectFontColour.appendChild(fontGreen);

	var fontIndigo = document.createElement('option');
	fontIndigo.value = 'Indigo';
	fontIndigo.innerHTML = "Indigo";
	selectFontColour.appendChild(fontIndigo);

	var fontLime = document.createElement('option');
	fontLime.value = 'Lime';
	fontLime.innerHTML = 'Lime';
	selectFontColour.appendChild(fontLime);
		
	var fontOrange = document.createElement('option');
	fontOrange.value = 'Orange';
	fontOrange.innerHTML = 'Orange';
	selectFontColour.appendChild(fontOrange);
			
	var fontPink = document.createElement('option');
	fontPink.value = 'Pink';
	fontPink.innerHTML = 'Pink';
	selectFontColour.appendChild(fontPink);
	
	var fontPurple = document.createElement('option');
	fontPurple.value = 'Purple';
	fontPurple.innerHTML = 'Purple';
	selectFontColour.appendChild(fontPurple);
				
	var fontRed = document.createElement('option');
	fontRed.value = 'Red';
	fontRed.innerHTML = 'Red';
	selectFontColour.appendChild(fontRed);
				
	var fontTeal = document.createElement('option');
	fontTeal.value = 'Teal';
	fontTeal.innerHTML = 'Teal';
	selectFontColour.appendChild(fontTeal);
	controls.appendChild(selectFontColour);
					
	var fontViolet = document.createElement('option');
	fontViolet.value = 'Violet';
	fontViolet.innerHTML = 'Violet';
	selectFontColour.appendChild(fontViolet);
						
	var fontYellow = document.createElement('option');
	fontYellow.value = 'Yellow';
	fontYellow.innerHTML = 'Yellow';
	selectFontColour.appendChild(fontYellow);
	
	//Append the font colour selector to the control div
	controls.appendChild(selectFontColour);
	
	//Code for the background colour selector
	var backgroundColour = document.createElement('label');
	backgroundColour.innerHTML = 'Background Colour: ';
	controls.appendChild(backgroundColour);
	
	var selectBackgroundColour = document.createElement('select');
	selectBackgroundColour.id = name + 'SelectBackgroundColour';
	selectBackgroundColour.size = '1';
	selectBackgroundColour.name = name + 'SelectBackgroundColour';
	selectBackgroundColour.onchange = function() {
		changeBackgroundColour(this, name);
	}
	
	var backgroundBlack = document.createElement('option');
	backgroundBlack.value = 'White';
	backgroundBlack.innerHTML = 'White';
	selectBackgroundColour.appendChild(backgroundBlack);
	
	var backgroundBlack = document.createElement('option');
	backgroundBlack.value = 'Black';
	backgroundBlack.innerHTML = 'Black';
	selectBackgroundColour.appendChild(backgroundBlack);
		
	var backgroundAqua = document.createElement('option');
	backgroundAqua.value = 'Aqua';
	backgroundAqua.innerHTML = 'Aqua';
	selectBackgroundColour.appendChild(backgroundAqua);
		
	var backgroundBeige = document.createElement('option');
	backgroundBeige.value = 'Beige';
	backgroundBeige.innerHTML = "Beige";
	selectBackgroundColour.appendChild(backgroundBeige);
	
	var backgroundBlue = document.createElement('option');
	backgroundBlue.value = 'Blue';
	backgroundBlue.innerHTML = 'Blue';
	selectBackgroundColour.appendChild(backgroundBlue);
		
	var backgroundBrown = document.createElement('option');
	backgroundBrown.value = 'Brown';
	backgroundBrown.innerHTML = 'Brown';
	selectBackgroundColour.appendChild(backgroundBrown);
		
	var backgroundCyan = document.createElement('option');
	backgroundCyan.value = 'Cyan';
	backgroundCyan.innerHTML = 'Cyan';
	selectBackgroundColour.appendChild(backgroundCyan);
			
	var backgroundFuchsia = document.createElement('option');
	backgroundFuchsia.value = 'Fuchsia';
	backgroundFuchsia.innerHTML = 'Fuchsia';
	selectBackgroundColour.appendChild(backgroundFuchsia);
		
	var backgroundGold = document.createElement('option');
	backgroundGold.value = 'Gold';
	backgroundGold.innerHTML = 'Gold';
	selectBackgroundColour.appendChild(backgroundGold);
			
	var backgroundGrey = document.createElement('option');
	backgroundGrey.value = 'Grey';
	backgroundGrey.innerHTML = 'Grey';
	selectBackgroundColour.appendChild(backgroundGrey);
	
	var backgroundGreen = document.createElement('option');
	backgroundGreen.value = 'Green';
	backgroundGreen.innerHTML = 'Green';
	selectBackgroundColour.appendChild(backgroundGreen);
			
	var backgroundIndigo = document.createElement('option');
	backgroundIndigo.value = 'Indigo';
	backgroundIndigo.innerHTML = "Indigo";
	selectBackgroundColour.appendChild(backgroundIndigo);
			
	var backgroundLime = document.createElement('option');
	backgroundLime.value = 'Lime';
	backgroundLime.innerHTML = 'Lime';
	selectBackgroundColour.appendChild(backgroundLime);
						
	var backgroundOrange = document.createElement('option');
	backgroundOrange.value = 'Orange';
	backgroundOrange.innerHTML = 'Orange';
	selectBackgroundColour.appendChild(backgroundOrange);
				
	var backgroundPink = document.createElement('option');
	backgroundPink.value = 'Pink';
	backgroundPink.innerHTML = 'Pink';
	selectBackgroundColour.appendChild(backgroundPink);
	
	var backgroundPurple = document.createElement('option');
	backgroundPurple.value = 'Purple';
	backgroundPurple.innerHTML = 'Purple';
	selectBackgroundColour.appendChild(backgroundPurple);
	
	var backgroundRed = document.createElement('option');
	backgroundRed.value = 'Red';
	backgroundRed.innerHTML = 'Red';
	selectBackgroundColour.appendChild(backgroundRed);
		
	var backgroundTeal = document.createElement('option');
	backgroundTeal.value = 'Teal';
	backgroundTeal.innerHTML = 'Teal';
	selectBackgroundColour.appendChild(backgroundTeal);
		
	var backgroundViolet = document.createElement('option');
	backgroundViolet.value = 'Violet';
	backgroundViolet.innerHTML = 'Violet';
	selectBackgroundColour.appendChild(backgroundViolet);
		
	var backgroundYellow = document.createElement('option');
	backgroundYellow.value = 'Yellow';
	backgroundYellow.innerHTML = 'Yellow';
	selectBackgroundColour.appendChild(backgroundYellow);
	
	//Append the background colour element to the controls div
	controls.appendChild(selectBackgroundColour);
	
	//Creates the label and text box for the word count meta data
	var wordCountLabel = document.createElement('label');
	wordCountLabel.innerHTML = 'Word Count: ';
	controls.appendChild(wordCountLabel);
	
	var wordCount = document.createElement('input');
	wordCount.id = name + 'WordCount';
	wordCount.readOnly = true;
	controls.appendChild(wordCount);
	
	//Creates a label for the last update meta data information
	var dateUpdated = document.createElement('label')
	var date = new Date();
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var month = monthNames[date.getMonth() + 1];
	var day = date.getDay();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes();
	dateUpdated.innerHTML = 'Last update: ' + day + ' ' +month + ' ' + year + ' at ' + hour + ':' + minute;
	dateUpdated.id = name + 'Date';
	controls.appendChild(dateUpdated);
	
	//Append the control div to the note div
	note.appendChild(controls);
	
	//Append the note div to the end of the body tag meaning the tab now exists
	document.getElementsByTagName('body')[0].appendChild(note);
	
	//If the title has been updated then populate the inputs with their previous values
	if (updatedText != '') {
		document.getElementById(name + 'Text').value = updatedText;
		document.getElementById(name + 'Text').style.fontSize = fontSizePreference + 'px';
		document.getElementById(name + 'Text').style.color = fontColourPreference;
		document.getElementById(name + 'Text').style.backgroundColor = backgroundColourPreference;
		document.getElementById(name + 'SelectFontSize').value = fontSizePreference;
		document.getElementById(name + 'SelectFontColour').value = fontColourPreference;
		document.getElementById(name + 'SelectBackgroundColour').value = backgroundColourPreference;
		updatedText = '';
		fontSizePreference = '';
		fontColourPreference = '';
		backgroundColorPreference = '';
	}
	
	//Switch to the new tab and click the tab for it
	notesSwitchTab(event, name);
	document.getElementById(name + 'Btn').click();
}

//Function that tracks if the notes have been edited
function noteEdit(noteName) {
	saves[name] = false;
}

//Code for canceling changes made to the note. This reverts the changes back to the last save state
function cancelNote(noteName) {
	if (saves[name] == false) {
		var text = document.getElementById(noteName + 'Text');
		text.value = savedNotes[name];
	}
	document.getElementById('welcomeBtn').click();
}

//Function for saving notes. It saves the textarea text as the item of the notes name in a dictionary...
//... as well as saving the update date
function saveNote(noteName) {
	var date = new Date();
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var month = monthNames[date.getMonth() + 1];
	var day = date.getDay();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes();
	temp = 'Last update: ' + day + ' ' +month + ' ' + year + ' at ' + hour + ':' + minute;
	
	var text = document.getElementById(noteName + 'Text');
	var date = document.getElementById(noteName + 'Date');
	date.innerHTML = temp;
	savedNotes[name] = text.value;
	saves[name] = true;
}

//Code for deleting notes. If the button is pressed then a pop up asks the user to confirm the decision...
// and if they do then the button element in the menu bar is removed as well as the div element for...
//..that note. All entry's to the arrays are also removed. The screen then switches to the welcome tab
function deleteNote(noteName) {
	
	//Depending on whether or not the function was accessed from the update function depends on what...
	//...message is displayed.
	if (updateStatus == false) {
		conf = confirm('Are you sure you want to delete ' + noteName + '?');		
	} else if(updateStatus == true){
		updateStatus = false;
		conf = confirm('Are you sure you want to update the title of ' + noteName + '?');
		if (conf == false) {
			return(false);
		}	
	}
	if (conf == true) {
		var index = createdNotes.indexOf(noteName);
		createdNotes.splice(index, 1);
		var element = document.getElementById(noteName);
		element.parentNode.removeChild(element);
		var element = document.getElementById(noteName + 'Btn');
		element.parentNode.removeChild(element);
		document.getElementById('welcomeBtn').click();
		return(true);
	}
}

//Function for updating the title of a notes page. Takes the current value of the textarea/...
//... font size/colour/background colour and stores them each in a variable. It then deletes...
//... the note, making sure to return the state of the confirmation pop up, and creates a...
//... new note.
function updateTitle(noteName) {
	updateStatus = true;
	updatedText = document.getElementById(noteName + 'Text').value;
	
	fontSizePreference = document.getElementById(noteName + 'SelectFontSize').value;
	fontColourPreference = document.getElementById(noteName + 'SelectFontColour').value;
	backgroundColourPreference = document.getElementById(noteName + 'SelectBackgroundColour').value;
	
	conf = deleteNote(noteName);
	if (conf != false) {
		newNote();
	}
}

//Code to save the text of a file to a file on the computer
function saveFile(noteName) {
	var text = document.getElementById(noteName + 'Text').value;
	
	var link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	link.setAttribute('download', noteName + '.txt');

	link.style.display = 'none';
	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
}
 
//Function that changes the font size. Takes the selected value and the note name
function changeFontSize(evt, noteName) {
	var size = evt.options[evt.selectedIndex].value;
	document.getElementById(noteName + 'Text').style.fontSize = size + 'px';
}

//Function to change the font colour
function changeFontColour(evt, noteName) {
	var colour = evt.options[evt.selectedIndex].value;
	document.getElementById(noteName + 'Text').style.color = colour;
}

//Function to change the background colour
function changeBackgroundColour(evt, noteName) {
	var colour = evt.options[evt.selectedIndex].value;
	document.getElementById(noteName + 'Text').style.backgroundColor = colour;
}

//function for the live word count
function liveWordCount(noteName) {
	var content = document.getElementById(noteName + 'Text').value;
	if (content != '') {
		var words = (content.match(/\S+/g)).length;
	}
	document.getElementById(noteName + 'WordCount').value = words;
}