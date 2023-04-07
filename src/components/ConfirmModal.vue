<template>
    <v-dialog v-model="confirmModal" persistent max-width="280">
        <v-card>
            <v-card-title>
                <v-icon color="orange">info</v-icon>
                <span class="card-text">로그아웃하시겠습니까?</span>
            </v-card-title>
            <v-btn color="green darken-1" text @click="hideAlert">취소</v-btn>
            <v-btn color="green darken-1" text @click="ok">확인</v-btn>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: function () {
        return {
            confirmModal: false
        }
    },
    methods: {
        showAlert: function() {
            this.confirmModal = true;
        },
        hideAlert: function() {
            this.confirmModal = false;
        },
        ok: function() {
            this.$emit('logout');
        }
    }

}
</script>

<style>
.card-text {
    margin-left: 8px;
}
</style>