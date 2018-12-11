<template>
    <div class="app">
        <HeaderSection />
        <Commentary
            :message="robotMessage"
        />

        <div class="app__arena">
            <TableTop

            />
            <Robot
                ref="robot"
                v-on:botTalked="onBotTalk"
            />
        </div>

        <div class="app__controller">
            <h2 class="app__heading">
                Button inputs
            </h2>
            <p class="app__paragraph">Here you can adjust the inputs and press the buttons to control the robot.</p>
            <div class="app__controls-row">
                <label
                    class="app__label"
                    for="place-x-position">X</label>
                <input
                    v-model="currentPlaceX"
                    v-on:change="onXInputChanged"
                    id="place-x-position"
                    class="app__input"
                    type="number"
                    min="0"
                    max="4">
                <label
                    class="app__label"
                    for="place-y-position">Y</label>
                <input
                    v-model="currentPlaceY"
                    v-on:change="onYInputChanged"
                    id="place-y-position"
                    class="app__input"
                    type="number"
                    min="0"
                    max="4">
                <label
                    class="app__label"
                    for="place-direction">Direction</label>
                <select
                    v-model="currentPlaceDirection"
                    id="place-direction"
                    class="app__select"
                >
                    <option value="NORTH">NORTH</option>
                    <option value="EAST">EAST</option>
                    <option value="SOUTH">SOUTH</option>
                    <option value="WEST">WEST</option>
                </select>

                <button
                    v-on:click="onPlaceClicked"
                    v-bind:disabled="!allowInteraction"
                    class="app__button"
                >
                    Place
                </button>
            </div>
            <div class="app__controls-row">
                <button
                    v-on:click="onLeftClicked"
                    v-bind:disabled="!allowInteraction"
                    class="app__button"

                >
                    Left
                </button>
                <button
                    v-on:click="onRightClicked"
                    v-bind:disabled="!allowInteraction"
                    class="app__button"
                >
                    Right
                </button>
                <button
                    v-on:click="onMoveClicked"
                    v-bind:disabled="!allowInteraction"
                    class="app__button"
                >
                    Move
                </button>
                <button
                    v-on:click="onReportClicked"
                    v-bind:disabled="!allowInteraction"
                    class="app__button"
                >
                    Report
                </button>
            </div>
            <div class="app__manual">
                <h2
                    class="app__heading"
                    for="manual-input">
                    Text input
                </h2>
                <p class="app__paragraph">Here you can write a list of commands and press play to watch them be executed in order. Please separate with a line between commands.</p>
                <textarea
                    v-model="manualInput"
                    id="manual-input"
                    class="app__text-area"
                >
                    PLACE 2,3,EAST
                    MOVE
                    MOVE
                    MOVE
                    LEFT
                    MOVE
                    REPORT
                </textarea>
                <button
                    v-on:click="onPlayClicked"
                    class="app__button"
                >
                    Play
                </button>
                <h3>Commands</h3>
                <ul>
                    <li>PLACE X,Y,F (X = 0-4, Y = 0-4, F = NORTH, SOUTH, EAST, WEST)</li>
                    <li>MOVE</li>
                    <li>LEFT</li>
                    <li>RIGHT</li>
                    <li>REPORT</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue';
import Commentary from './components/Commentary.vue';
import TableTop from './components/TableTop.vue';
import Robot from './components/Robot.vue';
import { isValidDirection } from './assets/js/utils/robotUtils';
export default {
    name: 'app',
    components: {
        HeaderSection,
        Commentary,
        TableTop,
        Robot,
    },
    data() {
        return {
            robotMessage: 'Awaiting orders',
            robot: null,
            currentPlaceX: 0,
            currentPlaceY: 0,
            currentPlaceDirection: "NORTH",
            manualInput: `PLACE 2,3,EAST\nMOVE\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT`,
            allowInteraction: true,
            commandList: [],
        };
    },
    mounted() {
        this.robot = this.$refs.robot
    },
    methods: {
        onLeftClicked () {
            if(this.allowInteraction) this.robot.left();
        },
        onRightClicked () {
            if(this.allowInteraction) this.robot.right();
        },
        onMoveClicked () {
            if(this.allowInteraction) this.robot.move();
        },
        onPlaceClicked () {
            if(this.allowInteraction) this.robot.place(parseInt(this.currentPlaceX), parseInt(this.currentPlaceY), this.currentPlaceDirection);
        },
        onReportClicked () {
            if(this.allowInteraction) this.robot.report();
        },
        onPlayClicked () {
            if (this.manualInput !== '') {
                this.allowInteraction = false;
                this.commandList = this.manualInput.split('\n')
                this.processManualQueue();
            }
        },
        onXInputChanged () {
            if (!this.currentPlaceX) this.currentPlaceX = 0;
        },
        onYInputChanged () {
            if (!this.currentPlaceY) this.currentPlaceY = 0;
        },
        onBotTalk (message) {
            this.robotMessage = message;
        },
        processManualQueue() {
            if (this.commandList.length > 0) {
                const command = this.commandList[0].toUpperCase();
                if (command.trim() === 'MOVE') {
                    this.robot.move();
                } else if (command.trim() === 'LEFT') {
                    this.robot.left();
                } else if (command.trim() === 'RIGHT') {
                    this.robot.right();
                } else if (command.trim() === 'REPORT') {
                    this.robot.report();
                } else if (command.substring(0, 5) === 'PLACE') {
                    const commandParts = command.split(' ');
                    const inputs = commandParts[1].split(',');
                    if (inputs.length === 3) {
                        const x = parseInt(inputs[0]);
                        const y = parseInt(inputs[1]);
                        const direction = inputs[2].toUpperCase();
                        if (isValidDirection(direction)) {
                            this.robot.place(x, y, direction)
                        } else {
                            this.onBotTalk('One of the placement inputs is invalid.');
                        }
                    } else {
                        this.onBotTalk('That appears to be an invalid placement command.');
                    }
                } else {
                    this.onBotTalk('That order does not compute.');
                }

                this.commandList.shift();
                setTimeout(() => {
                    this.processManualQueue();
                }, 1000);
            } else {
                this.allowInteraction = true;
                this.onBotTalk('Tasks are complete.');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./assets/scss/_variables.scss";
.app {
    background: #ffffff;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.5rem;
    font-family: $primary-font;

    &__arena {
        position: absolute;
        top: 160px;
        left: 50%;
        transform: translateX(-50%);
        width: 250px;
    }

    &__controller {
        position: absolute;
        top: 460px;
        left: 50%;
        transform: translateX(-50%);
    }

    &__text-area {
        width: 100%;
        height: 230px;
        font-family: $primary-font;
        font-size: 1.5rem;
    }

    &__label {
        font-family: $primary-font;
        font-size: 1.5rem;
        margin: 10px;
    }

    &__button, &__input, &__select {
        font-family: $primary-font;
        width: 100px;
        height: 40px;
        margin: 10px;
        border-radius: 10px;
        font-size: 1.5rem;
    }
    &__select {
        width: 120px;
    }

    &__heading {
        font-family: $primary-font;
        text-align: center;
        font-size: 2rem;
    }

    &__paragraph {
        text-align: center;
    }

    &__controls-row {
        text-align: center;
    }


}
</style>
