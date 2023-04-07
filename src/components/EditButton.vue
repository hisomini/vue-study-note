<template>
    <b-button class="btn-common" v-on:click="edit">수정</b-button>
</template>

<script>
export default {
        methods :{
            edit: function() {
                this.$emit('edit');
            }
        }
    }
</script>
