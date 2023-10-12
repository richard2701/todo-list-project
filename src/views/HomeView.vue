<template>
  <main class="relative">
    <div class="float-button">
      <button @click="modals.addNote = true">
        <span class="float-button__desktop">Add Note</span>
        <i class="float-button__mobile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-plus "
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
              fill="none"
            ></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M9 12h6"></path>
            <path d="M12 9v6"></path>
          </svg>
        </i>
      </button>
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