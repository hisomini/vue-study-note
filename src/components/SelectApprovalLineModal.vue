<template>
    <v-dialog v-model="selectApprovalLineModal" max-width="400px">
        <v-card>
            <v-card-title>
                <span>결재선 선택</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-autocomplete
                    clearable
                    small-chips
                    :items="approvalLines"
                    item-text="title"
                    item-value="id"
                    v-model="selectedItem"
                    label="결재선"
                    return-object
                    @change="getApprovalLineInfo()"
                    >
                    </v-autocomplete>
                </v-col>
                <div class="sheets">
                    <v-sheet class="sheet" color="yellow lighten-3" elevation="1" height="40" width="100" v-for="employee in employees" v-bind:key="employee.id">
                        <span class="sheet-text">{{ employee.name }}{{ employee.rank }}</span>
                    </v-sheet>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" text @click="selectApprovalLineModal = false">
                    닫기
                </v-btn>
                <v-btn color="primary" text @click="selectApprovalLine">
                    선택
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: function() {
        return {
            selectApprovalLineModal: false,
            approvalLines: [],
            selectedItem: null,
            employees: []
        }
    },
    methods: {
        selectApprovalLineModalShow: async function() {
            this.selectedItem = null;
            this.approvalLines = [];
            this.employees = [];

            const response = await fetch(`/approval-lines`, {
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                this.approvalLines = result;
                this.selectApprovalLineModal = true;
            }
        },
        selectApprovalLineModalShowWithId: async function(id) {
            this.selectedItem = id;
            this.approvalLines = [];
            this.employees = [];
            const response = await fetch(`/approval-lines`, {
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                this.approvalLines = result;
                this.selectApprovalLineModal = true;
                this.getApprovalLineInfo();
            }
        },
        getApprovalLineInfo: async function() {
            if (this.selectedItem) {
                const response = await fetch(`/approval-lines/${this.selectedItem.id}`, {
                    headers: {
                        Authorization : `Bearer ${this.$cookie.get("authorization")}`
                    }
                })
                if(response.ok) {
                    const result = await response.json();
                    this.employees = result.employees;
                }
            }else {
                this.employees = [];
            }
        },
        selectApprovalLine: function() {
            this.$emit('selectApprovalLine', this.selectedItem);
            this.selectApprovalLineModal = false;
        }
    }
}
</script>

<style>
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