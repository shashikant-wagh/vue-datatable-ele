<script>
import { defineComponent } from 'vue';
import VueDatatableEle from '@/vue-datatable-ele.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueDatatableEle
  }
});
</script>

<template>
  <div id="app">
    <vue-datatable-ele />
  </div>
</template>
