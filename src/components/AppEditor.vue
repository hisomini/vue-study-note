<template>
      <div class="wrap">
            <app-header></app-header>
            <div class="contents">
                  <app-sidebar class="side"></app-sidebar>
                  <div class="main">
                        <ckeditor :editor="editor" v-model="editorData"/>
                        <button v-on:click="saveText">save</button>
                        <br>
                        <span>{{ saveData }}</span>
                  </div>
            </div>
      </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic' 
import CKEditor from '@ckeditor/ckeditor5-vue2';
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
export default { 
      name: 'CKEditor', 
      components: { 
      ckeditor: CKEditor.component,
      'app-header': AppHeader,
      'app-sidebar' : AppSidebar
      }, 
      data: () => ({ 
            editor: ClassicEditor, 
            editorData: '<p> content',
            saveData: '',
            test: true
            }),
      watch: {
      },
      methods: {
            // saveText: function() {
            //       this.$emit('saveText',this.editorData);
            // }
            saveText: function() {
                  this.saveData = this.editorData;
            }
      }
}
</script>

<style>

</style>