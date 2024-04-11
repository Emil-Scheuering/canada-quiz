if(window.location.hash == ""){
    window.location.hash = "#home";
}
else if(window.location.hash == "#home"){
    window.location.hash = "";
    window.location.reload();
}else{
    window.location.hash = "";
    window.location.reload();
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("time-left");

let currentTask = 0;
let maxTasks = 4;

let timeLeft = 0;

setInterval(()=>{
    if(timeLeft > 0){
        timeLeft--;
        progressBar.classList.remove("hidden");
        timeDisplay.classList.remove("hidden");
    }else{
        if(!progressBar.classList.contains("hidden")){
            progressBar.classList.add("hidden");
        }
        if(!timeDisplay.classList.contains("hidden")){
            timeDisplay.classList.add("hidden");

            if(window.location.hash == "#question-1" ||
                window.location.hash == "#question-2" ||
                window.location.hash == "#question-3" ||
                window.location.hash == "#question-4")
            {
                window.location.hash = "#failed";
            }
        }
    }

    var date = new Date(0);
    date.setSeconds(timeLeft);

    var minutes = date.getMinutes();
    if(minutes == 0){
        minutes = "00";
    }

    timeDisplay.innerHTML = minutes+":"+zeroPad(date.getSeconds(), 2);
    progressBar.style.right = (window.innerWidth-200)-timeLeft*25+"px";
}, 1000);

let correctCounter = 0;

const buttons = document.querySelectorAll(".page .row button");
buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        button.disabled = true;

        if(button.classList.contains("answer-correct")){
            button.classList.add("correct");
            correctCounter++;
        }else if(button.classList.contains("answer-incorrect")){
            button.classList.add("incorrect");
        }

        setTimeout(()=>{
            button.disabled = false;
            button.classList.remove("incorrect");
            button.classList.remove("correct");
            NextTask();
        }, 5000);
        timeLeft = 5;
    });
});

function setHash(targetHash) { window.location.hash = targetHash; };

function NextTask(){
    var currentHash = window.location.hash;
    if(currentHash == "#home"){
        setHash("#tutorial");
        correctCounter--;
    }
    else if(currentHash == "#tutorial"){
        setHash("#question-1");
        correctCounter--;
    }
    else if(currentHash == "#question-1"){
        setHash("#question-2");
    }
    else if(currentHash == "#question-2"){
        setHash("#question-3");
    }
    else if(currentHash == "#question-3"){
        setHash("#question-4");
    }
    else if(currentHash == "#question-4"){
        setHash("#question-5");
    }
    else if(currentHash == "#question-5"){
        setHash("#finished");
        document.getElementById("correct-count").innerText = correctCounter;
    }
}

window.onhashchange = ()=>{
    var hash = window.location.hash;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("failed").classList.add("hidden");
    document.getElementById("finished").classList.add("hidden");
    document.getElementById("tutorial").classList.add("hidden");
    document.getElementById("question-1").classList.add("hidden");
    document.getElementById("question-2").classList.add("hidden");
    document.getElementById("question-3").classList.add("hidden");
    document.getElementById("question-4").classList.add("hidden");
    document.getElementById("question-5").classList.add("hidden");

    if(hash == "#home"){
        timeLeft = 0;
        document.getElementById("home").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Let's start";
    }
    if(hash == "#tutorial"){
        timeLeft = 0;
        document.getElementById("tutorial").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Let's start";
    }
    if(hash == "#question-1"){
        timeLeft = 21;
        document.getElementById("question-1").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 1";
    }
    if(hash == "#question-2"){
        timeLeft = 21;
        document.getElementById("question-2").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 2";
    }
    if(hash == "#question-3"){
        timeLeft = 21;
        document.getElementById("question-3").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 3";
    }
    if(hash == "#question-4"){
        timeLeft = 21;
        document.getElementById("question-4").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 4";
    }
    if(hash == "#question-5"){
        timeLeft = 21;
        document.getElementById("question-5").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 5";
    }
    if(hash == "#finished"){
        timeLeft = 0;
        document.getElementById("finished").classList.remove("hidden");
        document.getElementById("q-description").innerHTML = "";
    }
    if(hash == "#failed"){
        timeLeft = 0;

        document.getElementById("q-description").innerHTML = "hmm....";
        document.getElementById("failed").classList.remove("hidden");
    }
};