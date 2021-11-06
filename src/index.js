let pigLatin;
//define vowels and identify capital letters in arrays for easy comparison
const vowels = ["a", "e", "i", "o", "u"];
let capitalTracker = [];
//identify display area for translated phrase
const displayArea = document.getElementById("pig-latin");
//function to determine length of consonant prefix if the word starts with a consonant
const findPrefix = (str) => {
  let prefix = [];
  for (let i = 1; i < str.length; i++) {
    if (
      vowels.indexOf(str[i].toLowerCase()) === -1 &&
      str[i].toLowerCase() !== "y"
    ) {
      prefix.push(str[i]);
    } else {
      return prefix.length + 1;
    }
  }
};
// function to remove consonant beginning, move it to the end, and append 'ay';
const handleConsonant = (str, index) => {
  let cutNumber = findPrefix(str);
  if (cutNumber) {
    let suffix = str.slice(0, cutNumber) + "ay";
    let prefix = str.slice(cutNumber);
    pigLatin = prefix + suffix;
  }
  let newStr = pigLatin.toLowerCase();
  //check for capital letters within the string and move them to the front
  if (capitalTracker[index] === true) {
    newStr = pigLatin.slice(1).toLowerCase();
    let cap = pigLatin.slice(0, 1).toUpperCase();
    pigLatin = cap + newStr;
  }
  //if the word has no vowels, just add 'ay' to the end.
  else pigLatin = str + "ay";
};

// function to add 'way' to end of vowel words
const handleVowel = (str, index) => {
  pigLatin = str + "way";
};

// function receives string, determines if it starts with a vowel or consonant, and calls the appropriate function to handle it
const translatePigLatin = (str, index) => {
  if (str.length === 0) {
    return null;
  } else if (vowels.indexOf(str[0].toLowerCase()) !== -1) {
    handleVowel(str, index);
  } else {
    handleConsonant(str, index);
  }
  return pigLatin;
};

//function splits phrase into words
phraseSplitter = (phrase) => {
  let regex = /\W+|\s+/;
  let phraseArray = phrase.split(regex);
  phraseArray.map((item) => {
    if (item[0] !== undefined) {
      if (item[0].toUpperCase() === item[0]) {
        capitalTracker.push(true);
      } else {
        capitalTracker.push(false);
      }
    }
  });
  displayPigLatin(phraseArray);
};

//function displays the new string in the document body
const displayPigLatin = (phrase) => {
  let newPhraseArray = [];

  phrase.map((item, index) => {
    newPhraseArray.push(translatePigLatin(item.trim(), index));
    newPhrase = newPhraseArray.join(" ");
  });
  displayArea.innerHTML = newPhrase;
  capitalTracker = [];
};

const form = document.getElementById("phrase-submit");
const phrase = form.elements["phrase"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (phrase.value.length > 0) {
    phraseSplitter(phrase.value.trim());
  } else {
    displayArea.innerHTML = "Please enter a phrase.";
  }
});
