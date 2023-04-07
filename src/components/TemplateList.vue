<template>
    <div class="wrap">
        <app-header></app-header>
            <div class="contents">
                <app-sidebar class="side"></app-sidebar>
                <div class="main">
                    <add-button v-bind:btnName="addButton" v-on:moveAddPage="moveTemplateAddPage"></add-button>
                    <v-data-table
                        :headers="headers"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        :items="formItems"
                        hide-default-footer
                        @page-count="pageCount = $event"
                        item-key="id">
                    <template v-slot:item="row">
                        <tr>
                            <td v-bind:class="{available: !row.item.available }">{{ row.item.title}}</td>
                            <td v-bind:class="{available: !row.item.available }">{{ row.item.creator.name}}</td>
                            <td v-bind:class="{available: !row.item.available }">{{ row.item.updator.name}}</td>
                            <td v-bind:class="{available: !row.item.available }">{{ $moment(row.item.created).format('YYYY-MM-DD hh:mm:ss') }}</td>
                            <td v-bind:class="{available: !row.item.available }">{{ $moment(row.item.updated).format('YYYY-MM-DD hh:mm:ss') }}</td>
                            <td v-if="row.item.approval_line" v-bind:class="{available: !row.item.available }">{{ row.item.approval_line.title }}</td>
                            <td v-else v-bind:class="{available: !row.item.available }">연결된 결재선 없음</td>
                            <td><b-button class="btn-common"><router-link :to="{name: 'templateDetail', params: { id: row.item.id}}">서식보기 및 수정</router-link></b-button></td>
                            <td v-if="row.item.available"><b-button class="btn-common isactive" v-on:click="inactive( row.item.id, row.item.title );">서식비활성</b-button></td>
                            <td v-else><b-button class="btn-common isactive" v-on:click="active( row.item.id, row.item.title );">서식활성</b-button></td>
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
        'app-header': AppHeader,
        'app-sidebar' : AppSidebar,
        'add-button' : AddButton
        
    },
    data: function() {
        return {
            formItems : [],
            selectedFormId: null,
            selectedFormTitle: '',
            addButton : '서식추가',
            selected: null,
            headers: [
                { text: '서식명', value: 'title'},
                { text: '작성자', value: 'creator.name'},
                { text: '작성일자', value: 'created'},
                { text: '수정자', value: 'updator.name'},
                { text: '수정일자', value: 'updated'},
                { text: '결재선', value: 'approval_line.title'},
                { text: '',},
                { text: ''},
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 4,
        }        
    },
    methods: {
        inactive: function(id, title) {
            this.selectedFormId = id;
            this.$bvModal.msgBoxConfirm(`${title}을 비활성하시겠습니까?`, {
            title: '서식비활성',
            size: 'ml',
            buttonSize: 'ml',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then(value => {
                if(value == true) {
                    this.inactiveTemplate();
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        active: function(id, title) {
            this.selectedFormId = id;
            this.$bvModal.msgBoxConfirm(`${title}을 활성하시겠습니까?`, {
            title: '서식활성',
            size: 'ml',
            buttonSize: 'ml',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then(value => {
                if(value == true) {
                    this.activeTemplate();
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        inactiveTemplate: async function() {
            const result = await fetch(`/templates/${this.selectedFormId}/available/false`, {
                method: "PUT",
                headers :{
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}` 
                }
            })
            if(result.ok) {
                this.pageLoading();
            }
        },
        activeTemplate: async function() {
            const result = await fetch(`/templates/${this.selectedFormId}/available/true`, {
                method: "PUT",
                headers :{
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}` 
                    
                }
            })
            if(result.ok) {
                this.pageLoading();
            }
        },
        pageLoading: async function() {
            const response = await fetch("/templates", {
                headers : {
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}` 
                }
            });
            if (response.ok) {
                const result = await response.json();
                this.formItems = result;
            }
            else if(response.status == 401) {
                this.$redirectLoginPage();
            }
        },
        moveTemplateAddPage: function() {
            this.$router.push({ name: 'templateAdd' });
        },
        moveTemplateDetailPage: function(id) {
            this.$router.push({ name : 'templateDetail', params: { id : id }});
        }

    },
    created: function() {
        // this.pageLoading();
    }
}
    
</script>

<style>

    .available {
        text-decoration: line-through;
        color: #b3adad;
    }

    .click {
        color: blue;
    }

    .table-thead {
        background: rgb(209, 229, 238);
    }

    .table-tbody {
        background: #e0ecf1;
    }

    tr:hover {
        background-color: transparent !important;
    }

    .isactive {
        width: 8vw;
    }
</style>