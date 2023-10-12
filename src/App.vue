<script setup>
import { useStoreTodo } from '@/stores/storeTodo'
import { RouterView } from 'vue-router'

const storeTodo = useStoreTodo()
storeTodo.init()

</script>

<template>
  <header class="is-flex">
    <div class="container">
      <div class="is-flex is-full is-justify-content-center is-align-items-center h-100">
        <h1 class="title-color">TODO LIST</h1>
      </div>
    </div>
  </header>
  <div class="is-max-desktop px-4 py-4">
    <RouterView />
  </div>
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>
