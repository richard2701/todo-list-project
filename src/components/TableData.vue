<template>
  <div class="container">
    <div class="table-container">
      <table class="custom table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th
              v-for="item in headTable"
              :key="item.key"
              :style="{ width: item.key === 'action' || item.key === 'id' ? '15%' : 'auto' }"
            >

              {{ item.name }}
            </th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="j in storeTodo.notes"
            :key="j.id"
          >
            <td
              v-for="(i, value, index) in j"
              :key="index"
              class="is-vcentered"
            >
              <template v-if="value === 'priority'">
                <span
                  v-if="i === 'meh'"
                  class="tag is-danger"
                >
                  {{ i }}
                </span>
                <span
                  v-else-if="i === 'life changing'"
                  class="tag is-warning"
                >
                  {{ i }}
                </span>
                <span
                  v-else
                  class="tag is-success"
                >
                  {{ i }}
                </span>
              </template>
              <template v-else>
                {{ i }}
              </template>
            </td>
            <td>
              <div>
                <button
                  class="button is-warning mr-2 mb-md-2"
                  @click="$emit('edit-note', j)"
                >Edit</button>
                <button
                  class="button is-danger"
                  data-test="delete-note-button"
                  @click="deleteNoteInfo(j)"
                >Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalDelete
      v-if="modalValue"
      v-model="modalValue"
      @delete-note="deleteNote"
    >
      <h2 class="is-size-2 has-text-weight-medium has-text-danger has-text-centered">
        Are you sure you want to delete this note?
      </h2>
    </ModalDelete>
    <AlertInfo v-if="aletInfoValue">The note was delete</AlertInfo>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModalDelete from './ModalDelete.vue';
import { useStoreTodo } from '@/stores/storeTodo'
import AlertInfo from './AlertInfo.vue';
const storeTodo = useStoreTodo()
const noteDelete = ref({})
const modalValue = ref(false)
const aletInfoValue = ref(false)
const headTable = [
  {
    name: 'ID',
    key: 'id'
  },
  {
    name: 'Task',
    key: 'task'
  },
  {
    name: 'Priority',
    key: 'priority'
  },
  {
    name: 'Action',
    key: 'action'
  }
]

const deleteNoteInfo = (j) => {
  noteDelete.value = j
  modalValue.value = true
}

const deleteNote = () => {
  storeTodo.deleteNote(noteDelete.value)
  aletInfoValue.value = true
  modalValue.value = false
  setTimeout(() => {
    aletInfoValue.value = false
  }, 3000)
}


</script>