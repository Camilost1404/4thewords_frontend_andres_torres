<template>
  <div>
    <div v-if="legends.length === 0" class="text-center text-gray-500">
      No hay leyendas disponibles.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <LegendCard
        @delete="onDelete"
        @update="onUpdate"
        v-for="legend in legends"
        :key="legend.id"
        :legend="legend"
      />
    </div>
  </div>
</template>

<script>
  import LegendCard from "@/components/LegendCard.vue";

  export default {
    components: { LegendCard },
    props: {
      legends: {
        type: Array,
        required: true,
      },
    },
    methods: {
      onDelete(id) {
        this.$emit("delete", id);
      },
      onUpdate(id) {
        this.$emit("update", id);
      },
    },
  };
</script>
