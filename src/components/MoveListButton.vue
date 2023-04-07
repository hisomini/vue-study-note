<template>
    <b-button v-on:click="moveList">목록으로</b-button>
</template>

<script>
export default {
    methods: {
        moveList: function() {
            this.$emit('moveList');
        }
    }
}
</script>

<style>

</style>