<template>
  <v-btn
    class="next-turn"
    tile
    color="orange darken-2"
    dark
    v-if="$store.state.game.stage === 'RUNNING'"
    :disabled="$store.state.isRequesting || $store.state.alreadyPlayed"
    @click="nextTurn()"
  >
    <v-icon>
      mdi-chevron-right
    </v-icon>
    Next Turn
  </v-btn>
</template>

<script>
export default {
  methods: {
    clearActions() {
      this.$store.state.actions = [];
    },
    getActions() {
      return this.$store.state.actions.map((action) => action.action);
    },
    nextTurn() {
      this.$store.state.notifications = [];
      this.$store.state.isRequesting = true;
      this.$socket.client.emit("player:next-turn", {
        ...this.getBaseData(),
        actions: this.getActions(),
      });

      this.clearActions();
    },
  },
  sockets: {
    "country:get@province": (payload) => {
      console.log("getProvince", payload);
      this.$store.state.isRequesting = false;
    },
  },
};
</script>

<style></style>
