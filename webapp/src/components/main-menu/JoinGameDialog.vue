<template>
  <v-dialog
    v-model="$store.state.mainMenu.dialogs.joinGame.show"
    width="520"
    persistent
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="yellow accent-3" class="mr-2">
          mdi-earth-arrow-right
        </v-icon>

        Join Online Game
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4">
        <v-text-field
          v-model="fieldValues.gameId"
          label="Multiplayer ID"
          type="text"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              value &&
              value.match(
                /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
              )
                ? ruleValid('gameId')
                : ruleInvalid('gameId', 'Invalid ID'),
          ]"
        ></v-text-field>

        <v-text-field
          v-model="fieldValues.password"
          label="Password"
          type="password"
          hint="Leave this field empty if game does not have a password"
          dark
          clearable
          autocomplete="off"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="cancel()">
          Cancel
        </v-btn>

        <v-btn :disabled="!canSubmit" color="yellow" text @click="submit()">
          Join Game
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    fieldValues: {
      gameId: null,
      password: null,
    },
    validFields: {
      gameId: false,
    },
  }),

  computed: {
    canSubmit() {
      return this.validFields.gameId && !this.$store.state.isRequesting;
    },
  },

  methods: {
    clear() {
      this.fieldValues.gameId = null;
      this.fieldValues.password = null;
    },
    ruleValid(fieldName) {
      this.validFields[fieldName] = true;
      return true;
    },
    ruleInvalid(fieldName, text) {
      this.validFields[fieldName] = false;
      return text;
    },
    cancel() {
      this.$store.state.mainMenu.dialogs.joinGame.show = false;
      this.clear();
    },
    submit() {
      const payload = {
        ...this.getBaseData(),
        gameId: this.fieldValues.gameId,
        password: this.fieldValues.password,
      };

      this.$store.state.isRequesting = true;
      this.$socket.client.emit("player:join-game", payload);

      // this.http
      //   .post("/players/join-game", payload)
      //   .then((res) => {
      //     localStorage.setItem("gameId", res.data.data.game.id);
      //     this.$router.push({ name: "Game" });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.$store.state.dialogs.info.title = err.response.data.message;
      //     this.$store.state.dialogs.info.isError = true;
      //     this.$store.state.dialogs.info.show = true;
      //   });
    },
  },
  sockets: {
    "player:join-game"(payload) {
      this.$store.state.isRequesting = false;
      localStorage.setItem("gameId", payload.game.id);
      this.$router.push({ name: "Game" });
    },
  },
};
</script>
