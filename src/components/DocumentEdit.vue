<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <div>
                    <v-col cols="12" sm="3">
                        <v-text-field label="문서명" v-model="documentTitle"></v-text-field>
                    </v-col>
                    <ckeditor :editor="editor" v-model="documentContents" :config="editorConfig"/>
                </div>
                <save-button v-on:save="editDocument"></save-button>
                <cancel-button v-on:cancel="moveListPage"></cancel-button>
            </div>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
import CancelButton from '../components/CancelButton.vue';
import SaveButton from '../components/SaveButton.vue';

export default {
    name: 'CKEditor',
    components: {
        ckeditor: CKEditor.component,
        'app-header': AppHeader,
        'app-sidebar' : AppSidebar,
        'cancel-button' : CancelButton,
        'save-button' : SaveButton
    },
    data: function() {
        return {
            editor: ClassicEditor,
            documentContents: '',
            documentTitle:'',
            editorConfig: {}
        }
    },
    props: {
        id: {
            type : String,
            default :''
        }
    },
    created: async function() {
        const createResponse = await fetch(`/documents/${this.id}`,{
            headers : {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if(createResponse.ok) {
            const result = await createResponse.json();
            this.documentContents = result.content;
            this.documentTitle = result.title;
        }
    },
    methods: {
        editDocument: async function() {
            const response = await fetch(`/documents/${this.id}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    title: this.documentTitle,
                    content: this.documentContents
                }),
                headers: {
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            if(response.ok) {
                this.moveListPage();

            }
        },
        moveListPage: function() {
            this.$router.push('/documents');
        }
    }
}
</script>

<style>

</style>