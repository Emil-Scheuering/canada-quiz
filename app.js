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

/* Buttons */
document.getElementById("home-teacher").addEventListener("click", ()=>{
    document.getElementById("home-teacher").classList.add("correct");
    setTimeout(()=>{
        window.location.hash = "#tutorial";
        document.getElementById("home-teacher").classList.remove("correct");
    }, 4000);
    timeLeft = 4;
});
document.getElementById("tutorial-next").addEventListener("click", ()=>{
    document.getElementById("tutorial-next").classList.add("correct");
    setTimeout(()=>{
        window.location.hash = "#question-1";
        document.getElementById("tutorial-next").classList.remove("correct");
    }, 4000);
    timeLeft = 4;
});
document.getElementById("home-skip").addEventListener("click", ()=>{
    document.getElementById("home-skip").classList.add("correct");
    setTimeout(()=>{
        window.location.hash = "#question-1";
        document.getElementById("home-skip").classList.remove("correct");
    }, 4000);
    timeLeft = 4;
});
document.getElementById("q1-quebec").addEventListener("click", ()=>{
    document.getElementById("q1-quebec").classList.add("incorrect");
    document.getElementById("q1-ottawa").classList.add("correct");
    setTimeout(()=>{
        window.location.hash = "#question-2";
        document.getElementById("q1-quebec").classList.remove("incorrect");
        document.getElementById("q1-ottawa").classList.remove("correct");
    }, 4000);
    timeLeft = 4;
});
document.getElementById("q1-ottawa").addEventListener("click", ()=>{
    document.getElementById("q1-ottawa").classList.add("correct");
    setTimeout(()=>{
        window.location.hash = "#question-2";
        document.getElementById("q1-ottawa").classList.remove("correct");
    }, 4000);
    timeLeft = 4;
});

window.onhashchange = ()=>{
    var hash = window.location.hash;

    if(hash == "#home"){
        timeLeft = 0;
        document.getElementById("home").classList.remove("hidden");
        document.getElementById("tutorial").classList.add("hidden");

        document.getElementById("q-description").innerHTML = "Let's start";
    }
    if(hash == "#tutorial"){
        timeLeft = 0;
        document.getElementById("home").classList.add("hidden");
        document.getElementById("tutorial").classList.remove("hidden");
        document.getElementById("question-1").classList.add("hidden");

        document.getElementById("q-description").innerHTML = "Let's start";
    }
    if(hash == "#question-1"){
        timeLeft = 21;
        document.getElementById("home").classList.add("hidden");
        document.getElementById("tutorial").classList.add("hidden");
        document.getElementById("question-1").classList.remove("hidden");
        document.getElementById("question-2").classList.add("hidden");

        document.getElementById("q-description").innerHTML = "Question 1";
    }
    if(hash == "#question-2"){
        timeLeft = 21;
        document.getElementById("question-1").classList.add("hidden");
        document.getElementById("question-2").classList.remove("hidden");

        document.getElementById("q-description").innerHTML = "Question 2";
    }
};