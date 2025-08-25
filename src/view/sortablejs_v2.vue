<script setup lang="ts">
import {ref, useTemplateRef} from "vue";
import VueSortable from "@/components/VueSortable.vue";

const sortableRef = useTemplateRef('sortableRef');

const list = ref([
  {name: '张三', id: 1},
  {name: '李四', id: 2},
  {name: '王五', id: 3},
  {name: '老张', id: 4},
]);


// 5 秒后移除拖拽事件
setTimeout(() => {
  sortableRef.value?.data?.destroy();
}, 5000);
</script>

<template>
  <div style="display: flex; gap: 10px">
    <VueSortable ref="sortableRef" v-model="list">
      <template v-slot="{ data }">
        <li v-for="(item, index) in list" :key="index">
          <el-button type="primary" block>{{ item.name }}</el-button>
        </li>
      </template>
    </VueSortable>
    <pre>{{ JSON.stringify(list, null, 2) }}</pre>
  </div>
</template>

<style scoped>

</style>