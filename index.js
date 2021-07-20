"use strict";

const music = [
    {
        song_name: "Position",
        artist: "Ariana Grande",
        song: "./songs/Ariana Grande - positions.mp3",
        image: "./images/position.jpeg",
    },

    {
        song_name: "Save Your Tears",
        artist: "Ariana & weekend",
        song: "./songs/The Weeknd & Ariana Grande - Save Your Tears (Remix) (Official Video).mp3",
        image: "./images/weeked.jpg",
    },

    {
        song_name: "Play Date",
        artist: "Melanie Martinez",
        song: "./songs/Melanie Martinez - Play Date.mp3",
        image: "./images/playdate.jfif",
    },

    {
        song_name: "Swalla",
        artist: "Jason & Niki",
        song: "./songs/Jason Derulo - Swalla feat. Nicki Minaj & Ty Dolla ign.mp3",
        image: "./images/swalla.jpeg",
    },

    {
        song_name: "She Don't Like The Lights",
        artist: "Justin Bieber",
        song: "./songs/Justin Bieber - She Don t Like The Lights (with).mp3",
        image: "./images/she.jpg",
    },
];

let SongName = document.querySelector(".s_name");
let SongImage = document.querySelector(".s_image");
let SongArtist = document.querySelector(".s_artist");
let myaudio = document.querySelector(".myaudio");
let forward = document.querySelector(".audio_icon3");
let backward = document.querySelector(".audio_icon1");
let playicon = document.querySelector(".audio_icon2");
let cend = document.querySelector(".count_end");
let cstart = document.querySelector(".count_start");
let line = document.querySelector(".inline");
let main_line = document.querySelector(".line");


let count = 0;
let isPlaying = false;

// json calling----------------------------

const play = () => {
    let short = music[count];

    SongName.innerHTML = short.song_name;
    SongArtist.innerHTML = short.artist;
    SongImage.src = short.image;
    myaudio.src = short.song;

};

play();


// play - pause --------------------------------------------------

playicon.addEventListener("click", () => {

    if (isPlaying == false) {
        forplay();
    }
    else {
        forpause();
    }

});

// for play----------------------------

function forplay() {

    isPlaying = true;
    myaudio.play();
    SongImage.classList.add("open");
    playicon.src = "./images/pause-solid.svg";

};

// for pause-------------------------------------------------

function forpause() {

    isPlaying = false;
    myaudio.pause();
    SongImage.classList.remove("open");
    playicon.src = "./images/play-solid.svg";

};

// for forward---------------------------------------

forward.addEventListener("click", () => {

    if (count < music.length - 1) {

        cstart.innerHTML = `0:00`;
        cend.innerHTML = `0:00`;
        line.style.width = `0%`;
        forpause();
        count++;
        play();
    }
    else {

        cstart.innerHTML = `0:00`;
        cend.innerHTML = `0:00`;
        line.style.width = `0%`;
        forpause();
        count = 0;
        play();
    }

});

// for backward----------------------------------------


backward.addEventListener("click", () => {


    if (count > 0) {

        cstart.innerHTML = `0:00`;
        cend.innerHTML = `0:00`;
        line.style.width = `0%`;
        forpause();
        count--;
        play();
    }

    else {

        cstart.innerHTML = `0:00`;
        cend.innerHTML = `0:00`;
        line.style.width = `0%`;
        forpause();
        count = music.length - 1;
        play();
    }

});

// for time duration--------------------------------------------------

myaudio.addEventListener("timeupdate", (event) => {

    //console.log(event);
    const { duration, currentTime } = event.target;

    let progress = (currentTime / duration) * 100;

    line.style.width = `${progress}%`;

    let du_min = Math.floor(duration / 60);
    let du_sec = Math.floor(duration % 60);

    if (duration) {

        if (du_sec < 10) {

            cend.innerHTML = `${du_min}:${du_sec}0`;

        }
        else {

            cend.innerHTML = `${du_min}:${du_sec}`;
        }
    }

    let cr_min = Math.floor(currentTime / 60);
    let cr_sec = Math.floor(currentTime % 60);

    // console.log(cr_sec);


    if (currentTime) {

        if (cr_sec < 10) {

            cstart.innerHTML = `${cr_min}:0${cr_sec}`;

        }
        else {

            cstart.innerHTML = `${cr_min}:${cr_sec}`;

        }
    }

});

// for autonext song-----------------------------------

myaudio.addEventListener("ended", () => {


    if (count < music.length - 1) {

        count++;
        play();
        forplay();
    }
    else {

        count = 0;
        play();
        forplay();
    }

})


// for touch duration------------------------------------------


main_line.addEventListener("click", (event) => {

    const { clientWidth } = event.target;
    const { offsetX } = event;
    const { duration } = myaudio;

    let h = (offsetX / clientWidth) * duration;

    myaudio.currentTime = h;


});