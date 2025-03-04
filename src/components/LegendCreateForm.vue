<template>
  <form class="space-y-4">
    <!-- Previsualización de imagen -->
    <div>
      <label for="image" class="block text-sm font-medium text-gray-700"
        >Imagen</label
      >
      <div class="mt-2 flex flex-col space-y-2">
        <div
          v-if="imagePreview || form.image"
          class="w-full h-48 bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            :src="
              imagePreview || (typeof form.image === 'string' ? form.image : '')
            "
            alt="Previsualización de imagen"
            class="w-full h-full object-cover"
          />
        </div>
        <input
          type="file"
          id="image"
          @change="handleImageUpload"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
        <div v-if="errors.image" class="text-red-500 text-sm">
          {{ errors.image }}
        </div>
      </div>
    </div>

    <div>
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Título</label
      >
      <input
        v-model="form.title"
        type="text"
        id="title"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.title" class="text-red-500 text-sm">
        {{ errors.title }}
      </div>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Descripción</label
      >
      <textarea
        v-model="form.description"
        id="description"
        rows="4"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div v-if="errors.description" class="text-red-500 text-sm">
        {{ errors.description }}
      </div>
    </div>

    <div>
      <label for="category" class="block text-sm font-medium text-gray-700"
        >Categoría</label
      >
      <SelectForm
        :options="categories"
        v-model="form.category"
        placeholder="Seleccione una categoría"
      />
      <div v-if="errors.category" class="text-red-500 text-sm">
        {{ errors.category }}
      </div>
    </div>

    <div>
      <label for="province" class="block text-sm font-medium text-gray-700"
        >Provincia</label
      >
      <SelectForm
        :options="provinces"
        v-model="form.province"
        @update:modelValue="fetchCantons"
        placeholder="Seleccione una provincia"
      />
      <div v-if="errors.province" class="text-red-500 text-sm">
        {{ errors.province }}
      </div>
    </div>

    <div>
      <label for="canton" class="block text-sm font-medium text-gray-700"
        >Cantón</label
      >
      <SelectForm
        :options="cantons"
        v-model="form.canton"
        @update:modelValue="fetchDistricts"
        placeholder="Seleccione un cantón"
        :disabled="!form.province"
      />
      <div v-if="errors.canton" class="text-red-500 text-sm">
        {{ errors.canton }}
      </div>
    </div>

    <div>
      <label for="district" class="block text-sm font-medium text-gray-700"
        >Distrito</label
      >
      <SelectForm
        :options="districts"
        v-model="form.district"
        placeholder="Seleccione un distrito"
        :disabled="!form.canton"
      />
      <div v-if="errors.district" class="text-red-500 text-sm">
        {{ errors.district }}
      </div>
    </div>

    <div>
      <label for="date" class="block text-sm font-medium text-gray-700"
        >Fecha de la leyenda</label
      >
      <input
        v-model="form.date"
        type="date"
        id="date"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.date" class="text-red-500 text-sm">
        {{ errors.date }}
      </div>
    </div>

    <div>
      <button
        type="button"
        @click="validateAndSubmit"
        class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Creando..." : "Crear" }}
      </button>
    </div>
  </form>
</template>

<script>
  import { getCategories, getProvinces } from "@/services/api";
  import SelectForm from "@/components/ui/SelectForm.vue";

  export default {
    components: { SelectForm },
    data() {
      return {
        form: {
          title: null,
          description: null,
          category: null,
          province: null,
          canton: null,
          district: null,
        },
        imagePreview: null,
        imageFile: null,
        categories: [],
        provinces: [],
        cantons: [],
        districts: [],
        errors: {
          title: "",
          description: "",
          category: "",
          province: "",
          canton: "",
          district: "",
          image: "",
          date: "",
        },
        isSubmitting: false,
      };
    },
    methods: {
      async fetchCategories() {
        try {
          this.categories = await getCategories();
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },

      async fetchProvinces() {
        try {
          this.provinces = await getProvinces();
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      },

      fetchCantons(provinceId) {
        const selectedProvince = this.provinces.find(
          (p) => p.id === provinceId
        );
        this.cantons = selectedProvince ? selectedProvince.cantones : [];
        if (!this.cantons.find((c) => c.id === this.form.canton)) {
          this.form.canton = "";
          this.form.district = "";
          this.districts = [];
        }
      },

      fetchDistricts(cantonId) {
        const selectedCanton = this.cantons.find((c) => c.id === cantonId);
        this.districts = selectedCanton ? selectedCanton.districts : [];
        if (!this.districts.find((d) => d.id === this.form.district)) {
          this.form.district = "";
        }
      },

      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.createImagePreview(file);
        }
      },

      createImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      },

      validateForm() {
        let isValid = true;
        this.errors = {
          title: "",
          description: "",
          category: "",
          province: "",
          canton: "",
          district: "",
          image: "",
          date: "",
        };

        if (!this.form.title || this.form.title.trim() === "") {
          this.errors.title = "El título es obligatorio";
          isValid = false;
        }

        if (!this.form.description || this.form.description.trim() === "") {
          this.errors.description = "La descripción es obligatoria";
          isValid = false;
        }

        if (!this.form.category) {
          this.errors.category = "Debe seleccionar una categoría";
          isValid = false;
        }

        if (!this.form.province) {
          this.errors.province = "Debe seleccionar una provincia";
          isValid = false;
        }

        if (!this.form.canton) {
          this.errors.canton = "Debe seleccionar un cantón";
          isValid = false;
        }

        if (!this.form.district) {
          this.errors.district = "Debe seleccionar un distrito";
          isValid = false;
        }

        if (!this.imageFile) {
          this.errors.image = "La imagen es obligatoria";
          isValid = false;
        }

        if (!this.form.date) {
          this.errors.date = "La fecha es obligatoria";
          isValid = false;
        }

        return isValid;
      },

      validateAndSubmit() {
        this.isSubmitting = true;
        if (this.validateForm()) {
          const formData = new FormData();
          formData.append("title", this.form.title);
          formData.append("description", this.form.description);
          formData.append("categoryId", this.form.category);
          formData.append("provinceId", this.form.province);
          formData.append("cantonId", this.form.canton);
          formData.append("districtId", this.form.district);
          formData.append("date", this.form.date);
          if (this.imageFile) {
            formData.append("image", this.imageFile);
          }

          this.$emit("submit", formData);
        }
        this.isSubmitting = false;
      },
    },
    async mounted() {
      this.fetchCategories();
      await this.fetchProvinces();
    },
  };
</script>

<style></style>
