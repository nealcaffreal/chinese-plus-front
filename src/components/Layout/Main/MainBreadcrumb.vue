<template>
  <a-breadcrumb class="inline-block">
    <a-breadcrumb-item v-for="bread in breadcrumbList" :key="bread">
      {{ bread }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenu } from './composables/useMenu'

export default defineComponent({
  setup() {
    const { breadcrumbList } = useMenu()

    return {
      breadcrumbList,
    }
  },
})
</script>
