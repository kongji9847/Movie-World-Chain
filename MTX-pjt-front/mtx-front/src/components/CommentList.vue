<template>
  <div class="comment-list">
    <ul>
      <comment-list-item 
        v-for="(comment) in comments"
        :comment="comment"
        :key="comment.pk" v-show="comment">
      </comment-list-item>
    </ul>

    <comment-list-form></comment-list-form>
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem.vue'
import CommentListForm from '@/components/CommentListForm.vue'

  export default {
    name: 'CommentList',
    components: { CommentListItem, CommentListForm },
    computed: {
      reviewPk: function () { return this.$route.params.reviewPk},
    },
    props: { comments: Array },
  }
</script>

<style>

</style>