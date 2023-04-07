<template>
    <v-alert dismissible :value="alert" type="error" @input="closeAlert">{{ alertContent }}</v-alert>
</template>

<script>
export default {
    props: ['alertDetail'],
    data: function() {
        return {
            alert: false,
            alertContent: this.alertDetail
        }
    },
    methods: {
        showAlert: function() {
            this.alert = true;
        },
        closeAlert: function() {
            this.alert = false;
        }
    }
}
</script>

<style>

</style>