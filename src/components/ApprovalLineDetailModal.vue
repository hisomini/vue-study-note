<template>
    <div>
        <v-dialog v-model="approvalLineDetailModal" max-width="300px">
            <v-card>
                <v-card-title>
                    <span>{{ title }}</span>
                    <v-btn color="primary" text @click="approvalLineEditModalShow(approvalLineId)">수정</v-btn>
                </v-card-title>
                <v-card-text>
                    <div class="sheets">
                        <v-sheet class="sheet" color="yellow lighten-3" elevation="1" height="40" width="100" v-for="employee in employees" v-bind:key="employee.id">
                            <span class="sheet-text">{{ employee.name }}{{ employee.rank }}</span>
                        </v-sheet>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="approvalLineDetailModal = false">
                        닫기
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="approvalLineEditModal" max-width="600px">
            <v-card>
                <v-card-title>
                    <span>결재선 수정</span>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                    <v-text-field label="결재선 명" required clearable v-model="editTitle"></v-text-field>
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
                        >
                        </v-autocomplete>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="approvalLineEditModal = false">
                        닫기
                    </v-btn>
                    <v-btn color="primary" text @click="editApprovalLine()">
                        저장
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            approvalLineDetailModal: false,
            employees : [],
            title : null,
            selectedItem: [],
            select: [],
            approvalLineEditModal: false,
            approvalLineId: null,
            editEmployees: [],
            editTitle : null

        }
    },
    methods: {
        approvalLineDetailModalShow : function(id) {
            this.approvalLineId = id;
            this.getApprovalLineInfo(id, 'detail');
        },
        approvalLineEditModalShow: function(id) {
            this.getApprovalLineInfo(id, 'edit');
            this.getEmployeeList();
        },
        getApprovalLineInfo : async function(id, type) {
            const response = await fetch(`/approval-lines/${id}`, {
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            })
            if(response.ok) {
                const result = await response.json();
                if(type == 'detail') {
                    this.employees = result.employees;
                    this.title = result.title;
                    this.approvalLineDetailModal = true;
                }else {
                    this.editTitle = result.title;
                    this.selectedItem = result.employees;
                    this.approvalLineEditModal = true;
                    this.approvalLineDetailModal = false;
                }
                

            }
        },
        getEmployeeList: async function() {
            const response = await fetch("/employees", {
                headers : {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                this.select = result;
            }
        },
        editApprovalLine: async function() {
            this.editEmployees = [];
            for(let i in this.selectedItem) {
                this.editEmployees.push(this.selectedItem[i].id)
            }
            console.log(this.editEmployees);
            const response = await fetch(`/approval-lines/${this.approvalLineId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.editTitle,
                    employees: this.editEmployees
                }),
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`,
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            if(response.ok) {
                this.approvalLineEditModal = false;
                this.$emit('pageLoading');
            }
            else if(response.status == 401) {
                this.$redirectLoginPage();
            }
            else if(response.status == 409) {
                alert('결재선 명이 중복됩니다.');
            }
        }
        
    }

}
</script>

<style scoped>
    .sheet {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
    .sheets {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>