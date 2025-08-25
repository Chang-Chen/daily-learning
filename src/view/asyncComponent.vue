<script setup lang="ts">
import {h} from "vue";
import {defineAsyncComponent} from "@/use/useAsyncComponent.ts";

const Comp = defineAsyncComponent({
  loader: () => {
    return new Promise((resolve, reject) => {
      import('./demo/HelloWorld.vue').then(comp => {
        console.log('comp ===> ', comp);
        setTimeout(() => {
          // reject('失败了');
          resolve(comp);
        }, 2000)
      })
    });
  },
  loadingComponent: () => h('span', '正在加载中，请稍后...'),
  errorComponent: () => h('span', '加载远程组件发生错误！'),
  // timeout: 3000
});
</script>

<template>
  <Comp></Comp>
</template>

<style scoped>

</style>