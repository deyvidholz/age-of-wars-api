<template>
  <v-dialog
    v-model="$store.state.dialogs.decisions.show"
    width="720"
    scrollable
  >
    <v-card color="grey darken-3" dark height="390px">
      <v-card-title>
        <v-icon color="orange" class="mr-2"> mdi-book-edit </v-icon>
        Available Decisions
      </v-card-title>

      <template>
        <v-divider></v-divider>

        <v-card-text class="py-4">
          <h1
            class="text-center display-1"
            v-if="playerCountry.decisions.length === 0"
          >
            No decisions available
          </h1>

          <v-card
            width="100%"
            v-for="decision in playerCountry.decisions"
            :key="decision.id"
            class="mb-3"
          >
            <v-card-title class="justify-center">
              <v-icon
                color="green"
                class="mr-2"
                v-if="checked.includes(decision.id)"
                >mdi-check</v-icon
              >
              {{ decision.description }}
            </v-card-title>

            <v-card-actions
              class="justify-center"
              v-if="decision.actionType === 'DEMAND'"
            >
              <v-btn
                color="orange"
                outlined
                small
                tile
                @click="
                  changeToDemandMapMode(
                    decision.data.provincesToFill,
                    decision.data.maxProvincesAllowedToDemand
                  )
                "
              >
                Go To Demands
              </v-btn>
            </v-card-actions>

            <v-card-actions class="justify-center" v-else>
              <v-btn
                color="orange"
                outlined
                small
                tile
                v-for="(type, index) in decision.types"
                :key="index"
                @click="addAction(decision.id, type, decision.data)"
              >
                {{ type.replace(/_/g, " ") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>

        <v-divider></v-divider>
      </template>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getAllProvinceElements } from "@/helpers/map";

export default {
  data: () => ({
    checked: [],
  }),

  computed: {
    playerCountry() {
      return this.$store.state.playerCountry;
    },
  },

  methods: {
    close() {
      this.$store.state.dialogs.decisions.show = false;
    },
    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },
    addAction(decisionId, type, data) {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) => action.decisionId === decisionId
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }

      if (this.checked.indexOf(decisionId) === -1) {
        this.checked.push(decisionId);
      }

      this.$store.state.actions.push({
        icon: "mdi-book",
        iconColor: "orange",
        description: `Decision: ${type}`,
        decisionId,
        action: {
          type,
          data: { ...data, decisionId },
        },
      });
    },
    changeToDemandMapMode(provincesToFill, maxProvincesToDemand) {
      const elements = getAllProvinceElements();
      this.$store.state.provincesAllowedToDemand = [...provincesToFill];
      this.$store.state.maxProvincesToDemand = maxProvincesToDemand;

      elements.forEach((element) => {
        if (provincesToFill.includes(element.id)) {
          element.style.fill = "#ff7a7a";
        } else {
          element.style.fill = "#333";
        }
      });

      if (provincesToFill.includes(this.$store.state.province.mapRef)) {
        this.$store.state.provinceElementOriginalColor = "#ff7a7a";
      } else {
        this.$store.state.provinceElementOriginalColor = "#333";
      }

      this.$store.state.demandMapMode = true;
    },
  },
  sockets: {
    "player:next-turn"() {
      this.$store.state.isRequesting = false;
      this.checked = [];
    },
  },
};
</script>
