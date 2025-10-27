<template>
  <v-progress-linear indeterminate :color="color"></v-progress-linear>
</template>

<script>
export default {
  props: {
    color: {
      default: "white",
    },
  },
};
</script>
