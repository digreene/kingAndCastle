const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

addEventListener("keydown", (event) => {
    if (player.preventInput) return
    switch (event.key) {
        //up
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height) {
                    player.velocity.y = 0
                    player.velocity.x = 0
                    player.switchSprite('enterDoor')
                    player.preventInput = true
                    door.play()
                    return
                }
            }
            if (player.velocity.y == 0 & !player.preventInput) player.velocity.y -= 15
            break;
        //left  
        case 'a':
            keys.a.pressed = true
            break;
        //right
        case 'd':
            keys.d.pressed = true
            break;
        //down
        case 's':
            if (player.velocity.y == 0)
                player.velocity.y += 15

    }
})

addEventListener("keyup", (event) => {
    //console.log(event)
    switch (event.key) {
        //up
        case 'w':
            if (player.velocity.y == 0) player.velocity.y += 15
            break;
        //left  
        case 'a':
            keys.a.pressed = false
            break;
        //right
        case 'd':
            keys.d.pressed = false
            break;
        //down
        case 's':
            if (player.velocity.y == 0) player.velocity.y
            player.velocity.y -=15

    }
})