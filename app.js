// read and interacts with the HTML elements refered
const generateBtn = document.getElementById('generate-btn');
const outputDiv = document.getElementById('output');

// makes the button work as intended
generateBtn.addEventListener('click', () => {
    // makes the text area to be able to be fullfiled and interacts with the groups input
	const nameListTextarea = document.getElementById('name-list');
	const numGroupsInput = document.getElementById('num-groups');
	const nameList = nameListTextarea.value.trim().split('\n').filter(name => name.trim() !== '');
	const numGroups = parseInt(numGroupsInput.value, 10);

	if (!nameList || !numGroups || nameList.length < numGroups) {
		alert('Please enter a valid list of names and number of groups.');
		return;
	}

	const shuffledList = shuffleArray(nameList);
	const groups = divideArrayIntoGroups(shuffledList, numGroups);
	outputDiv.innerHTML = generateOutputHtml(groups);
});

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function divideArrayIntoGroups(array, numGroups) {
	const groups = Array(numGroups).fill().map(() => []);
	let currentGroupIndex = 0;
	for (let i = 0; i < array.length; i++) {
		groups[currentGroupIndex].push(array[i]);
		currentGroupIndex = (currentGroupIndex + 1) % numGroups;
	}
	return groups;
}

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