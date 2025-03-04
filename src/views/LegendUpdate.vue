<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Actualizar Leyenda</h1>
    <LegendUpdateForm
      v-if="legend"
      :legend="legend"
      @submit="handleSubmit"
      class="max-w-lg mx-auto"
    />
    <p v-else class="text-center text-gray-600">Cargando...</p>
  </div>
</template>

<script>
  import { getLegendById, updateLegend } from "@/services/api";
  import LegendUpdateForm from "@/components/LegendUpdateForm.vue";

  export default {
    components: { LegendUpdateForm },
    data() {
      return {
        legend: null,
      };
    },
    methods: {
      async fetchLegend() {
        const id = this.$route.params.id;
        this.legend = await getLegendById(id);

        if (!this.legend) {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo cargar la leyenda.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.$router.push("/");
        }
      },

      async handleSubmit(updatedData) {
        const id = this.$route.params.id;
        const response = await updateLegend(id, updatedData);
        if (response) {
          this.$swal.fire({
            icon: "success",
            title: "¡Actualizado!",
            text: "La leyenda ha sido actualizada correctamente.",
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
            text: "No se pudo actualizar la leyenda.",
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
      this.fetchLegend();
    },
  };
</script>

<style></style>
