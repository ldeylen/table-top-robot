<template>
    <div class="commentary">
        <p class="commentary__message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "commentary",
    props: {
        message: {type: String, default: ''}
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/_variables.scss";
.commentary {
    &__message {
        font-family: $primary-font;
        text-align: center;
    }
}
</style>
