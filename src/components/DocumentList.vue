<template>
    <div class="wrap">
        <app-header></app-header>
            <div class="contents">
                <app-sidebar class="side"></app-sidebar>
                <div class="main">
                    <add-button v-bind:btnName="addButton" ref="addButton" v-on:moveAddPage="moveDocumentAddPage"></add-button>
                    <v-data-table
                        :headers="headers"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        :items="documents"
                        hide-default-footer
                        @page-count="pageCount = $event"
                        item-key="id">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row.item.title}}</td>
                                <td>{{ row.item.creator.name}}</td>
                                <td>{{ row.item.updator.name}}</td>
                                <td>{{ $moment(row.item.created).format('YYYY-MM-DD hh:mm:ss') }}</td>
                                <td>{{ $moment(row.item.updated).format('YYYY-MM-DD hh:mm:ss') }}</td>
                                <td><b-button class="btn-common"><router-link :to="{name: 'documentDetail', params: { id: row.item.id }}">문서보기 및 수정</router-link></b-button></td>
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
    methods: {
        moveDocumentAddPage: function() {
            this.$router.push({ name: 'documentAdd' });
        }
    },
    data:  function() {
        return {
            documents : [],
            addButton : '문서작성',
            headers: [
                { text: '문서명', value: 'title'},
                { text: '작성자', value: 'creator.name'},
                { text: '작성일자', value: 'created'},
                { text: '수정자', value: 'updator.name'},
                { text: '수정일자', value: 'updated'},
                { text: ''},
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 3,
        }
    },
    created: async function() {
        const response = await fetch("/documents", {
            headers : {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if(response.ok) {
            const result = await response.json();
            this.documents = result;
        }
        else if(response.status == 401) {
            this.$redirectLoginPage();
        }
    },
}
</script>

<style>

</style>