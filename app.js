const qwerty=document.querySelector('#qwerty');
const phrase=document.querySelector('#phrase');
const overlay=document.querySelector('#overlay');
const overlayButton=overlay.querySelector("a");
const overlayDiv=overlay.querySelector("div");

let missed=0;
let letterFound;


const startGame=document.querySelector('.btn__reset');
startGame.addEventListener("click",function(){
  //Hide Start Screen overLay
  if(overlayButton.textContent=="Start Game"){
    overlay.style.display="none";
  }else{
    location.reload();
  }
});
let phrases=[
  	'milk',
  	'shopping',
    'words',
    'Team Tree House',
    'Homework'
];

function getRandomPhraseAsArray(arr){
    const randomI=Math.floor(Math.random() * Math.floor(arr.length));
    return arr[randomI].split(''); // return randomCharArray
}

getRandomPhraseAsArray(phrases);


function addPhraseToDisplay(arr){
    let ul=document.querySelector('#phrase ul');
    for (let i=0; i<arr.length;i+=1){
      let li=document.createElement('li');
      li.textContent=arr[i];
      if(arr[i]!=' '){
        li.classList.add("letter");
      }
      ul.appendChild(li);
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


function checkLetter(buttonClicked){
  const listOfLiLetters=document.querySelectorAll('li.letter');
  let matchingLetter=null;
  for (let i=0; i<listOfLiLetters.length;i+=1){
    if(listOfLiLetters[i].textContent.toLowerCase()==buttonClicked.textContent){
      listOfLiLetters[i].classList.add("show");
      matchingLetter=listOfLiLetters[i].textContent.toLowerCase();
    }
  }
  return matchingLetter;
}

qwerty.addEventListener("click",function(e){
    if(e.target.tagName=="BUTTON"){
      e.target.classList.add("chosen");
      e.target.disabled=true;
      letterFound=checkLetter(e.target);
      if( letterFound==null){
        //1) Remove a tries heart
        const ol=document.querySelector('#scoreboard ol');
        const li=ol.lastElementChild;
        ol.removeChild(li);
        //2) Add to Missed
        missed+=1;
      }
      checkWin();
    }
});

function checkWin(){
  let letterLen=document.querySelectorAll(".letter").length;
  let letterCorrectLen=document.querySelectorAll(".show").length;
  console.log(letterLen,letterCorrectLen);
  if(letterLen==letterCorrectLen){
    //1) show overLay screen with win
    console.log(overlay);
    overlay.style.display="flex";
    overlay.className="win";
    overlayButton.textContent="Beginners Luck?";
    overlayDiv.textContent="YOU WON!";
  }else if(missed>=5){
    overlay.style.display="flex";
    overlay.className="lose";
    overlayButton.textContent="Try Again , Loser?";
    overlayDiv.textContent="YOU LOSE!";
  }

}
