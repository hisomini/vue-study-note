<template>
    <div class="wrap">
        <app-header></app-header>
        <div class="contents">
            <app-sidebar class="side"></app-sidebar>
            <div class="main">
                <success-modal ref="successModal" v-bind:content="successContent" v-on:ok="moveListPage"></success-modal>
                <v-col cols="12" md="3" class="title">
                    <v-text-field label="타이틀" v-model="editorTitle"></v-text-field>
                    <v-btn color="primary" dark @click="selectApprovalLineModalShow()">
                        결재선 추가
                    </v-btn>
                    <span>{{ approvalLineName }}</span>
                </v-col>
                <approvalLine-modal ref="selectApprovalLine" v-on:selectApprovalLine="selectApprovalLine"></approvalLine-modal>
                <ckeditor :editor="editor" v-model="editorContents"/>
                <save-button v-on:save="saveTemplate"></save-button>
                <cancel-button v-on:cancel="moveListPage"></cancel-button>
                <br>
            </div>
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
import SelectApprovalLineModal from '../components/SelectApprovalLineModal.vue'
import SuccessModal from '../components/SuccessModal.vue'

export default { 
    name: 'CKEditor', 
    components: { 
        ckeditor: CKEditor.component,
        'app-header': AppHeader,
        'app-sidebar' : AppSidebar,
        'save-button' : SaveButton,
        'cancel-button': CancelButton,
        'approvalLine-modal' : SelectApprovalLineModal,
        'success-modal' : SuccessModal
    },
    data: function() {
        return {
            editor: ClassicEditor, 
            editorContents: '',
            editorTitle: '',
            approvalLineId: null,
            approvalLineName: null,
            successContent: '저장되었습니다.'
        }
    },
    methods: {
        saveTemplate: async function() {
            if(!this.editorTitle) {
                alert("타이틀을 입력해주세요.")
            } 
            else {
                const response = await fetch('/templates',{
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.editorTitle,
                        template: this.editorContents,
                        approval_line_id: this.approvalLineId
                    }),
                    headers: {
                        "Authorization" : `Bearer ${this.$cookie.get("authorization")}`,
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                if (response.ok) {
                    this.$refs.successModal.showModal();
                }
                else if(response.status == 409) {
                    alert("중복된 타이틀입니다.");
                }
                else {
                    console.log(await response.json());
                }
            }
        },
        moveListPage: function() {
            this.$router.push('/templates');
        },

        selectApprovalLineModalShow: function() {
            this.$refs.selectApprovalLine.selectApprovalLineModalShow();
        },
        
        selectApprovalLine: function(value) {
            this.approvalLineId = value.id;
            this.approvalLineName = value.title;
        }
    }
}
</script>

<style>

</style>