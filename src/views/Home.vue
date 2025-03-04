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
  import { ref, onMounted } from "vue";
  import { getLegends, deleteLegend } from "@/services/api";
  import Swal from "sweetalert2";
  import SearchBar from "@/components/SearchBar.vue";
  import FiltersSection from "@/components/FiltersSection.vue";
  import LegendList from "@/components/LegendList.vue";
  import { useRouter } from "vue-router";

  export default {
    components: { SearchBar, FiltersSection, LegendList },
    setup() {
      const legends = ref([]);
      const filteredLegends = ref([]);
      const filters = ref({});
      const router = useRouter();

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
        Object.keys(newFilters).forEach((key) => {
          if (newFilters[key] === "") {
            delete filters.value[key];
          } else {
            filters.value[key] = newFilters[key];
          }
        });
        fetchLegends();
      };

      const onUpdate = (id) => {
        router.push(`legend/${id}`);
      };

      const onDelete = (id) => {
        const response = deleteLegend(id);

        if (response) {
          // Si la respuesta es válida, muestra un mensaje de éxito
          Swal.fire({
            icon: "success",
            title: "¡Eliminado!",
            text: "La leyenda ha sido eliminada correctamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          fetchLegends(); // Recarga la lista de leyendas
        } else {
          // Si la respuesta es null, muestra un mensaje de error
          Swal.fire({
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
      };

      onMounted(fetchLegends);

      return { filteredLegends, handleSearch, handleFilter, onDelete, onUpdate};
    },
  };
</script>

<style></style>
