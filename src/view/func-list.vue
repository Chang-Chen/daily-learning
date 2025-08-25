<script setup lang="ts">
import {ref} from "vue";

const funcList = ref([
  {
    title: '封装-useSortable',
    routePath: '/useSortable_v1',
  },
  {
    title: '无渲染组件版本-useSortable',
    routePath: '/useSortable_v2',
  }
]);
</script>

<template>
  <el-space :size="20" :direction="'vertical'" :alignment="'start'">
    <RouterLink v-for="(item, index) in funcList" :key="index" :to="item.routePath">
      <el-button type="primary" block>{{ item.title ?? '' }}</el-button>
    </RouterLink>
  </el-space>
</template>

<style scoped>

</style>