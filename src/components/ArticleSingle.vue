<template>
  <div class="blog-post">
    <h3 class="blog-post-title"> {{article.title}} </h3>
    <p class="blog-post-meta">{{article.createdAt}} by <a href="#">{{article.author}}</a></p>
    <p>{{article.body}}</p>
    <div v-if="editable">
      <button>1</button>
      <button>1</button>
      <button>1</button>
    </div>
  </div><!-- /.blog-post -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Article } from '@/store/model.d.ts';
@Component
export default class ArticleSingle extends Vue {
  @Prop() public article?: Article;
  @Prop() public editable?: boolean;
}
</script>

<style scoped>

</style>