<template>
  <main class="relative">
    <div class="float-button">
      <button @click="modals.addNote = true"><span>Add</span>Note</button>
    </div>
    <section class="p-4">
      <div class="container">
        <FiltersButton />
      </div>
    </section>
    <section class="p-4">
      <TableData @editNote="openDataModal($event)" />
      <ModalAddNote
        v-if="modals.addNote"
        v-model="modals.addNote"
        v-model:form-data="formData"
        :edit-note="modals.editNote"
        @add-new-note="addNoteStore()"
        @update:edit-note="modals.editNote = $event"
        @update:form-data="val => formData = val"
      />
    </section>
  </main>
</template>
<script setup>
import { reactive, ref } from 'vue'
import TableData from '../components/TableData.vue'
import FiltersButton from '../components/FiltersButton.Vue'
import ModalAddNote from '../components/ModalAddNote.vue'
const formData = ref({
  id: '',
  task: '',
  priority: ''
});
const modals = reactive({
  addNote: false,
  editNote: false,
  deleteNote: false
})

const openDataModal = (data) => {
  const { id, task, priority } = data
  formData.value = {
    id,
    task,
    priority
  }
  modals.addNote = true
  modals.editNote = true
}

</script>