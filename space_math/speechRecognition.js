//General structure and implementation from https://gouravkajal.medium.com/convert-speech-voice-to-text-using-web-speech-api-in-javascript-ece9804d8deb

numbersToWords = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8':'eight',
    '9': 'nine'

}
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();

    // String for the Final Transcript
    let final_transcript = "";

    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'English';

    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
        // Show the Status Element
        document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () => {
        // Hide the Status Element
        document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
        // Hide the Status Element
        document.querySelector("#status").style.display = "none";
    };

    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";

        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
                console.log(final_transcript)
            } else {
                interim_transcript += event.results[i][0].transcript;
                answer = document.querySelector("#answer").innerHTML
                if(interim_transcript.includes(answer)
                    || interim_transcript.includes(numbersToWords[answer])){
                    console.log('CORRECT')
                    createNextQuestion()
                }
                console.log(interim_transcript.includes("two"))
                console.log(interim_transcript)
            }
        }

        // Set the Final transcript and Interim transcript.
     
    };
    window.addEventListener("load", () => {
        console.log("page is fully loaded");
        speechRecognition.start()
      });
    function createNextQuestion(){
        speechSynthesis.cancel();

        firstNum = Math.floor(Math.random() * 5);
        secondNum = Math.floor(Math.random() * 5) +5;
        nextQuestion = `Captain! We currently have ${firstNum} cannons. We need
        ${secondNum} cannons to defeat the aliens. How many more 
        cannons do we need?`
        answer = secondNum-firstNum
        document.querySelector("#question").innerHTML = nextQuestion
        document.querySelector("#answer").innerHTML = '' + answer
        speak()

    }
    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
        // Start the Speech Recognition
        speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
        // Stop the Speech Recognition
        speechRecognition.stop();
    };
    document.querySelector("#next").onclick = () => {
       
        // Stop the Speech Recognition
        createNextQuestion()
        console.log(document.querySelector("#answer").innerHTML)

    };
    async function speak(){
        speechSynthesis.speak(new SpeechSynthesisUtterance(document.querySelector("#question").innerHTML))

    }
} else {
    console.log("Speech Recognition Not Available");
}