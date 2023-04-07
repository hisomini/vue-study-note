<template>
    <v-btn v-on:click="logout">로그아웃</v-btn>
</template>

<script>
export default {
    methods: {
        logout: function() {
            this.$emit('logout');
        }
    }
}
</script>

<style>

</style>