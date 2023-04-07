<template>
    <div id="header">
        <div class="header-text">
            <h2><router-link to="/documents" class="main_header">연구노트</router-link></h2>
        </div>
        <confirm-modal ref="alert" v-on:logout="logout"></confirm-modal>
        <div class="header-btn">
            <myinfo-button class="myinfo"></myinfo-button>
            <logout-button v-on:logout="showAlert"></logout-button>
        </div>
    </div>
</template>
<script>
import LogoutButton from '../components/LogoutButton.vue'
import MyinfoButton from '../components/MyinfoButton.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
    components: {
        'logout-button' : LogoutButton,
        'myinfo-button': MyinfoButton,
        'confirm-modal' : ConfirmModal
    }, 
    data: function() {
        return {
            alert: false,
        }
    },
    methods: {
        logout: function() {
            this.$cookie.delete("authorization");
            this.$router.push('/login');
        },
        showAlert: function() {
            this.$refs.alert.showAlert();
        }
    }

}
</script>

<style>
    #header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #E9EFF2;
        width: 100vw;
        height: 10vh;
    }
    .header-text {
        width: 87vw;
        display: flex;
        justify-content: center;

    }
    .header-btn {
        width: 13vw;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
    }

    a:link { 
        text-decoration: none;
        color: #fff;
    }

    a:visited { 
        text-decoration: none;
        color: #fff;
    }
    .main_header {
        color: black !important;
        font-style: italic;
    }
    
    th, td {
        text-align: center !important;
    }
    
    .logoutbtn {
        margin-left: 10px;
    }
    .myinfo {
        margin-right: 10px;
    }
</style>