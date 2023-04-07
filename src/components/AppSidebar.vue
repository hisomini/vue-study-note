<template>
    <div>
        <div class="px-4 py-2">
        <div class="menu">
        <b-button v-b-toggle.collapse-1 class="btn-common">서식관리</b-button>
            <b-collapse id="collapse-1" class="mt-2">
                <li class="card-text" v-on:click="pageMove('templates')">서식관리</li>
            </b-collapse>
        <b-button v-b-toggle.collapse-2 class="btn-common">문서관리</b-button>
            <b-collapse id="collapse-2" class="mt-2">
                <li class="card-text" v-on:click="pageMove('documents')">문서관리</li>
            </b-collapse>
        <b-button v-b-toggle.collapse-4 class="btn-common">사원정보</b-button>
        <b-collapse id="collapse-4" class="mt-2">
            <li class="card-text" v-on:click="pageMove('employees')">사원정보 관리</li>
        </b-collapse>
        <b-button v-b-toggle.collapse-3 class="btn-common">결재관리</b-button>
            <b-collapse id="collapse-3" class="mt-2">
                <li class="card-text" v-on:click="pageMove('approvalLines')">결재선 관리</li>
            </b-collapse>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            moveDate : new Date()
        }
    },
    methods: {
        pageMove: function(page) {
            this.$router.push({ name: page }).catch((error) => {
                if(error.name == "NavigationDuplicated") {
                    this.$router.go(this.$router.currentRoute);
                }
            })
        }
    },
}
</script>

<style scoped>
    a:link { 
        text-decoration: none;
        color: rgb(66, 63, 63);
    }

    a:visited { 
        text-decoration: none;
        color: rgb(66, 63, 63);
    }
    .btn-common {
        margin-bottom: 10px;
    }
</style>