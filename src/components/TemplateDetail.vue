<template>
<div class="wrap">
    <app-header></app-header>
    <div class="contents">
        <app-sidebar class="side"></app-sidebar>
        <div class="main">
            <v-row class="titles">
            <v-col cols="12" sm="3">
                <v-text-field v-model="editorTitle" readonly></v-text-field>
                <span v-if="approvalLine">연결된 결재선 : {{ approvalLine }}</span>
                <td v-else>연결된 결재선 없음</td>
            </v-col>
            </v-row>
            <ckeditor :editor="editor" v-model="editorContents" :config="editorConfig" :disabled="editorDisabled" />
            <edit-button v-on:edit="editTemplate($route.params.id)"></edit-button>
            <move-button v-on:moveList="moveListPage"></move-button>
        </div>
    </div>
</div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
import EditButton from '../components/EditButton.vue';
import MoveListButton from '../components/MoveListButton.vue'

export default {
    name: 'CKEditor',
    components: {
        ckeditor: CKEditor.component,
        'app-header': AppHeader,
        'app-sidebar' : AppSidebar,
        'edit-button': EditButton,
        'move-button' : MoveListButton
    },
    data: function() {
        return {
            editor : ClassicEditor,
            editorContents : '',
            editorTitle :'',
            editorDisabled : true,
            editorConfig : {
                toolbar: []
            },
            approvalLine: null
        }
    },
    props: {
        id: {
            type : String,
            default :''
        }
    },
    created: async function() {
        const response = await fetch(`/templates/${this.id}`,{
            headers: {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            this.editorContents = result.template;
            this.editorTitle = result.title;
            if(result.approval_line) {
                this.approvalLine = result.approval_line.title;

            }else {
                this.approvalLine = null
            }
        }
        else if(response.status == 401) {
            this.$redirectLoginPage();
        }
    },
    methods: {
        editTemplate : function(id) {
            this.$router.push({name: 'templateEdit', params: { id: id }});
        },
        moveListPage : function() {
            this.$router.push('/templates');
        }
    }
}
</script>

<style>
.titles {
    margin-bottom: 10px;
}

</style>