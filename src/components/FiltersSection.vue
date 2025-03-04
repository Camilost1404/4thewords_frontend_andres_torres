<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <!-- Select para categorias -->
    <SelectFilter
      v-model="selectedCategory"
      :options="categories"
      label="Categorías"
      @change="onCategoryChange"
    />

    <!-- Select para provincias -->
    <!-- <SelectFilter
      v-model="selectedProvince"
      :options="provinces"
      label="provincias"
      @change="onProvinceChange"
    /> -->

    <!-- Select para cantones -->
    <!-- <SelectFilter
      v-model="selectedCanton"
      :options="cantons"
      label="cantones"
      @change="onCantonChange"
    /> -->

    <!-- Select para distritos -->
    <!-- <SelectFilter
      v-model="selectedDistrict"
      :options="districts"
      label="distritos"
      @change="onDistrictChange"
    /> -->
  </div>
</template>

<script>
  import SelectFilter from "@/components/ui/SelectFilter.vue";
  import { getCategories } from "@/services/api";

  export default {
    components: {
      SelectFilter,
    },
    data() {
      return {
        selectedProvince: "",
        selectedCanton: "",
        selectedDistrict: "",
        selectedCategory: "",
        categories: [],
        provinces: [
          { id: 1, name: "Provincia 1" },
          { id: 2, name: "Provincia 2" },
        ],
        cantons: [
          { id: 1, name: "Cantón 1" },
          { id: 2, name: "Cantón 2" },
        ],
        districts: [
          { id: 1, name: "Distrito 1" },
          { id: 2, name: "Distrito 2" },
        ],
      };
    },
    methods: {
      async fetchCategories() {
        this.categories = await getCategories();
      },
      onCategoryChange(value) {
        this.$emit("filter", {
          category: value,
        });
      },
      onProvinceChange(value) {
        this.$emit("filter", {
          province: value,
        });
      },
      onCantonChange(value) {
        this.$emit("filter", {
          canton: value,
        });
      },
      onDistrictChange(value) {
        this.$emit("filter", {
          district: value,
        });
      },
    },
    async mounted() {
      await this.fetchCategories();
    },
  };
</script>
