<template>
    <b-button v-on:click="cancel">취소</b-button>
</template>


<script>
    export default {
        methods :{
            cancel: function() {
                this.$emit('cancel');
            }
        }
    }
</script>

