// Indira Ruslanova
// Animating emotions with voice recognition

var girl = document.getElementById("girl");
var happyArr = ["neutral.png", "happy-1.png", "happy-2.png",
    "happy-3.png", "happy-3.png", "happy-4.png", "happy-5.png",
    "happy-6.png", "happy-7.png", "happy-8.png", "happy-9.png",
    "happy-10.png"];
var sadArr = ["neutral.png", "sad-1.png", "sad-2.png",
    "sad-3.png", "sad-3.png", "sad-4.png", "sad-5.png",
    "sad-6.png", "sad-7.png", "sad-8.png", "sad-9.png",
    "sad-10.png", "sad-11.png", "sad-12.png"];
var scaredArr = ["neutral.png", "scared-1.png", "scared-2.png",
    "scared-3.png", "scared-3.png", "scared-4.png", "scared-5.png",
    "scared-6.png", "scared-7.png", "scared-8.png", "scared-9.png"];
var angryArr = ["neutral.png", "angry-1.png", "angry-2.png",
    "angry-3.png", "angry-3.png", "angry-4.png", "angry-5.png",
    "angry-6.png", "angry-7.png", "angry-8.png"];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const emotions = ["happy", "sad", "scared", "angry", "neutral"];
const grammar = `#JSGF V1.0; grammar emotions; public <emotion> 
= ${emotions.join(  " | ", )};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var output = document.querySelector(".output");
var currInd = 0;
var ready = document.querySelector(".ready");
var reflection = document.querySelector(".reflection");
var stoppedByUser = false;

function startRecognition() {
    recognition.start();
    console.log("Ready to receive a command.");
    ready.textContent = "READY to receive a command.";
}

window.onload = function () {
  startRecognition();
};

function animateEmotions(emotion) {
    ready.textContent = "NOT ready to receive your command yet.";
    if (emotion == "happy") {
            console.log("Starting happy emotion animation");
            let emotionInd = 0;
            let emotionInterval = setInterval(function () {
                if (emotionInd >= happyArr.length) {
                    clearInterval(emotionInterval);//stopping the animation after one go
                } else {
                    girl.src = `emotions/static/${happyArr[emotionInd]}`;
                    console.log("Changing emotion to:", girl.src);emotionInd++;
                }
            }, 50);
    } else if (emotion == "sad"){
            console.log("Starting sad emotion animation");
            let emotionInd = 0;
            let emotionInterval = setInterval(function () {
                if (emotionInd >= sadArr.length) {
                    clearInterval(emotionInterval);//stopping the animation after one go
                } else {
                    girl.src = `emotions/static/${sadArr[emotionInd]}`;
                    console.log("Changing emotion to:", girl.src);emotionInd++;
                }
            }, 70);
    } else if (emotion == "scared"){
        console.log("Starting scared emotion animation");
            let emotionInd = 0;
            let emotionInterval = setInterval(function () {
                if (emotionInd >= scaredArr.length) {
                    clearInterval(emotionInterval);//stopping the animation after one go
                } else {
                    girl.src = `emotions/static/${scaredArr[emotionInd]}`;
                    console.log("Changing emotion to:", girl.src);emotionInd++;
                }
            }, 50);
    } else if (emotion == "angry"){
        console.log("Starting angry emotion animation");
        let emotionInd = 0;
            let emotionInterval = setInterval(function () {
                if (emotionInd >= angryArr.length) {
                    clearInterval(emotionInterval);//stopping the animation after one go
                } else {
                    girl.src = `emotions/static/${angryArr[emotionInd]}`;
                    console.log("Changing emotion to:", girl.src);
                    emotionInd++;
                }
            }, 50); 
    } else if (emotion == "neutral"){
        console.log("Neutral emotion");
        girl.src = 'emotions/static/neutral.png';
        console.log("Changing emotion to:", girl.src);
  }
}

recognition.onresult = (event) => {
  const emotion = event.results[0][0].transcript;
  output.textContent = `Word received: ${emotion}.`;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
    if (emotions.includes(emotion)) {
      document.getElementById("emotionInput").value = emotion;
      reflection.innerHTML = `What does ${emotion}<br>mean to you? Why?`;
      animateEmotions(emotion);
      document.getElementById("responseInput").disabled = false;
      document.getElementById("submitBtn").disabled = false;
  } else if (emotion == "stop"){
      console.log("Stopping voice recognition.");
      stoppedByUser = true;
      setTimeout(() => recognition.stop(), 50);
  } else {
      output.textContent = `I don't recognize ${emotion} / ${emotion} is not animated.`;
      setTimeout(startRecognition, 500); //slight delay before retrying
  }
};

recognition.onspeechend = () => {
  ready.textContent = "NOT ready to receive your command yet.";
  console.log("Speech ended");
  if (!stoppedByUser) {
      setTimeout(startRecognition, 1000); //slight delay before retrying
  }
};

recognition.onnomatch = (event) => {
  output.textContent = "I don't recognize that.";
};

recognition.onerror = (event) => {
  output.textContent = `Error occurred in recognition: ${event.error}.`;
  setTimeout(startRecognition, 500); //slight delay before retrying
};
