<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <select
      v-model="selectedCategory"
      @change="onFilterChange"
      class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Todas las categorías</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedCategory: "",
        categories: [],
      };
    },
    methods: {
      onFilterChange() {
        this.$emit("filter", {
          category: this.selectedCategory,
        });
      },
    },
  };
</script>
