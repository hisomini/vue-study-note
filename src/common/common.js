const methods = {
    fetchWithToken: async function(url, headers, body,token, method) {
        headers.Authorization = `Bearer ${token}`;
        return await fetch(url,{
            headers: headers,
            method: method
        },);
    },
    redirectLoginPage : function() {
        this.$router.push('/login');
    },
    redirectMainPage : function() {
        this.$router.push('/documents');
    }
}


export default {
    install(Vue) {
        Vue.prototype.$fetchWithToken = methods.fetchWithToken;
        Vue.prototype.$redirectLoginPage = methods.redirectLoginPage;
        Vue.prototype.$redirectMainPage = methods.redirectMainPage;
    }
}