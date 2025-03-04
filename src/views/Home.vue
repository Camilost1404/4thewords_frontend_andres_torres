<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Leyendas</h1>
    <SearchBar @search="handleSearch" class="mb-6" />
    <FiltersSection @filter="handleFilter" class="mb-6" />
    <LegendList
      @delete="onDelete"
      @update="onUpdate"
      :legends="filteredLegends"
    />
  </div>
</template>

<script>
  import { getLegends, deleteLegend } from "@/services/api";
  import SearchBar from "@/components/SearchBar.vue";
  import FiltersSection from "@/components/FiltersSection.vue";
  import LegendList from "@/components/LegendList.vue";

  export default {
    components: { SearchBar, FiltersSection, LegendList },
    data() {
      return {
        legends: [],
        filteredLegends: [],
        filters: {},
      };
    },
    methods: {
      async fetchLegends() {
        this.legends = await getLegends(this.filters);
        this.filteredLegends = this.legends;
      },
      handleSearch(query) {
        if (query && query.trim()) {
          this.filters.title = query;
        } else {
          delete this.filters.title;
        }
        this.fetchLegends();
      },
      handleFilter(newFilters) {
        Object.keys(newFilters).forEach((key) => {
          if (newFilters[key] === "") {
            delete this.filters[key];
          } else {
            this.filters[key] = newFilters[key];
          }
        });
        this.fetchLegends();
      },
      onUpdate(id) {
        this.$router.push(`legend/${id}`);
      },
      async onDelete(id) {
        const response = await deleteLegend(id);

        if (response) {
          this.$swal.fire({
            icon: "success",
            title: "¡Eliminado!",
            text: "La leyenda ha sido eliminada correctamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.fetchLegends();
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar la leyenda.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
    },
    mounted() {
      this.fetchLegends();
    },
  };
</script>

<style></style>
