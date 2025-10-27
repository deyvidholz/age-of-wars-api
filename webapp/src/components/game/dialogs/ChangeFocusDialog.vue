<template>
  <v-dialog v-model="$store.state.dialogs.changeFocus.show" width="1000">
    <v-card color="grey darken-3" dark scrollable>
      <v-card-title>
        <v-icon color="deep-purple lighten-2" class="mr-2">
          mdi-adjust
        </v-icon>

        Change Focus
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <v-row class="justify-center">
          <v-col
            md="3"
            v-for="focus in focuses"
            :key="focus.type"
            :class="
              `d-flex flex-column align-center cursor-pointer no-selection ${
                selectedFocus === focus.type ? 'selected-focus' : ''
              }`
            "
            @click="selectedFocus = focus.type"
            @dblclick="
              selectedFocus = focus.type;
              setAction();
            "
          >
            <v-icon size="64px" :style="`color: ${focus.color}`">
              {{ focus.icon }}
            </v-icon>

            <h3>{{ focus.name }}</h3>

            <div class="w100 py-1">
              <v-divider />
            </div>

            <ul v-if="focus.passives && focus.passives.length">
              <li v-for="(passive, index) in focus.passives" :key="index">
                {{ passive.description }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-space-between">
        <div class="blue-grey--text text--lighten-1">
          Click on a focus to select
        </div>

        <div>
          <v-btn color="red" text @click="close()">
            Close
          </v-btn>

          <v-btn color="blue" text @click="setAction()" :disabled="!canSubmit">
            Change Focus
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    selectedFocus: null,
    allowChangeFocusEveryStage: 20,
    focuses: [],
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.changeFocus.show;
    },
    canSubmit() {
      if (
        !this.$store.state.game.id ||
        this.$store.state.game.stageCount <= 3
      ) {
        return true;
      }

      return (
        this.$store.state.game.stageCount % this.allowChangeFocusEveryStage ===
        0
      );
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        return;
      }

      this.getFocuses();
    },
  },

  methods: {
    clear() {
      this.selectedFocus = null;
      this.allowChangeFocusEveryStage = 20;
      this.focuses = [];
    },
    close() {
      this.$store.state.dialogs.changeFocus.show = false;
      this.clear();
    },

    getFocuses() {
      this.http
        .get(`/available-focuses`)
        .then((res) => {
          const { focuses, allowChangeFocusEveryStage } = res.data.data;
          this.focuses = focuses.filter(focus => focus.type !== this.$store.state.playerCountry.focusType);
          this.allowChangeFocusEveryStage = allowChangeFocusEveryStage;
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },

    setAction() {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) => action.action.type === "CHANGE_FOCUS"
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }

      this.$store.state.actions.push({
        icon: "mdi-adjust",
        iconColor: "deep-purple lighten-2",
        description: `Change focus to <span class="blue--text font-weight-bold">${this.selectedFocus}</span>`,
        action: {
          type: "CHANGE_FOCUS",
          data: {
            focusType: this.selectedFocus,
          },
        },
      });

      this.close();
    },
  },
};
</script>
