<template>
    <v-dialog v-model="selectTemplateModal" max-width="400px">
        <v-card>
            <v-card-title>
                <span>서식 선택</span>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-autocomplete
                    clearable
                    chips
                    :items="templates"
                    item-text="title"
                    item-value="id"
                    v-model="selectedItem"
                    label="선택가능한 서식"
                    >
                    </v-autocomplete>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" text @click="closeSelectTemplateModal">
                    닫기
                </v-btn>
                <v-btn color="primary" text @click="selectTemplate">
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
            selectTemplateModal: false,
            templates: [],
            selectedItem : null
        }
    },
    methods: {
        selectTemplateModalShow: async function() {
            const response = await fetch(`/templates/available`, {
                headers: {
                    Authorization : `Bearer ${this.$cookie.get("authorization")}`
                }
            });
            if(response.ok) {
                const result = await response.json();
                this.templates = result;
                this.selectTemplateModal = true;
            }
        },
        selectTemplate: function() {
            if(!this.selectedItem) {
                alert('서식을 선택해주세요.');
            }else {
                this.$emit('selectTemplate', this.selectedItem);
                this.selectTemplateModal = false;
            }
        },
        closeSelectTemplateModal: function() {
            this.selectTemplateModal = false;
            this.$router.push('/documents');
        }
    }

}
</script>

<style>

</style>