<template>
  <v-dialog v-model="$store.state.mainMenu.dialogs.loadGame.show" width="520">
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="blue lighten-1" class="mr-2">
          mdi-content-save-move
        </v-icon>

        Load Game
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4">
        <v-select
          v-model="fieldValues.gameId"
          label="Select save"
          :items="games"
          item-text="name"
          item-value="id"
          :disabled="$store.state.isRequesting"
        />

        <div class="orange--text" v-if="gameId">
          <span>
            Multiplayer ID:
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span class="white--text">
                  <strong
                    id="gameId"
                    @click="copy()"
                    @mouseleave="copyText = defaultCopyText"
                    class="cursor-pointer"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ gameId }}
                  </strong>
                </span>
              </template>
              <span>{{ copyText }}</span>
            </v-tooltip>
          </span>
          <br />
          <span>
            Remaining countries:
            <span class="white--text">
              <strong>{{ remaningCountries }}</strong>
            </span>
          </span>
          <br />
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-space-between">
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!canSubmit"
                color="red darken-1"
                text
                @click="deleteGame()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>

        <div>
          <v-btn color="red" text @click="cancel()">
            Close
          </v-btn>

          <v-btn
            :disabled="!canSubmit"
            color="blue accent-3"
            text
            @click="submit()"
          >
            Load
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    defaultCopyText: "Click to copy",
    copyText: "Click to copy",
    remaningCountries: 0,
    gameName: null,
    gameId: null,
    fieldValues: {
      gameId: null,
    },
    games: [],
  }),

  computed: {
    isShowing() {
      return this.$store.state.mainMenu.dialogs.loadGame.show;
    },
    selectedGameId() {
      return this.fieldValues.gameId;
    },
    canSubmit() {
      return (
        this.games.length &&
        this.fieldValues.gameId &&
        !this.$store.state.isRequesting
      );
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        return;
      }

      this.getGames();
    },
    selectedGameId(newValue) {
      const game = this.games.find((game) => game.id === newValue);

      if (game) {
        this.remaningCountries = game.countries.length;
        this.gameName = game.name;
        this.gameId = game.id;
        return;
      }

      this.remaningCountries = 0;
      this.gameName = null;
      this.gameId = null;

      this.$store.state.dialogs.info.title = "Game not found";
      this.$store.state.dialogs.info.isError = true;
      this.$store.state.dialogs.info.show = true;
    },
  },

  methods: {
    copy() {
      const range = document.createRange();
      range.selectNode(document.getElementById("gameId"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      this.copyText = "Copied!";
    },
    getGames() {
      this.http("/games?simplified")
        .then((res) => {
          this.games = res.data.data.games.map((game) => {
            game.name = `${game.name} | Stg: ${game.stageCount}`;
            return game;
          });
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
    deleteGame() {
      this.$store.state.dialogs.info.handler = () => {
        this.http
          .delete(`/games/${this.fieldValues.gameId}`)
          .then(() => this.getGames())
          .catch((err) => {
            console.log(err);
            this.$store.state.dialogs.info.title = err.response.data.message;
            this.$store.state.dialogs.info.isError = true;
            this.$store.state.dialogs.info.show = true;
          });
      };

      this.$store.state.dialogs.info.title = `Delete game confirmation`;
      this.$store.state.dialogs.info.description = `Are you sure you want to delete game ${this.gameName}?`;
      this.$store.state.dialogs.info.show = true;
    },
    cancel() {
      this.$store.state.mainMenu.dialogs.loadGame.show = false;
      this.fieldValues.game = null;
    },
    submit() {
      this.http
        .get(`/games/start/${this.fieldValues.gameId}`)
        .then((res) => {
          localStorage.setItem("gameId", res.data.data.game.id);
          this.$router.push({ name: "Game" });
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
  },

  mounted() {
    this.getGames();
  },
};
</script>
