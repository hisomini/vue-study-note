<template>
    <v-btn color="primary" elevation="3" v-on:click="moveAddPage">{{ name }}</v-btn>
</template>

<script>
export default {
    props: ['btnName'],
    data: function() {
        return {
            name: this.btnName
        }
    },
    methods: {
        moveAddPage: function() {
            this.$emit('moveAddPage');
        }
    }
}
</script>

<style>

</style>