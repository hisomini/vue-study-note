<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <add-button v-bind:btnName="addButton" v-on:moveAddPage="moveEmployeeAddPage"></add-button>
                <v-data-table
                :headers="headers"
                :items="employees"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                @page-count="pageCount = $event"
                item-key="성명">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.name }}</td>
                            <td>{{ row.item.username }}</td>
                            <td>{{ row.item.rank }}</td>
                            <td>{{ row.item.phone }}</td>
                            <td>{{ row.item.phone }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import AddButton from '../components/AddButton.vue'

export default {
    components: {
        'app-header' : AppHeader,
        'app-sidebar' : AppSidebar,
        'add-button' : AddButton
    },
    data: function() {
        return {
            employees: [],
            headers: [
                { text: '성명', value: 'name' },
                { text: 'ID', value: 'username' },
                { text: '직급', value: 'rank' },
                { text: '휴대폰번호', value: 'phone' },
                { text: ''}
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 1,
            addButton: '사원추가'
        }
    },
    created: async function() {
        const response = await fetch("/employees", {
            headers : {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if(response.ok) {
            const result = await response.json();
            this.employees = result;
        }
        else if(response.status == 401) {
            this.$redirectLoginPage();
        }
    },
    methods: {
        moveEmployeeAddPage: function() {
            this.$router.push({ name: 'employeeAdd'});
        }
    }
    

}
</script>

<style>
    .v-application .text-start {
        text-align: center !important;
    }

    .v-data-table-header {
        background: rgb(209, 229, 238);
    }

    tbody>tr {
        background: #e0ecf1;
    }
    .v-data-table__wrapper > table > tbody > tr:hover {
        background: #e0ecf1 !important;
    }

</style>