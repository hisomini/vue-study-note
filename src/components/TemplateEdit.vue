<template>
    <div class="wrap">
    <app-header></app-header>
    <div class="contents">
        <app-sidebar class="side"></app-sidebar>
        <div class="main">
            <div>
                <v-col cols="12" sm="3">
                    <success-modal ref="successModal" v-bind:content="successContent" v-on:ok="moveListPage"></success-modal>
                    <v-text-field label="타이틀" v-model="editorTitle"></v-text-field>
                    <span v-if="approvalLine">연결된 결재선 : {{ approvalLine.title }}</span>
                    <td v-else>연결된 결재선 없음</td>
                    <v-btn color="primary" dark @click="selectApprovalLineModalShow()">
                            결재선 수정
                    </v-btn>
                </v-col>
                <ckeditor :editor="editor" v-model="editorContents" :config="editorConfig"/>
                <approvalLine-modal ref="selectApprovalLine" v-on:selectApprovalLine="selectApprovalLine"></approvalLine-modal>
            </div>
            <save-button v-on:save="editTemplate"></save-button>
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
import SelectApprovalLineModal from '../components/SelectApprovalLineModal.vue';
import SuccessModal from '../components/SuccessModal.vue'

export default {
    name: 'CKEditor',
    components: {
        ckeditor: CKEditor.component,
        'app-header': AppHeader,
        'app-sidebar' : AppSidebar,
        'cancel-button' : CancelButton,
        'save-button' : SaveButton,
        'approvalLine-modal' : SelectApprovalLineModal,
        'success-modal' : SuccessModal
    },
    data: function() {
        return {
            editor: ClassicEditor,
            editorContents: '',
            editorTitle:'',
            editorConfig: {},
            approvalLine: null,
            successContent: '수정되었습니다.'
        }
    },
    props: {
        id: {
            type : String,
            default :''
        }
    },
    created: async function() {
        const createResponse = await fetch(`/templates/${this.id}`,{
            headers : {
                "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
            }
        });
        if (createResponse.ok) {
            const result = await createResponse.json();
            this.editorContents = result.template;
            this.editorTitle = result.title;
            if(result.approval_line) {
                this.approvalLine = result.approval_line;
            }else {
                this.approvalLine = null;
            }
        }
    },
    methods: {
        editTemplate: async function() {
            const response = await fetch(`/templates/${this.id}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    title: this.editorTitle,
                    template: this.editorContents,
                    approval_line_id: this.approvalLine.id
                }),
                headers: {
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            if (response.ok) {
                this.$refs.successModal.showModal();
            }else if(response.status == '409') {
                alert('서식명이 중복됩니다.');
            }
        },
        moveListPage: function() {
            this.$router.push('/templates');
        },
        selectApprovalLineModalShow: function() {
            this.$refs.selectApprovalLine.selectApprovalLineModalShowWithId(this.approvalLine);

        },
        selectApprovalLine: function(value) {
            this.approvalLine = value;

        }

    }
}
</script>

<style>

</style>