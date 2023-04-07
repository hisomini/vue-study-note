<template>
<div class="login-overview">
  <v-card elevation="12" class="login-form">
    <div class="painting"></div>
      <div class="form-signin">
      <div class="alert-area">
        <alert ref="alert" v-bind:alertDetail="alertContent"></alert>
      </div>
      <div class="form">
        <form class="inner-form">
          <h2 class="mb-4 sign-text">Please sign in</h2>
            <v-text-field label="ID" v-model="loginId" autocomplete="false"></v-text-field>
            <v-text-field
              v-model="loginPassword"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              name="input-10-1"
              label="비밀번호"
              autocomplete="false"
              @click:append="passwordShow = !passwordShow">
              </v-text-field>
          <b-button class="btn-common w-100 btn-lg" v-on:click="login">로그인</b-button>
        </form>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import Alert from '../components/AlertError.vue'
export default {
  components: {
    'alert' : Alert
  },
  data: function() {
    return {
      loginId: '',
      loginPassword: '',
      token: '',
      passwordShow: false,
      alertContent: '아이디 또는 비밀번호를 확인해주세요.',
    }
  },
  created: function() {
    if(this.$cookie.get("authorization") != null) {
        this.$redirectMainPage();
    }
  },
  methods : {
    login: async function() {
      if(!this.loginId || !this.loginPassword) {
        alert("아이디, 비밀번호를 입력해주세요.");
      } 
      else {
        const response = await fetch('/account/login', {
          method: 'POST',
          body: JSON.stringify({
            username : this.loginId,
            password: this.loginPassword
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });
        if(response.ok) {
          this.token = response.headers.get("authorization");
          console.log(this.token);
          this.$cookie.set("authorization",response.headers.get("authorization"), 1);
          this.$router.push('/templates');
        }
        else if(response.status == 401) {
          this.$refs.alert.showAlert();
        }
      }
    }
  }
}
</script>

<style>
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .login-overview {
    width: 100%;
    background: #cddff0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    width: 65vw;
    height: 65vh;
    display: flex !important;
  }
  .painting{
    width: 30%;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  }

  .inner-form {
    width: 40%;
  }

  .sign-text {
    color: #5392e3;
  }

  .form {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alert-area {
    height: 15%;
  }
</style>