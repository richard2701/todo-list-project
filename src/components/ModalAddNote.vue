<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <Form
            @submit="addOrEditNote()"
            :validation-schema="simpleSchema"
            v-slot="{ meta }"
          >
            <div class="field">
              <label class="label">Taks Name</label>
              <div class="control">
                <Field
                  class="input"
                  name="task"
                  :value="formData.task"
                  @input="$emit('update:formData', { ...formData, task: $event.target.value })"
                  type="text"
                  placeholder="Add task name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Priority</label>
              <div class="control">
                <div class="select w-100">
                  <Field
                    class="w-100"
                    :value="formData.priority"
                    name="priority"
                    as="select"
                    :target="formData.priority"
                    @input="$emit('update:formData', { ...formData, priority: $event.target.value })"
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >Select priority</option>
                    <option value="important">important</option>
                    <option value="meh">meh</option>
                    <option value="life changing">life changing</option>
                  </Field>

                </div>
              </div>
            </div>
            <div class="has-text-right">
              <button
                class="button is-primary mr-2"
                :class="loading ? 'is-loading' : ''"
                :disabled="!meta.valid"
              >
                {{ editNote ? 'Save' : 'Add' }}
              </button>
              <button
                class="button is-danger"
                @click="closeModal()"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal()"
    ></button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useStoreTodo } from '@/stores/storeTodo'

const storeTodo = useStoreTodo()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: () => { }
  },
  editNote: {
    type: Boolean,
    default: false
  }
})

const loading = ref(false)
const emit = defineEmits(['update:modelValue'], ['update:formData'], ['update:editNote'])

const simpleSchema = {
  task(value) {
    if (value && value.trim()) {
      return true;
    }
    return 'This is required';
  },
  priority(value) {
    if (value && value.trim()) {
      return true;
    }
    return 'This is required';
  }

}
const closeModal = () => {
  emit('update:formData', {
    id: '',
    task: '',
    priority: ''
  })
  emit('update:editNote', false)
  emit('update:modelValue', false)
}

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal()
}

const addOrEditNote = () => {
  loading.value = true
  if (simpleSchema.task(props.formData.task) !== true || simpleSchema.priority(props.formData.priority) !== true) {
    loading.value = false
    return
  }
  if (props.editNote) {
    emit('update:editNote', false)
    emit('update:modelValue', false)
    storeTodo.editNote(props.formData)
  } else {
    storeTodo.addNote({ ...props.formData, id: Date.now() })
    emit('update:editNote', false)
    emit('update:modelValue', false)
    emit('update:formData', {
      id: '',
      task: '',
      priority: ''
    })
  }
  loading.value = false
}
onMounted(() => {
  document.addEventListener('keyup', e => {
    handleKeyboard(e)
  })
})

onUnmounted(() => {
  document.removeEventListener('keyup', e => {
    handleKeyboard(e)
  })
})


</script>