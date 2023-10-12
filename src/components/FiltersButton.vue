<template>
  <div>
    <button
      v-if="!resetInitData"
      @click="changeFilter()"
      class="button is-primary mr-2"
    >
      {{ filter ? 'Restore old data' : 'Sort by priority' }}
    </button>

    <button
      @click="deleteAll()"
      class="button"
      :class="resetInitData ? 'is-info' : 'is-danger'"
    >
      {{ resetInitData ? 'Reset init data' : 'Delete all' }}
    </button>
    <ModalDelete
      v-if="modalValue"
      v-model="modalValue"
      @delete-note="deleteNote"
    >
      <h2 class="is-size-2 has-text-weight-medium has-text-danger has-text-centered ">
        Are you sure you want to delete all notes?
      </h2>
    </ModalDelete>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModalDelete from './ModalDelete.vue';
import { useStoreTodo } from '@/stores/storeTodo'
const storeTodo = useStoreTodo()
const filter = ref(false)
const modalValue = ref(false)

const resetInitData = computed(() => {
  return storeTodo.notesLoaded
})
const changeFilter = () => {
  filter.value = !filter.value
  if (filter.value) {
    storeTodo.setOldData(storeTodo.notes)
    storeTodo.sortingByPriority()
  } else {
    storeTodo.restoreOldData()
  }
}

const deleteAll = () => {
  if (resetInitData.value) {
    storeTodo.resetInit()
  } else {
    modalValue.value = true
  }
}

const deleteNote = () => {
  storeTodo.deleteAllNotes()
  modalValue.value = false
  filter.value = false
}

</script>