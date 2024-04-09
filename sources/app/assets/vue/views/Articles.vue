<template>
  <div>
    <div class="row col">
      <h1>Articles</h1>
    </div>

    <div
        v-if="canCreateArticle"
        class="row col"
    >
      <form>
        <div class="form-row">
          <div class="col-8">
            <input
                v-model="publicatin_date"
                type="date"
                class="form-control"
            >
          </div>
          <div class="col-8">
            <input
                v-model="title"
                type="string"
                class="form-control"
            >
          </div>
          <div class="col-8">
            <input
                v-model="description"
                type="text"
                class="form-control"
            >
          </div>
          <div class="col-4">
            <button
                :disabled="publication_date.length === 0 || isLoading"disabled="title.length === 0 || isLoading" disabled="description.length === 0 || isLoading"
                type="button"
                class="btn btn-primary"
                @click="createArticle()"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>

    <div
        v-if="isLoading"
        class="row col"
    >
      <p>Loading...</p>
    </div>

    <div
        v-else-if="hasError"
        class="row col"
    >
      <error-message :error="error"/>
    </div>

    <div
        v-else-if="!hasArticles"
        class="row col"
    >
      No articles!
    </div>

    <div
        v-for="article in articles"
        v-else
        :key="article.id"
        class="row col"
    >
      <article :publication_date="article.message"/>
      <article :title="article.message"/>
      <article :decription="article.message"/>
    </div>
  </div>
</template>

<script>
import Article from "../components/Article";
import ErrorMessage from "../components/ErrorMessage";

export default {
  name: "Articles",
  components: {
    Article,
    ErrorMessage
  },
  data() {
    return {
      publication_date: "",
      title: "",
      description: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["article/isLoading"];
    },
    hasError() {
      return this.$store.getters["article/hasError"];
    },
    error() {
      return this.$store.getters["article/error"];
    },
    hasArticles() {
      return this.$store.getters["article/hasArticles"];
    },
    articles() {
      return this.$store.getters["article/articles"];
    },
    canCreateArticle() {
      return this.$store.getters["security/hasRole"]("ROLE_FOO");
    }
  },
  created() {
    this.$store.dispatch("article/findAll");
  },
  methods: {
    async createArticle() {
      const result = await this.$store.dispatch("article/create", this.$data.publication_date, this.$data.title, this.$data.description);
      if (result !== null) {
        this.$data.publication_date = "";
        this.$data.title = "";
        this.$data.description = "";
      }
    }
  }
};
</script>
