<template>
    <div
        ref="robotBody"
        class="robot">
        <svg
            v-if="isPlaced"
            xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
    </div>
</template>

<script>
import {TweenMax} from 'gsap'
import {
    getLeftDirectionName,
    getRightDirectionName,
    getAngleByDirectionName,
    getMovePosition,
} from "../assets/js/utils/robotUtils";

export default {
    name: "robot",
    data() {
        return {
            isPlaced: false,
            currentX: null,
            currentY: null,
            currentDirection: null,
            isMoving: false,
        }
    },
    methods: {
        place(x, y, direction) {
            if (x >= 0 && x < 5 && y >= 0 && y < 5) {
                this.isPlaced = true;
                this.currentX = x;
                this.currentY = y;
                this.currentDirection = direction;
                TweenMax.to(this.$refs.robotBody, 0, {
                    top: 50 * (4 - this.currentY),
                    left: 50 * this.currentX,
                    rotation: getAngleByDirectionName(this.currentDirection)
                });
                this.talk(`You have placed me at ${this.currentX},${this.currentY} facing ${this.currentDirection}.`);
            } else {
                this.talk('If you place me there I will fall off the table.');
            }
        },
        move() {
            // Ensure Is placed to perform action
            if (this.isPlaced && !this.isMoving) {
                const movePosition = getMovePosition(this.currentX, this.currentY, this.currentDirection);
                if (movePosition) {
                    this.isMoving = true;
                    this.currentX = movePosition.x;
                    this.currentY = movePosition.y;
                    this.talk(`I am moving ${this.currentDirection.toLowerCase()}`);
                    TweenMax.to(this.$refs.robotBody, 0.5, {top: 50 * (4 - this.currentY), left: 50 * this.currentX, onComplete: this.onMovingEnded});
                } else {
                    this.talk(`It appears that move would lead to my demise.`);
                }
            } else if(!this.isPlaced) {
                this.talk(`I can't move till you have placed me.`);
            }
        },
        left() {
            // Ensure Is placed to perform action
            if (this.isPlaced && !this.isMoving) {
                this.isMoving = true;
                this.currentDirection = getLeftDirectionName(this.currentDirection);
                TweenMax.to(this.$refs.robotBody, 0.5, {rotation: "-=90", onComplete: this.onMovingEnded})
                this.talk('Beep Boop Turning Left.');
            } else if(!this.isPlaced) {
                this.talk(`I can't turn left since you haven't placed me.`);
            }
        },
        right() {
            // Ensure Is placed to perform action
            if (this.isPlaced && !this.isMoving) {
                this.isMoving = true;
                this.currentDirection = getRightDirectionName(this.currentDirection);
                TweenMax.to(this.$refs.robotBody, 0.5, {rotation: "+=90", onComplete: this.onMovingEnded});
                this.talk('Beep Boop Turning Right.');
            } else if(!this.isPlaced) {
                this.talk(`I can't turn right since you haven't placed me.`);
            }
        },
        onMovingEnded () {
            this.isMoving = false;
        },
        talk (message) {
            this.$emit('botTalked', message)
        },
        report() {
            if (this.isPlaced && !this.isMoving) {
                this.talk(`${this.currentX},${this.currentY},${this.currentDirection}`);
            } else if(!this.isPlaced) {
                this.talk('I am not currently placed.');
            }
        },
    }
}
</script>

<style lang="scss" scoped>

.robot {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 100px;
    left:100px;

}
</style>
