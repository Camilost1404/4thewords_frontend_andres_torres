<template>
  <div class="container mx-auto p-4 relative">
    <button
      @click="$router.push('/')"
      class="absolute left-4 top-4 hover:bg-gray-300 text-gray-700 rounded-full p-2"
    >
      <i class="mdi mdi-arrow-left"></i>
    </button>
    <h1 class="text-3xl font-bold mb-6 text-center">Crear Leyenda</h1>
    <LegendCreateForm @submit="handleSubmit" class="max-w-lg mx-auto" />
  </div>
</template>

<script>
  import { createLegend } from "@/services/api";
  import LegendCreateForm from "@/components/LegendCreateForm.vue";

  export default {
    components: { LegendCreateForm },
    methods: {
      async handleSubmit(updatedData) {
        console.log(updatedData);
        const id = this.$route.params.id;
        const response = await createLegend(updatedData);
        if (response) {
          this.$swal.fire({
            icon: "success",
            title: "¡Creado!",
            text: "La leyenda ha creado correctamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.$router.push("/");
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear la leyenda.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      },
    },
  };
</script>

<style></style>
