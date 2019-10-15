<template>
  <div class="container">
    <button class="btn btn-primary" @click="modalCall">Добавить</button>
    <ArticleList :editable="true"></ArticleList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EventBus } from '@/EventBus.ts';
@Component({
  components: {
    ArticleList: () => import('@/components/ArticleList.vue'),
  },
})
export default class ArticleEditor extends Vue {
  /**
   * modalCall
   */
  public modalCall() {
    EventBus.$emit('MODAL_CALL');
  }
}
</script>
