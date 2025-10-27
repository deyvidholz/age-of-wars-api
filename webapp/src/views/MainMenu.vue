<template>
  <div class="h100 centralized-container">
    <div>
      <v-card color="grey darken-3" dark tile width="400px">
        <v-card-title class="justify-center display-1 red--text">
          <strong>Age of Wars</strong>
        </v-card-title>

        <v-divider />

        <v-card-text>
          <div class="d-flex flex-column">
            <v-btn tile color="blue-grey darken-1 mb-2" @click="newGame()">
              <v-icon class="mr-2" color="blue-grey darken-4">
                mdi-earth-box-plus
              </v-icon>
              New Game
            </v-btn>

            <v-btn tile color="blue-grey darken-1 mb-2" @click="loadGame()">
              <v-icon class="mr-2" color="blue-grey darken-4">
                mdi-content-save-move
              </v-icon>
              Load Game
            </v-btn>

            <v-btn tile color="blue-grey darken-1 mb-2" @click="joinGame()">
              <v-icon class="mr-2" color="blue-grey darken-4">
                mdi-earth-arrow-right
              </v-icon>
              Join Game
            </v-btn>

            <v-btn tile color="blue-grey darken-1 mb-2" @click="settings()">
              <v-icon class="mr-2" color="blue-grey darken-4"> mdi-cog </v-icon>
              Settings
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <div class="text-right blue-grey--text text--lighten-2 mr-3">
        <small @click="openGithub()" class="cursor-pointer">
          v2.1.0 (Alpha) - Created by Deyvid Holz
        </small>
      </div>
    </div>

    <NewGameDialog />
    <LoadGameDialog />
    <JoinGameDialog />
    <SettingsDialog />
  </div>
</template>

<script>
import NewGameDialog from "@/components/main-menu/NewGameDialog";
import LoadGameDialog from "@/components/main-menu/LoadGameDialog";
import JoinGameDialog from "@/components/main-menu/JoinGameDialog";
import SettingsDialog from "@/components/main-menu/SettingsDialog";

export default {
  components: {
    NewGameDialog,
    LoadGameDialog,
    JoinGameDialog,
    SettingsDialog,
  },

  data: () => ({}),

  computed: {
    hasInteracted() {
      return this.$store.state.hasInteracted;
    },
  },

  watch: {
    hasInteracted() {
      this.$store.state.audio.MAIN_THEME_1.play();
    },
  },

  methods: {
    openGithub() {
      window.open("https://github.com/deyvidholz");
    },
    newGame() {
      this.$store.state.mainMenu.dialogs.newGame.show = true;
    },
    loadGame() {
      this.$store.state.mainMenu.dialogs.loadGame.show = true;
    },
    joinGame() {
      this.$store.state.mainMenu.dialogs.joinGame.show = true;
    },
    settings() {
      this.$store.state.mainMenu.dialogs.settings.show = true;
    },
  },

  mounted() {
    if (this.hasInteracted) {
      this.$store.state.audio.MAIN_THEME_1.play();
    }
  },
};
</script>
