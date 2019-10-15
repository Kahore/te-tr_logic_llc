<template>
  <div class="blog-post">
    <h3 class="blog-post-title"> {{article.title}} </h3>
    <p class="blog-post-meta">{{article.createdAt}} by <a href="#">{{article.author}}</a></p>
    <p>{{article.body}}</p>
    <div v-if="editable">
      <button class="btn btn-secondary" @click="editAction(article.id)">Изменить</button>
      <button class="btn btn-warning" @click="deleteAction(article.id)">Удалить</button>
    </div>
  </div><!-- /.blog-post -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Article } from '@/store/model.d.ts';
import { EventBus } from '@/EventBus.ts';
@Component
export default class ArticleSingle extends Vue {
  @Prop() public article?: Article;
  @Prop() public editable?: boolean;
  /**
   * editAction
   */
  public editAction(articleId: string) {
    /* * */
  }
  /**
   * deleteAction
   */
  public deleteAction(articleId: string) {
    EventBus.$emit('MODAL_DELETE', articleId);
  }
}
</script>

<style scoped>

</style>