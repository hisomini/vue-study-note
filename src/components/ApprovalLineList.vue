<template>
  <div class="wrap">
        <app-header></app-header>
            <div class="contents">
                <app-sidebar class="side"></app-sidebar>
                <div class="main">
                  <div class="add-btn">
                  <v-btn color="primary" dark @click="approvalLineAddModalShow()">
                    결재선 추가
                  </v-btn>
                  <add-modal ref="approvalLineAdd" v-on:pageLoading="pageLoading()"></add-modal>
                  <detail-modal ref="approvalLineDetail" v-on:pageLoading="pageLoading()"></detail-modal>
                  </div>
                  <v-data-table
                    :headers="headers"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    :items="approvalLines"
                    hide-default-footer
                    @page-count="pageCount = $event"
                    item-key="id"
                    >
                    <template v-slot:item="row">
                      <tr>
                        <td>{{ row.item.title}}</td>
                        <td>{{ row.item.creator.name}}</td>
                        <td>{{ row.item.updator.name}}</td>
                        <td>{{ $moment(row.item.created).format('YYYY-MM-DD hh:mm:ss') }}</td>
                        <td>{{ $moment(row.item.updated).format('YYYY-MM-DD hh:mm:ss') }}</td>
                        <td><v-btn color="primary" dark @click="approvalLineDetailModalShow(row.item.id)">결재선 보기</v-btn></td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </div>
            </div>
    </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import ApprovalLineAddModal from './ApprovalLineAddModal.vue'
import ApprovalLineDetailModal from './ApprovalLineDetailModal.vue'

export default {
    components: {
      'app-header': AppHeader,
      'app-sidebar' : AppSidebar,
      'add-modal' : ApprovalLineAddModal,
      'detail-modal' : ApprovalLineDetailModal,
      }, 
    data: function() {
      return {
        approvalLines : [],
        headers: [
          { text: '결재선 명', value: 'title'},
          { text: '작성자', value: 'creator.name'},
          { text: '수정자', value: 'updator.name'},
          { text: '작성일자', value: 'created'},
          { text: '수정일자', value: 'updated'},
          { text: ''},
        ],
        page: 1,
        pageCount: 0,
        itemsPerPage: 2,
        alert: false,
        dialog: false
      }
    },
    methods: {
      pageLoading: async function() {
          const response = await fetch("/approval-lines", {
            headers: {
              "Authorization" : `Bearer ${this.$cookie.get("authorization")}`
              }
          });
          if(response.ok) {
            const result = await response.json();
            this.approvalLines = result;
          }
          else if(response.status == 401) {
            this.$redirectLoginPage();
          }
      },
      approvalLineAddModalShow: function() {
        this.$refs.approvalLineAdd.approvalLineAddModalShow();
      },
      approvalLineDetailModalShow: function(id) {
        this.$refs.approvalLineDetail.approvalLineDetailModalShow(id);
      },
      test: function() {
        this.alert = true;
        setTimeout(()=>{
          this.alert = false
        }, 2000)
      }
    },
    created: function() {
      this.pageLoading();
    }
}
</script>

<style>

  .add-btn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .v-chip.v-size--small {
    border-radius: 10px !important;
    font-size: 18px !important;
    height: 40px !important;
  }

  .theme--light.v-chip:not(.v-chip--active) {
      background: #BBDEFB !important;
  }

  .table-thead {
      background: rgb(209, 229, 238);
  }

  .table-tbody {
      background: #e0ecf1;
  }

  tr:hover {
      background-color: transparent !important;
  }
</style>