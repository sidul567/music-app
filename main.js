//Define variable
let audio,playbtn,title,poster,artist,mutebtn,seekslider,volumeslider,seeking=false,seekTo,curTimeText,durTimeText,playlistStatus,dir,playlist,ext,agent,playlistArtist,repeat,randomSong,prevbtn,nextbtn,playImage,image,bgImage,muteImage,loopImage

dir = 'music/'

playlist = ["AlanWalker Faded NCS-38","Broken Angel-42","Cartoon-On-_-On","Elektronomia","Fearless","Johnning","let_me_love_you-32","tujhe_kitna_chahne-153","Popsicle","senorita-142","tu hi toh jannat-417","tum_hi_aana_neha_k-159"]
title = ["AlanWalker Faded NCS-38","Broken Angel-42","Cartoon - On & On","Elektronomia","Lost-sky Fearless","Janji-Heroes Tonight","let_me_love_you-32","tujhe_kitna_chahne-153","Popsicle","senorita-142","tu hi toh jannat-417","tum_hi_aana_neha_k-159"]

artist = ["(feat. Daniel Levi) [NCS Release]","NO NAME","Elektronomia-Sky High [NCS Release]","(feat. Dan Levi) [NCS Release]","LFZ - [NCS Release]","(feat. Johnning) [NCS Release]","NO NAME","kabir Singh | guitar instrumental","(feat. Chris Linton) [NCS Release]","NO NAME","NO NAME","Neha Kakkar"]

poster = ["Images/ncs7.jpg","Images/ncs8.jpg","Images/ncs9.jpg","Images/ncs10.jpg","Images/ncs11.jpg","Images/ncs1.jpeg","Images/ncs2.jpg","Images/ncs3.jpg","Images/ncs4.jpg","Images/ncs5.jpg","Images/ncs6.jpg","Images/ncs12.jpg"]

ext = ".mp3"

playlist_index = 0;

playbtn = document.getElementById('playpausebtn')
playImage = document.getElementById('playImage')
image = document.getElementById('image')
bgImage = document.getElementById('bgImage')
loopImage = document.getElementById('loopImage')
muteImage = document.getElementById('muteImage')
prevbtn = document.getElementById('prebtn')
nextbtn = document.getElementById('nextbtn')
mutebtn = document.getElementById('mutebtn')
seekslider = document.getElementById('seekslider')
volumeslider = document.getElementById('volumeSilder')
curTimeText = document.getElementById('curTimeText')
durTimeText = document.getElementById('durTimeText')
playlistStatus = document.getElementById('playlist-status')
playlistArtist = document.getElementById('playlist-artist')
repeat = document.getElementById('repeat')
randomSong = document.getElementById('random')

audio = new Audio();
audio.src = dir+playlist[0]+ext;
audio.loop = false;

playlistStatus.innerHTML = title[playlist_index];
playlistArtist.innerHTML = artist[playlist_index];

playbtn.addEventListener('click',playPause)
prevbtn.addEventListener('click',prevSong)
nextbtn.addEventListener('click',nextSong)
mutebtn.addEventListener('click',mute)
seekslider.addEventListener('mousedown',(e)=>{
    seeking = true;
    seek(e)
})
seekslider.addEventListener('mousemove',(e)=>{
    seek(e)
})
seekslider.addEventListener('touchmove',(e)=>{
    peek(e)
})
seekslider.addEventListener('touchstart',(e)=>{
    peek(e)
})
seekslider.addEventListener('mouseup',()=>{
    seeking = false;
})
volumeslider.addEventListener('mousemove',volume)
volumeslider.addEventListener('touchmove',volume)
volumeslider.addEventListener('mousedown',volume)
audio.addEventListener('timeupdate',()=>{seekTimeUpdate()})
audio.addEventListener('ended',()=>{switchTrack()})
repeat.addEventListener('click',loop)
randomSong.addEventListener('click',random)

function fetchMusicDetails(){
    playImage.setAttribute("src","Images/pause-red.png")
    image.setAttribute("src",`${poster[playlist_index]}`)
    bgImage.setAttribute("src",`${poster[playlist_index]}`)

    playlistStatus.innerHTML = title[playlist_index];
    playlistArtist.innerHTML = artist[playlist_index];

    audio.src = dir+playlist[playlist_index]+ext;
    audio.play()
}

function playPause(){
    if(audio.paused){
        audio.play();
        image.style.animationPlayState = "running"
        playImage.setAttribute("src","Images/pause-red.png")
    }else{
        audio.pause();
        image.style.animationPlayState = "paused"
        playImage.setAttribute("src","Images/play-red.png")
    }
}

function prevSong(){
    playlist_index--;
    if(playlist_index<0){
        playlist_index = playlist.length-1;
    }
    fetchMusicDetails()
}

function nextSong(){
    playlist_index++;
    if(playlist_index>=playlist.length){
        playlist_index = 0;
    }
    fetchMusicDetails();
}

function mute(){
    if(audio.muted){
        audio.muted = false;
        muteImage.setAttribute("src","Images/speaker.png")
    }else{
        audio.muted = true;
        muteImage.setAttribute("src","Images/mute.png")
    }
}

function seek(e){
    if(audio.duration==0){
        null
    }else{
        if(seeking){
           seekslider.value = e.clientX - seekslider.offsetLeft
           seekTo = audio.duration * (seekslider.value/100)
           audio.currentTime = seekTo
        }
    }
}

function peek(e){
    if(audio.duration==0){
        null
    }else{
        // if(seeking){
           seekslider.value = e.touches[0].clientX - seekslider.offsetLeft
           seekTo = audio.duration * (seekslider.value/100)
           audio.currentTime = seekTo
        // }
    }
}

function volume(){
    audio.volume = volumeslider.value/100;
}

function seekTimeUpdate(){
    if(audio.duration){
        seekslider.value = audio.currentTime/audio.duration*100;
        let curMin = Math.floor(audio.currentTime/60);
        let curSec = Math.floor(audio.currentTime-curMin*60);
        let durMin = Math.floor(audio.duration/60);
        let durSec = Math.floor(audio.duration - durMin*60);
        curMin<10?curMin="0"+curMin:curMin;
        curSec<10?curSec="0"+curSec:curSec;
        durMin<10?durMin="0"+durMin:durMin;
        durSec<10?durSec="0"+durSec:durSec;
        curTimeText.innerHTML = curMin+":"+curSec;
        durTimeText.innerHTML = durMin+":"+durSec;
    }else{
        curTimeText.innerHTML = "00:00";
        durTimeText.innerHTML = "00:00"
    }
}

function switchTrack(){
    if(playlist_index==playlist.length-1){
        playlist_index = 0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}

function loop(){
    if(audio.loop){
        audio.loop = false;
        loopImage.setAttribute("src","Images/rep.png");
    }else{
        audio.loop = true;
        loopImage.setAttribute("src","Images/rep1.png")
    }
}

function random(){
    let r = Math.floor(Math.random()*(playlist.length))
    playlist_index = r;
    fetchMusicDetails()
}