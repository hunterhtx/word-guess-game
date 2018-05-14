// make a database for words
// make the computer pick a word from the wordbank
var guess
var waitingToStart
var guessesRemaining
var lettersRemaining
var word
var solution
var wins
var lettersGuessed
var lettersGuessedCounter

var wordbank = [
    "bomb",
    "deku",
    "din",
    "fairy",
    "flute",
    "ganondorf",
    "goron",
    "hyrule",
    "link",
    "zelda",
    "kokiri",
    "navi"
];




function resetGame(){
    waitingToStart = true
    
    document.getElementById("worddisplay").innerHTML = 'Press any key to begin!';
     word = wordbank[Math.floor(Math.random() * wordbank.length)];
     solution = [];
    for (var i = 0; i < word.length; i++) {
        solution[i] = "_";
    }

     guessesRemaining = 12;
     lettersRemaining = word.length;
     lettersGuessed = [];
     lettersGuessedCounter = 0;
     document.getElementById("lettersGuessedDisplay").innerHTML = ''

}

function displayGuessedletters()

{document.getElementById("lettersGuessedDisplay").innerHTML = 'Your letters guessed ' + lettersGuessed.toString().replace(/,/g, ' ');};


function init(){

    wins = 0; 
    resetGame();
    document.getElementById("winsCount").innerHTML = 'Your Wins are ' + wins;
    console.log (lettersGuessed);
}

window.onload = init();
// this function shows the array solution in html 
function displaysolution()
{document.getElementById("worddisplay").innerHTML = solution.toString().replace(/,/g, ' ');};



/*
 define a while loop that will terminate when lettersremaining are 0 or when guessesremanining are 0
{
    store users keypress into a var named guess
     define a loop that will loop through every letter in the word that was randomly chosen
    {
    check if guess is the current letter being checked by charat g
    replace solution array vaule g with guess letter 
    }
    
   call setup method to update display with correct user guess }


 
*/

     document.onkeydown = function(evt) {
    
        
    if (waitingToStart == true)
    //this block will execute when game is waiting to start, so this block starts the game
    {waitingToStart = false
    displaysolution();
    drawHearts()
    displayGuessedletters()}
    // this block will execute when game has started and waiting to start is false
    else{
        if(window.event) { // IE                    
            guess = String.fromCharCode(evt.keyCode);
          } else if(evt.which){ // Netscape/Firefox/Opera                   
            guess = String.fromCharCode(evt.which);
          }
          
    guess = guess.toLowerCase();
          // if we already guessed the letter show the user an alert and then exit function doing nothing
          if(lettersGuessed.includes(guess)){
              alert('OOPS! You already guessed that letter! Dont worry, you didnt lose a life!')
              return
          }

    if(!lettersGuessed.includes(guess)){

    lettersGuessed[lettersGuessedCounter++] = guess // our guess is being added to the lettersguessed array at position of the letters guessed counter
    
       }displayGuessedletters();
       anotherguess();};}
       


  function anotherguess(){
  
   if (lettersRemaining > 0 && guessesRemaining > 0){
    var gotamatch = false 
    
    
 for (var g = 0; g < word.length; g++) {
    
    console.log(word.charAt(g) + ";;" + guess) //delete this line and then see the problem, why does console logging fix the issue??
     
    if (word.charAt(g) === guess){
        solution[g] = guess
        //this if statement will only run if we didnt already guess the letter
       lettersRemaining--
        gotamatch = true

        
    }
     
    

 }


 if (!gotamatch){

    guessesRemaining--
    drawHearts()
}


displaysolution()

if (lettersRemaining == 0 || guessesRemaining == 0)
ending();
}
  }




function ending(){
        displaysolution()
if (lettersRemaining > 0 && guessesRemaining == 0) {
    alert('You Lose, Your word was ' + word );
}
else if (guessesRemaining > 0 && lettersRemaining == 0) {  
    alert('You Win, You guessed the word ' + word + " correctly!");
    wins++
    document.getElementById("winsCount").innerHTML =  'Your Wins are ' + wins;
    
}

 resetGame()
;};


// this func draws a single heart
function drawHeart(h){
    var context = document.getElementById('canvas1').getContext("2d");
    // call a constructor to create a new image object
 var img = new Image();
 img.onload = function ()
  {
     context.drawImage(img, (h-1)*50, 2, 50, 50);
     
 }
 img.src = "assets/images/heart.png";
}
// this function will draw multiple hearts, depeneding on the va guessesRemanining
function drawHearts(){
    var context = document.getElementById('canvas1').getContext("2d");
    context.clearRect(0, 0, 600, 60);
for (var h = 1; h <= guessesRemaining; h++){
    drawHeart(h)
   
}
}

