<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <LegendCard v-for="legend in legends" :key="legend.id" :legend="legend" />
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
  };
</script>
