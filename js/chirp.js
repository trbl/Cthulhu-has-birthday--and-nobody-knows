/*jslint devel: true, browser: true */
var Chirp = (function () {
    "use strict";

    var particle = [],
        MAX_PARTICLE_COUNT = 5,
        MAX_LIFE = 50,
        ctx = (document.getElementById('chirpNotes')).getContext('2d'),
        texNote = document.getElementById('note'),
        birdHead = document.getElementById('birdHead'),
        birdSilent = document.getElementById('birdSilent'),
        birdChirp = document.getElementById('birdChirp'),
        birdBody = document.getElementById('birdBody'),
        startX = ctx.canvas.height / 2 - 10,
        startY = ctx.canvas.height - 41,
        NOTE_GRID = {"0": {"width": 25, "x": 0},
                     "1": {"width": 44, "x": 25},
                     "2": {"width": 26, "x": 69}};

    function init() {

        for (var i = 0; i < MAX_PARTICLE_COUNT; i++) {

            particle.push({
                "life": Math.random() * MAX_LIFE,
                "x":startX + Math.random() * 10,
                "y":startY,
                "tex":Math.round(Math.random() * 2)
            });
        }

        birdHead.style.top = 0;
        birdSilent.style.top = 0;
    }

    function animate() {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (var i = 0; i < particle.length; i++) {

            var p = particle[i];

            p.life -= .5;

            if (p.life > 0) {

                var newX = p.x + (Math.sin(p.life) / p.life * 10),
                    newY = p.y -= 2,
                    newWidth = ((MAX_LIFE - p.life) / MAX_LIFE * NOTE_GRID[p.tex].width + 1),
                    newHeight = ((MAX_LIFE - p.life) / MAX_LIFE * 41 + 1);

                ctx.globalAlpha = p.life / MAX_LIFE;

                ctx.drawImage(texNote, NOTE_GRID[p.tex].x, 0, NOTE_GRID[p.tex].width, 41, newX, newY, newWidth, newHeight);
                ctx.globalAlpha = 1;

            } else {

                particle[i] = {"life": Math.random() * MAX_LIFE,
                    "x":startX,
                    "y":startY,
                    "tex":Math.round(Math.random() * 2)};
            }
        }
    }

    function bounceHead() {

        if(birdChirp.style.display === 'none') {
            birdChirp.style.display = 'block';
            birdSilent.style.display = 'none';
        }

        var newRotation = (Math.sin((new Date()).getTime() / 150) * 18);

        var cssString = '-webkit-transform: rotate('+ newRotation +'deg);';
            cssString += '-o-transform: rotate('+ newRotation +'deg);';
            cssString += '-moz-transform: rotate('+ newRotation +'deg);';
            cssString += 'transform: rotate('+ newRotation +'deg);';

        birdHead.style.cssText = cssString;
        birdChirp.style.cssText = cssString;
    }

    function bangHead() {

        var newXHead = Math.sin((new Date()).getTime() / 100) * 6;
        var newXBody = Math.sin((new Date()).getTime() / 100 - 1000) * 4;

        birdHead.style.top = newXHead +'px';
        birdSilent.style.top = newXHead +'px';
        birdBody.style.top = newXBody +'px';
    }

    function clearCanvas() {

        var cssString = '-webkit-transform: rotate(0deg);';
            cssString += '-o-transform: rotate(0deg);';
            cssString += '-moz-transform: rotate(0deg);';
            cssString += 'transform: rotate(0deg);';
        
        birdChirp.style.cssText = cssString + 'display:none;';
        birdHead.style.cssText = cssString;

        birdSilent.style.cssText = 'display:block';

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    init();
    
    return {render:animate,
            renderChirp:bounceHead,
            renderHeadBang:bangHead,
            clear:clearCanvas};
}());