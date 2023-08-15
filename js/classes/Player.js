class Player extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        framerate,
        animations,
        loop
    }) {
        super({ imageSrc, framerate, animations,loop })
        this.position = {
            x: 200,
            y: 200,
        }
        this.gravity = .5
        this.velocity = {
            x: 0,
            y: 0
        }
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.collisionBlocks = collisionBlocks
        this.xOffset = 58;
        this.yOffset = 38
        this.lastDirection = 'right'
        this.preventInput = false
    }

    handleInput(keys) {
        if (this.preventInput) return
        this.velocity.x = 0
        if (keys.d.pressed) {
            this.velocity.x = speed;
            this.switchSprite('runRight')
            this.lastDirection = 'right'
        }
        else if (keys.a.pressed) {
            this.velocity.x = -speed;
            this.switchSprite('runLeft')
            this.lastDirection = 'left'
        } else {
            if (this.lastDirection === 'right') {
                this.switchSprite('idleRight')
            }
            if (this.lastDirection === 'left') {
                this.switchSprite('idleLeft')
            }
        }
    }

    //moves the player
    update() {


        this.position.x += this.velocity.x
        this.updatehitBox()
        this.checkHorizCollisions()
        this.applyGravity();
        this.updatehitBox()
        this.checkVertCollisions()
    }

    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0;
        this.image = this.animations[name].image
        this.framerate = this.animations[name].framerate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    updatehitBox() {
        this.hitbox = {
            position: {
                x: this.position.x + this.xOffset,
                y: this.position.y + this.yOffset
            },
            width: 50,
            height: 50
        }
    }


    checkHorizCollisions() {
        //check for horizontal collisons
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.width + collisionBlock.position.x + - offset + .01
                    break;
                }
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - .01
                    break;
                }
            }

        }
    }

    checkVertCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.height + collisionBlock.position.y - offset + .01
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - .01
                    break;
                }
            }

        }
    }

    applyGravity() {
        ///apply gravity
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }


}