<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <v-row>
                    <v-col cols="12" md="3">
                        <alert ref="emptyAlert" v-bind:alertDetail="errorContent"></alert>
                        <alert ref="overlapAlert" v-bind:alertDetail="errorContent"></alert>
                        <success-modal ref="successModal" v-bind:content="successContent" v-on:ok="moveListPage"></success-modal>
                        <v-text-field
                            v-model="documentTitle"
                            label="문서명"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <span>서식 : {{ approvalLine }}</span>
                    </v-col>
                </v-row>
                <ckeditor :editor="editor" v-model="documentContents"/>
                <save-button v-on:save="saveDocument"></save-button>
                <cancel-button v-on:cancel="moveListPage"></cancel-button>
            </div>
            <v-btn elevation="2" ref="modalOpenBtn" id="modal-btn" v-on:click="showModal"></v-btn>
            <select-template-modal ref="selectTemplateModal" v-on:selectTemplate="getTemplateInfo"></select-template-modal>
        </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
import SaveButton from '../components/SaveButton.vue';
import CancelButton from '../components/CancelButton.vue';
import SelectTemplateModal from '../components/SelectTemplateModal.vue'
import Alert from '../components/AlertError.vue'
import SuccessModal from '../components/SuccessModal.vue'

export default {
    name: 'CKEditor',
    components: {
        'ckeditor' : CKEditor.component,
        'app-header' : AppHeader,
        'app-sidebar' : AppSidebar,
        'save-button' : SaveButton,
        'cancel-button' : CancelButton,
        'select-template-modal' : SelectTemplateModal,
        'alert' : Alert,
        'success-modal' : SuccessModal
    },
    data: function() {
        return {
            editor: ClassicEditor,
            documentContents: '',
            documentTitle: '',
            selected: null,
            approvalLine: null,
            overlapErrorContent: '',
            successContent: '저장되었습니다.'

        }
    },
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    methods: {
        saveDocument: async function() {
            if(!this.documentTitle) {
                this.$refs.alert.showAlert();
            }else {
                const createResponse = await fetch(`/documents`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.documentTitle,
                        content: this.documentContents,
                        template_id: this.selected
                    }),
                    headers: {
                        Authorization : `Bearer ${this.$cookie.get("authorization")}`,
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                if(createResponse.ok) {
                    this.$refs.successModal.showModal();
                }
                else if(createResponse.status == 409) {
                    this.errorContent = '문서명이 중복됩니다.'
                    this.$refs.alert.showAlert();
                }else {
                    console.log(createResponse.json());
                }
            }
        },
        moveListPage: function() {
            this.$router.push('/documents');
        },
        showModal: function() {
            this.$refs.selectTemplateModal.selectTemplateModalShow();
        },
        getTemplateInfo: async function(id) {
            const response = await fetch(`/templates/${id}`, {
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                this.selected = id;
                const result = await response.json();
                this.documentContents = result.template
                this.approvalLine = result.approval_line.title
            }
        }
    },
    mounted() {
        document.querySelector("#modal-btn").click();
    }

}
</script>

<style>
#modal-btn {
    display: none;
}
</style>