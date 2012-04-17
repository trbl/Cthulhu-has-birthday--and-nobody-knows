/**
 * User: mog
 * Date: 09.12.11
 * Time: 04:49
 * To change this template use File | Settings | File Templates.
 */
/*jslint devel: true, browser: true */
var Scroller = (function () {
    "use strict";

    var text = document.getElementById('scrollerText').innerHTML,
        font = document.getElementById('texFont'),
        ctx = (document.getElementById('scroller')).getContext('2d'),
        FONT_HEIGHT = 75,
        FONT_WIDTH = 74,
        SCROLL_SPEED = 8,
        aLetter = [],
        startAtLetter = 0,
        scrollX = 1;

    function init() {

        text = (text.toUpperCase()).split('');

        for (var i = 0; i < text.length; i++) {

            var texX = 0;

            var charcode = (text[i].charCodeAt(0));

            if (charcode > 64 && charcode < 91) {
                // letter
                texX = (charcode - 65) * FONT_WIDTH;

            } else if (charcode > 47 && charcode < 58) {
                // number
                texX = 1924 + ((charcode - 48) * FONT_WIDTH);

            } else {

                switch (charcode) {

                    case 34: //"
                        texX = 2738;
                        break;
                    case 39: //'
                        texX = 2664;
                        break;
                    case 33: //!
                        texX = 2811;
                        break;
                    case 45: //?
                        texX = 2885;
                        break;
                    case 44: //,
                        texX = 2959;
                        break;
                    case 46: //.
                        texX = 3033;
                        break;
                    case 58:
                        texX = 3107;
                        break;
                    default:
                    case 32: //space, space - i'm in space
                        texX = 3181;
                        break;
                }
            }

            aLetter.push(texX);
        }
    }

    function animate() {

        var carretX = 0,
            endAtLetter;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        if (Math.floor(scrollX / FONT_WIDTH) >= 1) {
            startAtLetter += 1;
            scrollX = 1;
        }

        endAtLetter = startAtLetter + 8;

        if (endAtLetter > text.length) {
            startAtLetter = 0;
            endAtLetter = 8;//text.length;

        }

        for (var i = startAtLetter; i < endAtLetter; i++) {

            var letterX = 0;

            if (aLetter[i] != 2765) {//ignore space

                /*
                var offset = 0;

                ctx.drawImage(font, aLetter[i], 0, FONT_WIDTH, FONT_HEIGHT, (carretX - scrollX) + letterX, 20 +
                        offset, FONT_WIDTH, FONT_HEIGHT);
                */
                for (var c = aLetter[i]; c < (aLetter[i] + FONT_WIDTH); c++) {

                    var offset = Math.sin((new Date()).getTime() / 1000 + (c / 20)) * Math.sin((new Date()).getTime() / 100) * 4;

                    ctx.drawImage(font, c, 0, 1, FONT_HEIGHT, (carretX - scrollX) + letterX, 20 +
                        offset, 1, FONT_HEIGHT);

                    letterX++;
                }
            }

            carretX += FONT_WIDTH;
        }

        scrollX += SCROLL_SPEED;
    }

    init();

    return {render: animate};
    
}());