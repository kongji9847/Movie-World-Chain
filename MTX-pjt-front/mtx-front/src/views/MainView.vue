<template>
  <div>
    <general-search-bar></general-search-bar>
    <general-search-result v-show="searchResults.length > 0" class="my-5"></general-search-result>
    <h2 class="mb-4 mt-5">현재 상영작</h2>
    <movie-list :movies="nowPlayingMovies" class="mb-5"></movie-list>
    <h2 class="my-4">개봉 예정작</h2>
    <movie-list :movies="upComingMovies" class="mb-5"></movie-list>
    <h2 class="my-4">고전 명작</h2>
    <movie-list :movies="topRatedMovies" class="mb-5"></movie-list>
    <h2 class="my-4">닥터 스트레인지와 비슷한 영화</h2>
    <movie-list :movies="similarMovies" class="mb-5"></movie-list>

    
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import GeneralSearchBar from '@/components/GeneralSearchBar.vue'
import GeneralSearchResult from '@/components/GeneralSearchResult.vue'
import MovieList from  '@/components/MovieList.vue'

export default {
  name: 'MainView',
  components: {GeneralSearchBar, GeneralSearchResult, MovieList},
  computed: {
      ...mapGetters(['searchResults', 'topRatedMovies', 'nowPlayingMovies', 'upComingMovies', 'similarMovies'])
    },
  methods: {
      ...mapActions(['removeSearchHistory'])
    },
  beforeCreate() {
    this.$store.dispatch('topRatedMoviesAPI')
    this.$store.dispatch('nowPlayingMoviesAPI')
    this.$store.dispatch('upComingMoviesAPI')
  },
  created() {
      this.$store.dispatch('setUrl', 'main')
      this.$store.dispatch('removeSearchHistory')
      this.$store.dispatch('similarMoviesAPI', 453395)
    }
}
</script>

<style>

</style>