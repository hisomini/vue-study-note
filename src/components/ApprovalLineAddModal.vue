<template>
    <v-dialog v-model="approvalLineAddModal" max-width="600px">
        <v-card>
            <v-card-title>
                <span>결재선 추가</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                <v-text-field label="결재선 명" required clearable v-model="approvalLineTitle"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                    clearable
                    deletable-chips
                    multiple
                    small-chips
                    :items="select"
                    item-text="name"
                    item-value="id"
                    v-model="selectedItem"
                    return-object
                    label="결재선"
                    class="add"
                    >
                    </v-autocomplete>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" text @click="approvalLineAddModal = false">
                    닫기
                </v-btn>
                <v-btn color="primary" text @click="saveApprovalLine()">
                    저장
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
export default {
    data: function() {
        return {
            approvalLineAddModal: false,
            select : null,
            selectedItem: [],
            approvalLineTitle: null,
            employees: []
        }
    },
    methods: {
        approvalLineAddModalShow: async function() {
            const response = await fetch("/employees", {
                headers : {
                    "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                this.select = result;
                this.selectedItem = [];
                this.approvalLineTitle = null;
                this.approvalLineAddModal = true
            }
            else if(response.status == 401) {
                this.$redirectLoginPage();
            }
        },
        saveApprovalLine: async function() {
            this.employees = [];
            for(let i in this.selectedItem) {
                this.employees.push(this.selectedItem[i].id)
            }
            const createResponse = await fetch(`/approval-lines`, {
                method: 'POST',
                body: JSON.stringify({
                    title: this.approvalLineTitle,
                    employees: this.employees
                }),
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            if(createResponse.ok) {
                this.approvalLineAddModal = false;
                this.$emit('pageLoading');
            }
            else if(createResponse.status == 401) {
                this.$redirectLoginPage();
            }
            else if(createResponse.status == 409) {
                alert('결재선 명이 중복됩니다.');
            }
        }
    }
}
</script>

<style>

</style>