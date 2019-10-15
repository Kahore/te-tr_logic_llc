<template>
  <div class="hello">
    <ArticleModal></ArticleModal>
    <ArticleSingle
      v-for="article in articles"
      :key="article.id"
      :article="article"
      :editable="editable"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import article from '@/store/modules/article';
import { Article } from '@/store/model.d.ts';
@Component({
  components: {
    ArticleSingle: () => import('@/components/ArticleSingle.vue'),
    ArticleModal: () => import('@/components/ArticleModal.vue'),
  },
})
export default class ArticleList extends Vue {
  @Prop() public editable?: boolean;
  public get articles(): Article[] {
    return article.getArticleList;
  }
}
</script>
