//html canvas where the game is
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const speed = 5;

let parsedCollisions = ""
let collisionBlocks = ""
let background = ""
let doors
let level = 1
let lastLevel = 3;

const overlay = {
    opacity: 0
}


const player = new Player({
    //collisionBlocks,
    imageSrc: "./img/king/idle.png",
    framerate: 11,
    animations: {
        idleRight: {
            framerate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idle.png",
        },
        idleLeft: {
            framerate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idleLeft.png",
        },
        runRight: {
            framerate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runRight.png",
        },
        runLeft: {
            framerate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runLeft.png",
        },
        enterDoor: {
            framerate: 8,
            frameBuffer: 2,
            loop: false,
            isActive: true,
            imageSrc: "./img/king/enterDoor.png",
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    oncComplete: () => {
                        if(level < lastLevel) level++;
                        else {
                            level = 1;
                        }
                        levels[level].init();
                        player.switchSprite('idleLeft')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})




//initialize each level with a background, collison blocks, a door, and resets the player's positiona
let levels = {
    1: {
        init: () => {
            if (player.currentAnimation) player.currentAnimation.isActive = false
            parsedCollisions = collisionsLevel1.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks;
            /// 
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./img/backgroundLevel1.png"
            })
            doors = [
                new Sprite({
                    position: {
                        x: 770,
                        y: 268,
                    },
                    imageSrc: './img/doorOpen.png',
                    framerate: 5,
                    frameBuffer: 4,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },

    2: {
        init: () => {

            if (player.currentAnimation) player.currentAnimation.isActive = false
            console.log("Level 2 Reached")
            parsedCollisions = collisionsLevel2.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96
            player.position.y = 140
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./img/backgroundLevel2.png"
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    framerate: 5,
                    frameBuffer: 4,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {

            if (player.currentAnimation) player.currentAnimation.isActive = false
            console.log("Level 3 Reached")
            parsedCollisions = collisionsLevel3.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks;
            player.position.x = 750
            player.position.y = 150
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./img/backgroundLevel3.png"
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335,
                    },
                    imageSrc: './img/doorOpen.png',
                    framerate: 5,
                    frameBuffer: 4,
                    loop: false,
                    autoplay: false
                })
            ]

        }
        
    }

}












//animates frames for game runner
function animate() {
    requestAnimationFrame(animate)
    //animation below
    //background

    background.draw()

    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    doors.forEach(door => {
        door.draw()
    })


    player.handleInput(keys)
    player.draw();
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()


}

levels[level].init()
animate()


