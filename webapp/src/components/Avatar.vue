<template>
  <div>
    <v-avatar :size="size" :tile="tile">
      <img :src="src" />
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      default: "https://cdn.vuetifyjs.com/images/john.jpg",
    },
    size: {
      default: "50",
    },
    tile: {
      default: false,
    },
  },
};
</script>
