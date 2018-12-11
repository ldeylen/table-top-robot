<template>
    <div class="app">
        <Header />
        <Commentary
            :message="robotMessage"
        />
        <TableTop

        />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Commentary from './components/Commentary.vue'
import TableTop from './components/TableTop.vue'
export default {
    name: 'app',
    components: {
        Header,
        Commentary,
        TableTop,
    },
    data() {
        return {
            robotMessage: '',
        };
    },
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
}
</style>
