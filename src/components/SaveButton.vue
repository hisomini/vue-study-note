<template>
    <b-button class="btn-common" v-on:click="save">저장</b-button>
</template>

<script>
    export default {
        methods :{
            save: function() {
                this.$emit('save');
            }
        }
    }
</script>