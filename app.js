/**
 * this directive is used to enforce the declaration of keywords
 * before the variables are used since JavaScript code can "infer"
 * their use and implicitly declare them as global variables which
 * may cause unexpected behavior and other bugs
 */
'use strict';

/**
 * the following constants have been declared to enable to get the 
 * HTML references to be used in this code
 */
const generateBtn = document.getElementById('generate-btn');
const outputDiv = document.getElementById('output');
const saveBtn = document.getElementById('save-btn');
// declaring this variable outside the event listeners enable this version to run as intended
let groups;

// event listener for the Generate Teams button
generateBtn.addEventListener('click', () => {
  // more HTML references
  const nameListTextarea = document.getElementById('name-list');
  const numGroupsInput = document.getElementById('num-groups');
  // to remove empty lines and whitespaces
  const nameList = nameListTextarea.value.trim().split('\n').filter(name => name.trim() !== '');
  // parse and limit values on the selector
  const numGroups = parseInt(numGroupsInput.value, 10);
  // simple validation and feedback for this version
  if (!nameList || !numGroups || nameList.length < numGroups) {
    alert('Please enter a valid list of names and number of groups.');
    return;
  } // it can be heavly improved in the future versions

  // variables and constants declared for the functions below
  const shuffledList = shuffleArray(nameList);
  groups = divideArrayIntoGroups(shuffledList, numGroups);

  // displaying it in the program
  outputDiv.innerHTML = generateOutputHtml(groups);
});

// event listener for the Save Teams button
saveBtn.addEventListener('click', () => {
  // simple validation and feedback for "misclicks"
  if (!groups) {
    alert('Please generate teams first.');
    return;
  }
  // outputing text
  const generatedOutput = generateOutputText(groups);

  /**
   * triggering the click event to interact with the host file system,
   * in other words save/download the generated .txt on your computer
   */
  const downloadLink = document.createElement('a'); // it holds the file till download
  downloadLink.href = generateOutputUrl(generatedOutput); // create the link
  downloadLink.download = 'teams'; // default naming
  downloadLink.click(); // download it
});

// to shuffle using Fisher-Yeates algorithm*
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// to divide the arrays preferably equally
function divideArrayIntoGroups(array, numGroups) {
  const groups = Array(numGroups).fill().map(() => []);
  let currentGroupIndex = 0;
  for (let i = 0; i < array.length; i++) {
    groups[currentGroupIndex].push(array[i]);
    currentGroupIndex = (currentGroupIndex + 1) % numGroups;
  }
  return groups;
}

/**
 * the following functions will be called by the listeners above 
 */

// to display the groups in the app
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

// to genarate a text file
function generateOutputText(groups) {
  let text = '';
  for (let i = 0; i < groups.length; i++) {
    text += `Group ${i + 1}:\n`;
    for (let j = 0; j < groups[i].length; j++) {
      text += `${groups[i][j]}\n`;
    }
    text += '\n';
  }
  return text;
}

// to generate a data URL to be downloaded
function generateOutputUrl(outputText) {
  const encodedOutput = encodeURIComponent(outputText);
  const dataUrl = `data:text/plain;charset=utf-8,${encodedOutput}`;
  return dataUrl;
}
