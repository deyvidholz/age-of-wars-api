<template>
  <v-btn
    v-if="$store.state.game.stage === 'PICKING_PHASE'"
    class="next-turn"
    color="red darken-2"
    tile
    dark
    :disabled="!canSubmit"
    @click="pickCountry()"
  >
    <v-icon>
      mdi-chevron-right
    </v-icon>

    <span class="mr-3">Pick</span>

    <v-img
      :src="
        $store.state.province.country.flag
          ? `${$store.state.defaultCountryFlagPath}/${$store.state.province.country.flag}`
          : $store.state.defaultCountryFlag
      "
      class="mr-1 flag-bordered"
      width="36"
    ></v-img>

    {{ $store.state.province.country.name }}
  </v-btn>
</template>

<script>
export default {
  data: () => ({
    alreadyPicked: false,
  }),

  computed: {
    canSubmit() {
      return (
        this.$store.state.province.country.id &&
        this.$store.state.province.country.isAi &&
        !this.$store.state.alreadyPicked &&
        !this.$store.state.isRequesting &&
        !this.$store.state.isRequestingProvince
      );
    },
  },

  methods: {
    pickCountry() {
      this.$store.state.isRequesting = true;
      this.$socket.client.emit("player:pick-country", {
        ...this.getBaseData(),
        countryId: this.$store.state.province.country.id,
        targetId: this.$store.state.colorTargetId,
      });
    },
  },
};
</script>

<style></style>
