<template>
    <div class="table-top">
        <div
            v-for="i in gridSize"
            :key="'row-'+i"
            class="table-top__row">
            <div
                v-for="j in gridSize"
                :key="'tile-'+i+'-'+j"
                class="table-top__tile">

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "table-top",
        data() {
            return {
                gridSize: 5
            };
        },
    }
</script>

<style lang="scss" scoped>

.table-top {

    position: absolute;
    top: 0;
    left: 0;
    &__row {
        height: 50px;
    }
    &__tile {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid #000000;
        box-sizing: border-box;
    }
}
</style>
