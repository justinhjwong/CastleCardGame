/* This project is licenced under the MIT License

Copyright (c) 2019 justinhjwong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var difficulty = 1
function shuffle(array) { //shuffle algorithm
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* Setup variables. The higharchy array measures the rank of the cards. lowestvalidcard is set to null, because the middle card is not set yet. middlecards is the cards in the center. deck is the draw deck. castle variables are for your castle. mycards and opponent cards are the cards in your or your opponent's hands. */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
var higharchy = [0,11,12,1,2,3,4,5,6,7,13,8,9,10] //Determines value of cards.
var lowestvalidcard = null
var middlecards = []
var deck = ["c01","c02","c03","c04","c05","c06","c07","c08","c09","c10","c11","c12","c13","h01","h02","h03","h04","h05","h06","h07","h08","h09","h10","h11","h12","h13","s01","s02","s03","s04","s05","s06","s07","s08","s09","s10","s11","s12","s13","d01","d02","d03","d04","d05","d06","d07","d08","d09","d10","d11","d12","d13"];
deck = shuffle(deck);
deck = shuffle(deck);
var middlecard = null;
var ocastle1 = deck[0]; //Set castle
deck.shift(); //Remove from deck
var ocastle2 = deck[0];
deck.shift();
var ocastle3 = deck[0];
deck.shift();
var pcastle1 = deck[0];
deck.shift();
var pcastle2 = deck[0];
deck.shift();
var pcastle3 = deck[0];
deck.shift();
var opponentcards = deck.slice(0,7);
deck.splice(0,7);
var mycards = deck.slice(0,7);
deck.splice(0,7);
var i;
for (i = 0; i < mycards.length; i++) { 

var card = document.createElement("img"); //Loading cards in your hand
card.src = "carddeck/" + mycards[i] +".png";
card.setAttribute("id",mycards[i]);
card.setAttribute("width",138);
card.setAttribute("height",188);
card.setAttribute("onclick","playCard(this.id)");
card.setAttribute("onmouseover", "javascript: width = 165; height = 226;" );
card.setAttribute("onmouseleave", "javascript: width = 138; height = 188");
document.getElementById("playercards").appendChild(card);
}
function drawcard(){ //Drawing cards into your deck.
  var card = document.createElement("img");
  card.src = "carddeck/" + deck[0] +".png";
  card.setAttribute("id",deck[0]);
  card.setAttribute("width",138);
  card.setAttribute("height",188);
  card.setAttribute("onclick","playCard(this.id)");
  document.getElementById("playercards").appendChild(card);
  mycards.push(deck[0]);
  deck.shift();

}
function castle1(){ //When player plays Castle 1. Look below for refrence code.
  if (mycards.length < 1){
if (middlecard == null){
   var mid = document.createElement("img");
    mid.src = "carddeck/" +pcastle1+".png";
    mid.setAttribute("value",pcastle1);
    mid.setAttribute("id","mid");
    mid.setAttribute("width",138);
    mid.setAttribute("height",188);
    document.getElementById("playdeck").appendChild(mid);
    document.getElementById(pcastle1).remove();
    middlecard = pcastle1;
    var playedcard = mycards.indexOf(pcastle1);
    pcastle1 = null;
    document.getElementById("pcastle1").remove();
    }
    else {
      if (higharchy[Number(pcastle1.slice(1,3))] >= higharchy[Number(middlecard.slice(1,3))]){
        document.getElementById("mid").src = "carddeck/"+pcastle1+".png";
        middlecard = pcastle1;
        middlecards.push(pcastle1);
        var playedcard = mycards.indexOf(pcastle1);
        mycards.splice(playedcard,1);
        document.getElementById(cardval).remove();
        if (Number(middlecard.slice(1,3)) == 10){
            middlecard = null;
            deck = deck.concat(middlecards);
            deck = shuffle(deck);
            middlecards = [];
            document.getElementById('mid').remove();
            return

          }

      }
     
        mycards = mycards.concat(middlecards);
        middlecard = null;
        middlecards = [];
        document.getElementById('mid').remove();
      }
    }}
    lowestvalidcard = null;
    if (difficulty > 2){
alert("The ai is not programmed yet for this mode.")
    }
    else {
      if (opponentcards.length != 0){
      var e;
      var opponentmove;
      if (middlecard == null){
        middlecard == opponentcards[0];
        opponentcards.shift();
      }
      else{
      
      for (o=0; o < opponentcards.length;o++){
        if (lowestvalidcard == null){
          if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))]){
          lowestvalidcard = opponentcards[o];
        }}
        else{
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))] && higharchy[Number(opponentcards[0].slice(1,3))] < higharchy[Number(lowestvalidcard.slice(1,3))]){
        lowestvalidcard = opponentcards[o];}}}
      if (lowestvalidcard == null){
        while (lowestvalidcard == null){
        var cardselected = deck[0];
        opponentcards.push(deck[0]);
        deck.shift();
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(cardselected.slice(1,3))]){
          lowestvalidcard = cardselected;
        }
        }
        }
        else{
        for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] >= higharchy[Number(middlecard.slice(1,3))]){
          lowestvalidcard = opponentcards[e];
          }
        }}
         document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);

          document.getElementById("aihand").innerHTML = opponentcards.length;
         
          if (Number(middlecard.slice(1,3)) == 10){
            deck = deck.concat(middlecards);
            deck = shuffle(deck);
            middlecards = [];
            lowestvalidcard = opponentcards[0];
           sleep(1000);
            for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] ){
          lowestvalidcard = opponentcards[e];
          }
        }
        
        document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);
          }
      }
          

    
    }
 
    }
 

   var e;
      var opponentmove;
      if (middlecard == null){
          if (ocastle1 != null && ocastle1 != undefined ){
            
          }
          else if (ocastle2 != null && ocastle2 != undefined){

          }
          else if (ocastle3 != null && ocastle3 != undefined){
            
          }
          else{}
        opponentcards.shift();
      }
      else{
      
      for (o=0; o < opponentcards.length;o++){
        if (lowestvalidcard == null){
          if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))]){
          lowestvalidcard = opponentcards[o];
        }}
        else{
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))] && higharchy[Number(opponentcards[0].slice(1,3))] < higharchy[Number(lowestvalidcard.slice(1,3))]){
        lowestvalidcard = opponentcards[o]}}}
      if (lowestvalidcard == null){
        while (lowestvalidcard == null){
        var cardselected = deck[0];
        opponentcards.push(deck[0]);
        deck.shift();
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(cardselected.slice(1,3))]){
          lowestvalidcard = cardselected;
        }
        }
        }
        else{
        for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] >= higharchy[Number(middlecard.slice(1,3))]){
          lowestvalidcard = opponentcards[e];
          }
        }}
         document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);

          document.getElementById("aihand").innerHTML = opponentcards.length;
        
          if (Number(middlecard.slice(1,3)) == 10){
            deck = deck.concat(middlecards);
            deck = shuffle(deck);
            middlecards = [];
            lowestvalidcard = opponentcards[0];
           sleep(1000);
            for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] ){
          lowestvalidcard = opponentcards[e];
          }
        }
        
        document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);
          }
      
          

    
    
 


}
function playCard(cardval){
 if (middlecard == null){
   var mid = document.createElement("img");
    mid.src = "carddeck/" +cardval+".png";
    mid.setAttribute("value",cardval);
    mid.setAttribute("id","mid");
    mid.setAttribute("width",138);
    mid.setAttribute("height",188); //Create middle card if no middle card is present
    document.getElementById("playdeck").appendChild(mid);
    document.getElementById(cardval).remove();
    middlecard = cardval;
    var playedcard = mycards.indexOf(cardval)
    mycards.splice(playedcard,1);} //Remove played card
    else {
      if (higharchy[Number(cardval.slice(1,3))] >= higharchy[Number(middlecard.slice(1,3))]){
        document.getElementById("mid").src = "carddeck/"+cardval+".png"; //Replace middle card as needed.
        middlecard = cardval;
        middlecards.push(cardval);
        var playedcard = mycards.indexOf(cardval);
        mycards.splice(playedcard,1); //Remove played card
        document.getElementById(cardval).remove();
        if (Number(middlecard.slice(1,3)) == 10){ //If played card is a 10.
            middlecard = null;
            deck = deck.concat(middlecards); //Cards in the middle get put back in deck.
            deck = shuffle(deck); //Deck gets shuffled
            middlecards = []; //Middlecards is reset.
            document.getElementById('mid').remove();
            return; //Wait for user input

          }

      }
      else{
        return; //Invalid play
      }
    }
    lowestvalidcard = null
    if (difficulty > 2){
alert("The ai is not programmed yet for this mode.") //Later feature
    }
    else {
      var e;
      var opponentmove;
      if (middlecard == null){
        middlecard == opponentcards[0];//Set middlecard to the first card of the AI if no card is present. 
        opponentcards.shift();
      }
      else{
        
      for (o=0; o < opponentcards.length;o++){ //Repeat for every card
        if (lowestvalidcard == null){ //Checks if lowestvalidcard is already set. If set, then the script moves on.
          if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))]){ // If card is a valid play.
          lowestvalidcard = opponentcards[o];
        }}
        else{
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(opponentcards[o].slice(1,3))] && higharchy[Number(opponentcards[0].slice(1,3))] < higharchy[Number(lowestvalidcard.slice(1,3))]){
        lowestvalidcard = opponentcards[o];}}} //Checks for better play
      if (lowestvalidcard == null){
        while (lowestvalidcard == null){ //Draws cards until valid play is found
        var cardselected = deck[0];
        opponentcards.push(deck[0]);
        deck.shift();
        if (higharchy[Number(middlecard.slice(1,3))]<= 
        higharchy[Number(cardselected.slice(1,3))]){
          lowestvalidcard = cardselected;
        }
        }
        }
        else{
        for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] >= higharchy[Number(middlecard.slice(1,3))]){
          lowestvalidcard = opponentcards[e];
          }
        }}
         document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);

          document.getElementById("aihand").innerHTML = opponentcards.length;

          if (Number(middlecard.slice(1,3)) == 10){
            deck = deck.concat(middlecards);
            deck = shuffle(deck);
            middlecards = [];
            lowestvalidcard = opponentcards[0];
           sleep(1000);
            for (e = 0; e < opponentcards.length; e++){
          if (higharchy[Number(lowestvalidcard.slice(1,3))] > higharchy[Number(opponentcards[e].slice(1,3))] ){
          lowestvalidcard = opponentcards[e];
          }
        }
        
        document.getElementById("mid").src = "carddeck/"+lowestvalidcard+".png";
          middlecard= lowestvalidcard;
          middlecards.push(lowestvalidcard);
          opponentcards.splice(Number(opponentcards.indexOf(lowestvalidcard)),1);
          }
      }
          

    
    }
 
}
   