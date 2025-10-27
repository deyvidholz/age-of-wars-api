<template>
  <div>
    <v-alert dense text type="info">
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
