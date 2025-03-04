<template>
  <select
    v-model="selectedValue"
    @change="onChange"
    class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Todas las {{ label }}</option>
    <option v-for="item in options" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
    },
    emits: ["update:modelValue", "change"],
    data() {
      return {
        selectedValue: this.modelValue,
      };
    },
    watch: {
      modelValue(newValue) {
        this.selectedValue = newValue;
      },
    },
    methods: {
      onChange() {
        this.$emit("update:modelValue", this.selectedValue);
        this.$emit("change", this.selectedValue);
      },
    },
  };
</script>
