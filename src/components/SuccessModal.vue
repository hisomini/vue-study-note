<template>
    <v-dialog v-model="successModal" persistent max-width="280">
        <v-card>
            <v-card-title>
                <v-icon color="orange">info</v-icon>
                <span class="card-text">{{ content }}</span>
            </v-card-title>
            <v-btn color="green darken-1" text @click="ok">확인</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['content'],
    data: function() {
        return {
            successModal : false
        }
    },
    methods: {
        ok: function() {
            this.$emit('ok')
        },
        showModal: function() {
            this.successModal = true
        }
    }
        

}
</script>

<style>

</style>