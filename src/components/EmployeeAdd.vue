<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <div class="box">
                <v-form ref="form" v-model="valid" class="add-form">
                        <v-text-field
                        v-model="username"
                        label="아이디"
                        required
                        autocomplete="username"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            label="비밀번호"
                            counter
                            autocomplete="password"
                            @click:append="show1 = !show1"
                        ></v-text-field>
                        <v-text-field
                        v-model="name"
                        label="이름"
                        required
                        ></v-text-field>
                        <v-text-field
                        v-model="employee_code"
                        label="사원코드"
                        required
                        ></v-text-field>
                        <v-text-field
                        v-model="phone"
                        :counter="11"
                        label="휴대폰번호"
                        required
                        ></v-text-field>
                        <v-text-field
                        v-model="rank"
                        label="직급"
                        required
                        ></v-text-field>
                    <div class="buttons">
                        <save-button v-on:save="saveEmployee"></save-button>
                        <cancel-button v-on:cancel="moveListPage"></cancel-button>
                    </div>
                </v-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
import SaveButton from '../components/SaveButton.vue';
import CancelButton from '../components/CancelButton.vue';

export default {
    components: {
        'app-header': AppHeader,
        'app-sidebar': AppSidebar,
        'save-button' : SaveButton,
        'cancel-button' : CancelButton
    },
    data: function() {
        return {
            username : '',
            password : '',
            name : '',
            employee_code: '',
            phone: '',
            rank : '',
            alert: false,
            show1: false
        }
    },
    created : function() {
    },
    methods: {
        saveEmployee: async function() {
            if(!this.username || !this.password || !this.name || !this.employee_code || !this.phone || !this.rank) {
                this.alert = true;
            }
            else {
                const createResponse = await fetch('/employees', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                        name: this.name,
                        employee_code: this.employee_code,
                        phone: this.phone,
                        rank: this.rank
                    }),
                    headers : {
                        "Authorization" : `Bearer ${this.$cookie.get("authorization")}`,
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                if(createResponse.ok) {
                    alert('저장되었습니다.');
                    this.moveListPage();
                }
                else if(createResponse.status == 401 && this.$cookie.get("authorization") != null) {
                    this.$redirectLoginPage();
                }                                                                         
            }
        },
        moveListPage: function() {
            this.$router.push('/employees');
        },
        // getTemplateList: async function() {
        //     const response = await fetch("/templates/available",{
        //         headers: {
        //             "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
        //         }
        //     });
        //     if(response.ok) {
        //         const result = await response.json();
        //         this.options = result.data;
        //         this.options.push({id:null, title: "서식을 선택해주세요"});
        //     }
        // },
    }
}
</script>

<style scoped>
    .container-fluid {
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .btn-secondary {
        width: 15%;
    }
    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .add-form {
        width: 40%;
    }
    .box {
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>