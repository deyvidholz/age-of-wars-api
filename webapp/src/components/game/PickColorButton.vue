<template>
  <v-btn
    class="pick-color"
    tile
    :style="`background: ${$store.state.colorToBePicked || '#333'}`"
    dark
    v-if="$store.state.game.stage === 'PICKING_PHASE'"
    :disabled="
      $store.state.isRequesting ||
        $store.state.alreadyPlayed ||
        !$store.state.province.country.id
    "
    @click="pickColor()"
  >
    <v-icon
      class="mr-1"
      :style="`color: ${$store.state.province.country.color || '#fff'}`"
    >
      mdi-palette
    </v-icon>
    Pick Color
  </v-btn>
</template>

<script>
export default {
  methods: {
    pickColor() {
      this.$store.state.colorTargetId = this.$store.state.province.country.id;
      this.$store.state.colorToBePicked = this.$store.state.province.country.color;
    },
  },
};
</script>

<style></style>
