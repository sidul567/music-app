//Define variable

window.addEventListener('load',()=>{

    

let ad,playbtn,title,poster,artist,mutebtn,seekslider,volumeslider,seeking=false,seekTo,curTimeText,durTimeText,playlistStatus,dir,playlist,ext,agent,playlistArtist,repeat,randomSong,prevbtn,nextbtn,playImage,image,bgImage,muteImage,loopImage

dir = 'Music/'

playlist = ["AlanWalker Faded NCS-38","Broken Angel-42","Cartoon-On-_-On","Elektronomia","Fearless","Johnning","let_me_love_you-32","tujhe_kitna_chahne-153","Popsicle","senorita-142","tu hi toh jannat-417","tum_hi_aana_neha_k-159"]
title = ["AlanWalker Faded NCS-38","Broken Angel-42","Cartoon - On & On","Elektronomia","Lost-sky Fearless","Janji-Heroes Tonight","let_me_love_you-32","tujhe_kitna_chahne-153","Popsicle","senorita-142","tu hi toh jannat-417","tum_hi_aana_neha_k-159"]

artist = ["(feat. Daniel Levi) [NCS Release]","NO NAME","Elektronomia-Sky High [NCS Release]","(feat. Dan Levi) [NCS Release]","LFZ - [NCS Release]","(feat. Johnning) [NCS Release]","NO NAME","kabir Singh | guitar instrumental","(feat. Chris Linton) [NCS Release]","NO NAME","NO NAME","Neha Kakkar"]

poster = ["Images/ncs7.jpg","Images/ncs8.jpg","Images/ncs9.jpg","Images/ncs10.jpg","Images/ncs11.jpg","Images/ncs1.jpeg","Images/ncs2.jpg","Images/ncs3.jpg","Images/ncs4.jpg","Images/ncs5.jpg","Images/ncs6.jpg","Images/ncs12.jpg"]

ext = ".mp3"
agent = navigator.userAgent.toLowerCase()
if(agent.indexOf('firefox')!=-1 || agent.indexOf('opera')!=-1){
    ext = ".ogg"
}


audio = document.getElementById('audio')
audio.innerHTML = `<audio src="${dir+playlist[0]+ext}" preload="auto" crossOrigin="anonymous" id="adio"></audio>`
let adb = document.getElementById('adio');

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
let music_playlist = document.getElementById('music_playlist')
let musicList = document.getElementById('musicList')
let volume_up = document.getElementById('volume-up')
let volume_down = document.getElementById('volume-down')


for(let i=0;i<playlist.length;i++){
    musicList.innerHTML += `<div class="p_song" name="pSong" data-title="${i}">
    <p id="p_title" data-title="${i}">${playlist[i]}</p>
    <p id="p_artist" data-title="${i}">${artist[i]}</p>
    <button data-title="${i}"><i data-title="${i}" class="far fa-play-circle"></i></button>
</div>`
}

let pSong = document.getElementsByName('pSong')

adb.loop = false;

playlistStatus.innerHTML = title[playlist_index];
playlistArtist.innerHTML = artist[playlist_index];

playbtn.addEventListener('click',(e)=>{
    if(adb.paused){
        adb.play();
        image.style.animationPlayState = "running"
        playImage.setAttribute("src","Images/pause-red.png")
    }else{
        adb.pause();
        image.style.animationPlayState = "paused"
        playImage.setAttribute("src","Images/play-red.png")
    }
})
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
adb.addEventListener('timeupdate',()=>{seekTimeUpdate()})
adb.addEventListener('ended',()=>{switchTrack()})
repeat.addEventListener('click',loop)
randomSong.addEventListener('click',random)

function fetchMusicDetails(){
    playImage.setAttribute("src","Images/pause-red.png")
    image.setAttribute("src",`${poster[playlist_index]}`)
    bgImage.setAttribute("src",`${poster[playlist_index]}`)

    playlistStatus.innerHTML = title[playlist_index];
    playlistArtist.innerHTML = artist[playlist_index];

    adb.src = dir+playlist[playlist_index]+ext;
    adb.play()
}
let isClose = true;
music_playlist.addEventListener('click',()=>{

    if(isClose){
        musicList.style.height = '90%'
        isClose = false;
    }else{
        musicList.style.height = '0'
        isClose = true;
    }  
})

//music list create

document.getElementById('body').addEventListener('keydown',e=>{
    if(e.which==32){
        if(adb.paused){
            adb.play();
            image.style.animationPlayState = "running"
            playImage.setAttribute("src","Images/pause-red.png")
        }else{
            adb.pause();
            image.style.animationPlayState = "paused"
            playImage.setAttribute("src","Images/play-red.png")
        }
    }
    if(e.which==39){
        nextSong()
        image.style.animationPlayState = "running"
    }
    if(e.which==37){
        prevSong()
        image.style.animationPlayState = "running"
    }
})

let temp = 0;
for(let i=0;i<playlist.length;i++){
    pSong[i].addEventListener('click',(e)=>{
        pSong[temp].classList.remove('active_song')
        playlist_index = e.target.dataset.title
        fetchMusicDetails()
        musicList.style.height = '0'
        isClose = true
        pSong[i].classList.add('active_song')
        temp = i;
        image.style.animationPlayState = "running"
    })
}

volume_up.addEventListener('click',()=>{
    if(adb.volume+0.05<=1){
        adb.volume += 0.05;
    }else{
        adb.volume =1;
    }
    volumeslider.value = Math.floor(adb.volume*100)
})

volume_down.addEventListener('click',()=>{
    if(adb.volume-0.05<0){
        adb.volume = 0;
    }else{
        adb.volume -=0.05;
    }
    volumeslider.value = Math.floor(adb.volume*100)
})

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
    if(adb.muted){
        adb.muted = false;
        muteImage.setAttribute("src","Images/speaker.png")
    }else{
        adb.muted = true;
        muteImage.setAttribute("src","Images/mute.png")
    }
}

function seek(e){
    if(adb.duration==0){
        null
    }else{
        if(seeking){
           seekslider.value = (e.clientX - seekslider.offsetLeft)
           seekTo = adb.duration * (seekslider.value/100)
           adb.currentTime = seekTo
        }
    }
}
function peek(e){
    if(adb.duration==0){
        null
    }else{
        seekslider.value = e.touches[0].clientX - seekslider.offsetLeft
        seekTo = adb.duration * (seekslider.value/100)
        adb.currentTime = seekTo
    }
}
adb.volume = volumeslider.value/100;

function volume(){
    adb.volume = volumeslider.value/100;
}



function seekTimeUpdate(){
    if(adb.duration){
        seekslider.value = adb.currentTime/adb.duration*100;
        let curMin = Math.floor(adb.currentTime/60);
        let curSec = Math.floor(adb.currentTime-curMin*60);
        let durMin = Math.floor(adb.duration/60);
        let durSec = Math.floor(adb.duration - durMin*60);
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
    if(adb.loop){
        adb.loop = false;
        loopImage.setAttribute("src","Images/rep.png");
    }else{
        adb.loop = true;
        loopImage.setAttribute("src","Images/rep1.png")
    }
}

function random(){
    let r = Math.floor(Math.random()*(playlist.length))
    while(playlist_index===r){
        r = Math.floor(Math.random()*(playlist.length))
    }
    playlist_index = r;
    fetchMusicDetails()
}

})