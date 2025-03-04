<template>
  <v-select
    :options="options"
    :reduce="(option) => option.id"
    label="name"
    v-model="selectedValue"
    :placeholder="placeholder"
    :searchable="true"
  ></v-select>
</template>

<script>
  import vSelect from "vue-select";
  export default {
    components: {
      vSelect
    },
    props: {
      options: {
        type: Array,
        required: true,
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
      placeholder: {
        type: String,
        default: "Seleccione una opción",
      },
    },
    emits: ["update:modelValue"],
    computed: {
      selectedValue: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit("update:modelValue", value);
        },
      },
    },
  };
</script>

<style>
  @import "vue-select/dist/vue-select.css";
</style>
