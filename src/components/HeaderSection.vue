<template>
    <div class="header">
        <h1 class="header__title">Table Top Robot</h1>
    </div>

</template>

<script>
export default {
    name: "header-section"
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/_variables.scss";

.header {
    &__title {
        font-family: $primary-font;
        text-align: center;
    }
}

</style>
