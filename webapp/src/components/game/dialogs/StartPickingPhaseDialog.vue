<template>
  <v-dialog
    v-model="$store.state.dialogs.startPickingPhase.show"
    width="520"
    persistent
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <LinearLoading />

      <v-card-title>
        <v-icon color="yellow" class="mr-2">
          mdi-earth-arrow-right
        </v-icon>

        Waiting for players...
      </v-card-title>

      <v-divider></v-divider>

      <div class="pa-3 text-center">
        <h5>
          Multiplayer ID:
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span
                id="gameId"
                class="blue--text cursor-pointer"
                @click="copy()"
                @mouseleave="copyText = defaultCopyText"
                v-bind="attrs"
                v-on="on"
              >
                {{ $store.state.game.id }}
              </span>
            </template>
            <span>{{ copyText }}</span>
          </v-tooltip>
        </h5>
      </div>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <h2 class="text-center green--text text--accent-3 mb-3">
          Current Players
        </h2>
        <v-row class="justify-center">
          <v-col md="4" class="text-center">
            <v-icon color="orange">mdi-crown</v-icon>
            {{ $store.state.game.owner.nickname }}
          </v-col>

          <v-col
            md="4"
            class="text-center"
            v-for="player in $store.state.game.players"
            :key="player.id"
          >
            <v-icon color="green accent-3">mdi-account</v-icon>
            {{ player.nickname }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn
          :disabled="!canSubmit"
          color="blue"
          text
          @click="startPickingPhase()"
        >
          Start Picking Phase
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LinearLoading from "@/components/LinearLoading";
import { mapMutations } from "vuex";

export default {
  components: {
    LinearLoading,
  },

  data: () => ({
    defaultCopyText: "Click to copy",
    copyText: "Click to copy",
  }),

  computed: {
    canSubmit() {
      return !this.$store.state.isRequesting && this.isOwner;
    },
    isOwner() {
      return (
        this.$store.state.game.owner.id === localStorage.getItem("playerId")
      );
    },
  },

  methods: {
    ...mapMutations(["setupGameSave"]),

    copy() {
      const range = document.createRange();
      range.selectNode(document.getElementById("gameId"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      this.copyText = "Copied!";
    },
    startPickingPhase() {
      this.$store.state.isRequesting = true;
      this.$socket.client.emit("player:start-picking-phase", {
        ...this.getBaseData(),
      });

      return;

      this.http
        .get(`/games/start-picking-phase/${localStorage.getItem("gameId")}`)
        .then((res) => {
          localStorage.setItem("gameId", res.data.data.game.id);

          if (this.$route.name !== "Game") {
            this.$router.push({ name: "Game" });
          }

          this.$store.state.dialogs.startPickingPhase.show = false;
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
    console.log(this.$store.state.game);
  },
};
</script>
