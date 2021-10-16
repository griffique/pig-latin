let pigLatin;
//define vowels in an array for easy comparison
const vowels = ["a", "e", "i", "o", "u"];
//identify display area for translated phrase
const displayArea = document.getElementById("pig-latin");
//function to determine length of consonant prefix if the word starts with a consonant
const findPrefix = (str) => {
  let prefix = [];
  for (let i = 1; i < str.length; i++) {
    if (vowels.indexOf(str[i]) === -1) {
      prefix.push(str[i]);
    } else {
      return prefix.length + 1;
    }
  }
};
// function to remove consonant beginning, move it to the end, and append 'ay';
const handleConsonant = (str) => {
  let cutNumber = findPrefix(str);
  if (cutNumber) {
    let suffix = str.slice(0, cutNumber) + "ay";
    let prefix = str.slice(cutNumber);
    pigLatin = prefix + suffix;
  }
  //if the word has no vowels, just add 'ay' to the end, as in 'rhythmay'
  else pigLatin = str + "ay";
};

// function to add 'way' to end of vowel words
const handleVowel = (str) => {
  pigLatin = str + "way";
};

// function receives string, determines if it starts with a vowel or consonant, and calls the appropriate function to handle it
const translatePigLatin = (str) => {
  if (str.match(/\W+/)) {
    return str;
  } else if (vowels.indexOf(str[0]) !== -1) {
    handleVowel(str);
  } else {
    handleConsonant(str);
  }
  return pigLatin;
};

//function splits phrase into words
phraseSplitter = (phrase) => {
  let regex = /\W+|\s+/;
  let phraseArray = phrase.split(regex);
  console.log(phraseArray);
  displayPigLatin(phraseArray);
};

//function displays the new string in the document body
const displayPigLatin = (phrase) => {
  let newPhraseArray = [];

  phrase.map((item) => {
    newPhraseArray.push(translatePigLatin(item.trim()));
    newPhrase = newPhraseArray.join(" ");
  });
  displayArea.innerHTML = newPhrase;
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
