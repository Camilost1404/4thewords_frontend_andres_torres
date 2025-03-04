<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      :src="legend.image"
      :alt="legend.title"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2">{{ legend.title }}</h3>
      <p class="text-gray-700 mb-4">{{ legend.description }}</p>
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
    computed: {
      formattedDate() {
        return formatRelativeDate(this.legend.created_at);
      },
    },
  };
</script>
