<template>
  <div>
    <general-search-bar v-show="isMovieChoicedToReview===false"></general-search-bar>
    <search-results v-show="searchResults.length > 0" class="my-5"></search-results>
    <review-form :review="review" action="create" class="mt-5"></review-form>
  </div>
</template>

<script>
import ReviewForm from '@/components/ReviewForm.vue'
import GeneralSearchBar from '@/components/GeneralSearchBar.vue'
import SearchResults from '@/components/SearchResults.vue'

import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'ReviewNewView',
    components: { ReviewForm, GeneralSearchBar, SearchResults },
    data() {
      return {
        review: {
          pk: this.moviePk,
          title: '',
          content: '',
        }
      }
    },
    computed: {
      ...mapGetters(['searchResults', 'moviePk','isMovieChoicedToReview' ])
    },
    methods: {
      ...mapActions(['removeSearchHistory'])
    },
    created() {
      this.$store.dispatch('removeSearchHistory')
      this.$store.dispatch('setUrl', 'chain')
    },
  }
</script>

<style>

</style>