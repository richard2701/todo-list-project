<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <slot />
          <div class="has-text-centered py-4">
            <button
              class="button is-danger mr-2 delete-note-button"
              @click="$emit('delete-note')"
            >Delete</button>
            <button
              class="button is-primary"
              @click="$emit('update:modelValue', false)"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

</script>