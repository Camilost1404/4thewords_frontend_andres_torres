<template>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Buscar por título..."
    @input="onSearch"
    class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</template>

<script>
  export default {
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      onSearch() {
        this.$emit("search", this.searchQuery);
      },
    },
  };
</script>
