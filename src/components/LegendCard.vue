<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <img
      :src="legend.image"
      :alt="legend.title"
      class="w-full h-48 object-cover"
    />

    <div class="p-4 flex flex-col">
      <h3 class="text-xl font-bold mb-2">{{ legend.title }}</h3>
      <p class="text-gray-700 mb-4">{{ legend.description }}</p>

      <div class="space-y-1">
        <p class="text-sm text-gray-600">
          <strong>Categoría:</strong> {{ legend.category.name }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Provincia:</strong> {{ legend.district.canton.province.name }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Cantón:</strong> {{ legend.district.canton.name }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Distrito:</strong> {{ legend.district.name }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Fecha de creación:</strong> {{ formattedDate }}
        </p>
      </div>

      <div class="mt-4 flex justify-between">
        <button
          @click="onUpdate"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Actualizar
        </button>
        <button
          @click="onDelete"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <i class="mdi mdi-delete"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatRelativeDate } from "@/utils/dateUtils";

  export default {
    props: {
      legend: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isExpanded: false,
      };
    },
    computed: {
      formattedDate() {
        return formatRelativeDate(this.legend.created_at);
      },
      showReadMore() {
        const descriptionElement = this.$refs.description;
        return (
          descriptionElement &&
          descriptionElement.scrollHeight > descriptionElement.clientHeight
        );
      },
    },
    methods: {
      toggleExpand() {
        this.isExpanded = !this.isExpanded;
      },
      async onDelete() {
        const result = await this.$swal.fire({
          title: "¿Estás seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, bórralo",
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          this.$emit("delete", this.legend.id);
        }

      },
      onUpdate() {
        this.$emit("update", this.legend.id);
      },
    },
  };
</script>

<style scoped></style>
