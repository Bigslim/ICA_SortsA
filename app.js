// read and interacts with the HTML elements refered
const generateBtn = document.getElementById('generate-btn');
const outputDiv = document.getElementById('output');
// a listener has to be added to save the generated groups. How? PDF, HTML, plain text?
const saveBtn = document.getElementById('save-btn');

// makes the button work as intended
generateBtn.addEventListener('click', () => {
	// makes the text area to be able to be fullfiled and interacts with the groups input
	const nameListTextarea = document.getElementById('name-list');
	const numGroupsInput = document.getElementById('num-groups');
	// functions to clear up blank space and ignore blank lines on the form 
	const nameList = nameListTextarea.value.trim().split('\n').filter(name => name.trim() !== '');
	// and to parse values on the selector
	const numGroups = parseInt(numGroupsInput.value, 10);

	// for the present no code for opt in nor out specific rules for sorting       
	if (!nameList || !numGroups || nameList.length < numGroups) {
		// only a small alert if the number of groups is greater than its members
		alert('Please enter a valid list of names and number of groups.');
		return;
	}


	// call the functions created below
	const shuffledList = shuffleArray(nameList);
	const groups = divideArrayIntoGroups(shuffledList, numGroups);
	outputDiv.innerHTML = generateOutputHtml(groups);
	// to display in the App
	outputDiv.innerHTML = outputHtml;

	// to write the output into a file A
	/*
	const fileData = new Blob([outputHtml], {type: 'text/html'});
	const downloadLink = document.createElement('a');
	downloadLink.href = URL.createObjectURL(fileData);
	downloadLink.download = 'groups.html';
	downloadLink.click();
	*/
	// to write the output into a file B
	/*
	const fs = require('fs');
	fs.writeFile('groups.html', outputHtml, (err) => {
		if (err) throw err;
		console.log('File saved!');
	});
	*/
});

// for shuffling the array
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		// there is no such thing for "random" in a program language, this is a pseudorandom math formula understandable by a computer
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// for sorting the elements in the groups
function divideArrayIntoGroups(array, numGroups) {
	const groups = Array(numGroups).fill().map(() => []);
	let currentGroupIndex = 0;
	for (let i = 0; i < array.length; i++) {
		groups[currentGroupIndex].push(array[i]);
		currentGroupIndex = (currentGroupIndex + 1) % numGroups;
	}
	return groups;
}

// for update the HTML with the scripted information
function generateOutputHtml(groups) {
	let html = '';
	for (let i = 0; i < groups.length; i++) {
		html += `<h2>Group ${i + 1}</h2>`;
		html += '<ul>';
		for (let j = 0; j < groups[i].length; j++) {
			html += `<li>${groups[i][j]}</li>`;
		}
		html += '</ul>';
	}
	return html;
}