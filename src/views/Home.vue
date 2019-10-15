<template>
  <div class="home">
    <ArticleList :editable="false"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('@/components/ArticleList.vue'),
  },
})
export default class Home extends Vue {}
</script>
