/*jslint devel: true, browser: true */
(function () {
    "use strict";

    //http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    soundManager.url = 'music/swf/';
    soundManager.flashVersion = 9;

    var introTune,
        mainTune,
        currentLightGlowId = 1,
        light1 = document.getElementById('lightGlow1'),
        light2 = document.getElementById('lightGlow2'),
        light3 = document.getElementById('lightGlow3'),
        bumpyRide = false;
      
    //this stopps the audio from looping nicely :\  
	//soundManager.useHTML5Audio = true;
	//soundManager.preferFlash = false;
	soundManager.noSWFCache = true;
	
    soundManager.onready(function() {
        
        introTune = soundManager.createSound({
            id: 'introTune',
            url: 'music/t-zero_-_3LN_intro.mp3',
            autoLoad: true,
            autoPlay: true,
            onfinish:function() {
                bumpyRide = true;
                //the more complicated, the better it sounds, and fixes the nasty transition too
                soundManager.pause('mainTune');
                mainTune.setVolume(80);
                soundManager.setPosition('mainTune', 0);
                soundManager.play('mainTune');
            },
            onload: function() {
                animate();
            },
            volume: 80
        });

        mainTune = soundManager.createSound({
            id: 'mainTune',
            url: 'music/t-zero_-_3LN_main.mp3',
            autoLoad: true,
            autoPlay: true,
            volume: 0,
            loops:1000
        });

        mainTune.onposition(0, function() {

            if(bumpyRide) {

                loopStart();
                setInterval(loopStart, mainTune.duration);
            }
        });
    });

    var loopChirpStart,
        loopChirpEnd,
        loopInitDeepBeat,
        loopDeepBeat;

    function loopStart() {
        clearInterval(loopDeepBeat);
        loopInitDeepBeat = setInterval(initDeepBeat, 58);
        
        loopChirpStart = setInterval(startChirp, 44500);
        loopChirpEnd = setInterval(endChirp,   85000);
    }

    function initDeepBeat() {
        clearInterval(loopInitDeepBeat);

        loopDeepBeat = setInterval(deepBeat, 466);
    }

    function deepBeat() {

        light1.style.display = 'none';
        light2.style.display = 'none';
        light3.style.display = 'none';

        switch(currentLightGlowId) {

            case 1:
                light1.style.display = 'block';
                currentLightGlowId = 2;
                break;

            case 2:
                light2.style.display = 'block';
                currentLightGlowId = 3;
                break;

            case 3:
                light3.style.display = 'block';
                currentLightGlowId = 1;
                break;
        }
    }

    function startChirp() {
        clearInterval(loopChirpStart);

        animateBird = true;
    }

    function endChirp() {
        clearInterval(loopChirpEnd);

        animateBird = false;
        Chirp.clear();
    }

    var animateBird = false;
    function animate() {
        requestAnimFrame( animate );

        if(animateBird === true) {
            Chirp.renderChirp();
            Chirp.render();
        }

        Scroller.render();
        Chirp.renderHeadBang();
        SinterClass.render();

    }
}());