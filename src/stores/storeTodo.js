import { defineStore } from 'pinia'
import todoData from '@/data/todo-data.json'

export const useStoreTodo = defineStore('storeTodo', {
  state: () => {
    return {
      notes: [],
      safeOldData: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      if (!this.notesLoaded) {
        this.notes = localStorage.getItem('storeTodo') ? JSON.parse(localStorage.getItem('storeTodo')).notes : todoData.data
      }
    },
    resetInit() {
      if (this.notesLoaded) {
        this.notes = JSON.parse(JSON.stringify(todoData.data));
        this.notesLoaded = false
      }
    },
    addNote(payload) {
      this.notes.unshift(payload)
    },
    editNote(payload) {
      const index = this.notes.findIndex(note => note.id === payload.id)
      this.notes[index] = payload
    },
    deleteNote(payload) {
      console.log(payload)
      this.notes = this.notes.filter(note => note.id !== payload.id)
    },
    sortingByPriority() {
      const priorityOrder = { 'important': 0, 'life changing': 1, 'meh': 2 }
      this.notes = this.notes.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      });
    },
    setOldData(payload) {
      this.safeOldData = JSON.parse(JSON.stringify(payload));
    },
    restoreOldData() {
      this.notes = this.safeOldData
    },
    deleteAllNotes() {
      this.notes = []
      this.notesLoaded = true
    }
  },
  persist: true,
})
