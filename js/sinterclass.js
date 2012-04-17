/*jslint devel: true, browser: true */
var SinterClass = (function () {
    "use strict";

    var ctx = (document.getElementById('card')).getContext('2d'),
        flake = document.getElementById('flake'),
        geschenkeMan = document.getElementById('santa'),
        skyline = document.getElementById('skyline'),
        street1 = document.getElementById('street1'),
        street2 = document.getElementById('street2'),
        MAX_LINES = 99,
        zMap = [],
        playerLine = 8,
        texOffset = 100,
        resX = ctx.canvas.width,
        resY = ctx.canvas.height,
        x = resX / 2,
        widthStep = 1,
        texType = 'street1',
        PARTICLE_COUNT = 300,
        PARTICLE_ARRAY = [],
        sky = ctx.createLinearGradient(resX / 2, 0, resX / 2, resY);

    function init() {

        sky.addColorStop(0, '#486f74');
        sky.addColorStop(1, '#829ab2');

        var b, i;

        for (i = 0; i < MAX_LINES; i += 1) {
            zMap.push(-1 / (i - (200 / 1.8)));
        }

        b = 1 / zMap[playerLine] * 100;
        
        for (i = 0; i < MAX_LINES; i += 1) {
            zMap[i] = zMap[i] * b;
        }
    }

    function moveParticle() {

        var MAX_PARTICLE_SIZE = 16,
            MAX_Z = resX - resY,
            halfResX = resX / 2,
            halfResY = resY / 2,
            i,
            vpY = (resY / 2) + Math.sin((new Date()).getTime() / 100) * 15,
            particle;

        for (i = 0; i < PARTICLE_COUNT; i += 1) {

            if (PARTICLE_ARRAY[i] === undefined) {
                PARTICLE_ARRAY[i] = {};
                PARTICLE_ARRAY[i].z = -1;
            }

            particle = PARTICLE_ARRAY[i];

            particle.z -= 1;

            if ((particle.z <= 0)) {

                particle.x = ((Math.random() * halfResX - 1) + 1) * ((Math.random() * 99) > 50 ? -1 : 1);
                particle.y = ((Math.random() * halfResY - 1) + 1) * ((Math.random() * 99) > 50 ? -1 : 1);
                particle.z = Math.random() * MAX_Z;

            } else {

                var newX = (resX / 2) + (particle.x / particle.z) * 50,
                    newY = vpY + (particle.y / particle.z) * 50,
                    diameter;

                if (((newX > 0) && (newX < resX)) && (newY > 0) && (newY < resY)) {

                    diameter = ((MAX_Z - particle.z) / MAX_Z * MAX_PARTICLE_SIZE + 1);

                    ctx.globalAlpha = (MAX_Z - particle.z) / MAX_Z;
                    ctx.drawImage(flake, newX, newY, diameter, diameter);
                    ctx.globalAlpha = 1;

                } else {

                    particle.z = -1;
                }
            }
        }
    }

    function animate() {

        var halfWidth = resX / 2,
            streetWidth,
            streetPosition,
            i,
            texType;

        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, resX, resY);

        texOffset += 10;

        for (i = 0; i < MAX_LINES; i += 1) {

            if (((zMap[i] + texOffset) % 100) > 50) {
                texType = street1;
                ctx.fillStyle = '#89c8d9';

            } else {
                texType = street2;
                ctx.fillStyle = '#ffffff';
            }

            ctx.fillRect(0, resY - i, resX, 1);

            streetWidth =  (2 * halfWidth);

            streetPosition =  (x - halfWidth);

            ctx.drawImage(texType, streetPosition, resY - i, streetWidth, 1);

            halfWidth -= widthStep;
        }

        ctx.drawImage(skyline, 0, 110);
        ctx.drawImage(geschenkeMan, 162, 205 + Math.sin((new Date()).getTime() / 100) * 2, 76, 86);

        if (texOffset >= 100) {
            texOffset = 0;
        }

        //-- loop unrolling, pushing moveParticle() in here

        var MAX_PARTICLE_SIZE = 16,
            MAX_Z = resX - resY,
            halfResX = resX / 2,
            halfResY = resY / 2,
            i,
            vpY = (resY / 2) + Math.sin((new Date()).getTime() / 100) * 15,
            particle;

        for (i = 0; i < PARTICLE_COUNT; i += 1) {

            if (PARTICLE_ARRAY[i] === undefined) {
                PARTICLE_ARRAY[i] = {};
                PARTICLE_ARRAY[i].z = -1;
            }

            particle = PARTICLE_ARRAY[i];

            particle.z -= 1;

            if ((particle.z <= 0)) {

                particle.x = ((Math.random() * halfResX - 1) + 1) * ((Math.random() * 99) > 50 ? -1 : 1);
                particle.y = ((Math.random() * halfResY - 1) + 1) * ((Math.random() * 99) > 50 ? -1 : 1);
                particle.z = Math.random() * MAX_Z;

            } else {

                var newX = (resX / 2) + (particle.x / particle.z) * 50,
                    newY = vpY + (particle.y / particle.z) * 50,
                    diameter;

                if (((newX > 0) && (newX < resX)) && (newY > 0) && (newY < resY)) {

                    diameter = ((MAX_Z - particle.z) / MAX_Z * MAX_PARTICLE_SIZE + 1);

                    ctx.globalAlpha = (MAX_Z - particle.z) / MAX_Z;
                    ctx.drawImage(flake, newX, newY, diameter, diameter);
                    ctx.globalAlpha = 1;

                } else {

                    particle.z = -1;
                }
            }
        }
    }
    
    init();

    return {render: animate};
}());