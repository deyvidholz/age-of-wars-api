<template>
  <v-progress-circular indeterminate :color="color"></v-progress-circular>
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
