/*jslint devel: true, browser: true */
(function () {
    "use strict";

    function resizeCard() {

        var cardCSS = "";

        var card = document.getElementById('card');

        cardCSS += 'top:' + (window.innerWidth / 1920 * 390 - 80) + 'px;';

        cardCSS += 'height:' + (300 / 400 * parseInt(card.offsetWidth)) + 'px;';

        var shadowCSS = '0 0 ' + (window.innerWidth / 1920 * 7) + 'px ' + (window.innerWidth / 1920 * 10) + 'px #c5a187;';
        cardCSS += 'box-shadow: '+ shadowCSS;
        cardCSS += '-moz-box-shadow: '+ shadowCSS;

        card.style.cssText = cardCSS;
    }

    function resizeScroller() {

        var scrollerCSS = "";

        var scroller = document.getElementById('scroller');

        var scrollerCSS = 'height:' + (257 / 412 * parseInt(scroller.offsetWidth)) + 'px;';
            scrollerCSS += 'top:' + (window.innerWidth / 1920 * 735 - 80) + 'px;';
        scroller.style.cssText = scrollerCSS;
    }

    function positionBird() {

        document.getElementById('bird').style.top = (window.innerWidth / 1920 * 190 - 80) + 'px';
        document.getElementById('chirpNotes').style.top = (window.innerWidth / 1920 * 80 - 80) + 'px';
    }

    function positionLights() {

        document.getElementById('lightGlow1').style.top = (window.innerWidth / 1920 * 110 - 80) + 'px';
        document.getElementById('lightGlow2').style.top = (window.innerWidth / 1920 * 90 - 80) + 'px';
        document.getElementById('lightGlow3').style.top = (window.innerWidth / 1920 * 157 - 80) + 'px';
    }

    function positionGreet() {
        
        document.getElementById('greet').style.top = (window.innerWidth / 1920 * 378 - 80) + 'px';
    }

    function resize() {

        resizeCard();

        resizeScroller();
        
        positionBird();

        positionLights();

        positionGreet();
    }

    window.onresize = resize;

    resize();
}());