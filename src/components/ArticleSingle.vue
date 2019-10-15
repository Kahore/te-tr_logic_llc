<template>
  <div class="blog-post">
    <h3 class="blog-post-title"> {{article.title}} </h3>
    <p class="blog-post-meta">{{dateReformat(article.createdAt)}} by <strong>{{article.author}}</strong></p>
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
    EventBus.$emit('MODAL_CALL', articleId);
  }
  /**
   * deleteAction
   */
  public deleteAction(articleId: string) {
    EventBus.$emit('MODAL_DELETE', articleId);
  }
  private dateReformat(createdAt: Date) {
    const date = new Date(createdAt);
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    const mnth = monthNames[date.getMonth()];
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const hours =  String(today.getHours()).padStart(2, '0');
    if (hh === hours) {
      return 'Нескольно минут назад';
    }
    if (dd === day && hh !== hours) {
      return 'Нескольно часов назад';
    }
    return mnth + ' ' + dd;
  }
}
</script>

<style scoped>

</style>