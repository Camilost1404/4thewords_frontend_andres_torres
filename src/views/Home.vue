<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Leyendas</h1>
    <SearchBar @search="handleSearch" class="mb-6" />
    <FiltersSection @filter="handleFilter" class="mb-6" />
    <LegendList :legends="filteredLegends" />
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import { getLegends } from "@/services/api";
  import SearchBar from "@/components/SearchBar.vue";
  import FiltersSection from "@/components/FiltersSection.vue";
  import LegendList from "@/components/LegendList.vue";

  export default {
    components: { SearchBar, FiltersSection, LegendList },
    setup() {
      const legends = ref([]);
      const filteredLegends = ref([]);
      const filters = ref({});

      const fetchLegends = async () => {
        legends.value = await getLegends(filters.value);
        filteredLegends.value = legends.value;
      };

      const handleSearch = (query) => {
        if (query && query.trim()) {
          filters.value.title = query;
        } else {
          delete filters.value.title;
        }
        fetchLegends();
      };

      const handleFilter = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters };
        fetchLegends();
      };

      onMounted(fetchLegends);

      return { filteredLegends, handleSearch, handleFilter };
    },
  };
</script>

<style></style>
