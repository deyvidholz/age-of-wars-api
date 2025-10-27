<template>
  <div>
    <v-alert dense text type="error">
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: "{TEXT}",
    },
  },
};
</script>
