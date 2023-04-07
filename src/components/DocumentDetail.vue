<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <v-col cols="12" sm="3">
                        <v-text-field label="문서명" v-model="editorTitle"></v-text-field>
                </v-col>
                <ckeditor :editor="editor" v-model="editorContents" :config="editorConfig" :disabled="editorDisabled"/>
                <edit-button v-on:edit="editDocument(id)"></edit-button>
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
            editorTitle : '',
            editorDisabled : true,
            editorConfig : {
                toolbar: []
            }
        }
    },
    props: {
        id: {
            type: String,
            default : ''
        }
    },
    created: async function() {
        const response = await fetch(`/documents/${this.id}`, {
            headers: {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if(response.ok) {
            const result = await response.json();
            this.editorContents = result.content;
            this.editorTitle = result.title;
        }
        else if(response.status == 401) {
            this.$redirectLoginPage();
        }
    },
    methods : {
        editDocument : function(id) {
            this.$router.push({name: 'documentEdit', params: { id: id }});
        },
        moveListPage : function() {
            this.$router.push('/documents');
        }
    }
}
</script>

<style>

</style>