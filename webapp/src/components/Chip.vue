<template>
  <v-chip
    class="ma-2"
    :color="color"
    label
    :text-color="textColor"
    :x-small="small"
  >
    <v-icon v-if="icon" left>
      {{ icon }}
    </v-icon>
    {{ title }}
  </v-chip>
</template>

<script>
export default {
  props: {
    color: {
      default: "red darken-2",
    },
    textColor: {
      default: "white",
    },
    icon: {
      default: "mdi-label",
    },
    title: {
      default: null,
    },
    small: {
      default: false,
    },
  },

  data: () => ({}),
};
</script>
