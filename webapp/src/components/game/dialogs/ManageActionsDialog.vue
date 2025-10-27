<template>
  <v-dialog
    v-model="$store.state.dialogs.manageActions.show"
    width="520"
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="indigo accent-2" class="mr-2">
          mdi-format-list-bulleted
        </v-icon>

        Manage Actions
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <h3 class="text-center" v-if="!$store.state.actions.length">
          No actions found
        </h3>

        <v-list flat color="transparent">
          <v-list-item-group v-model="selectedAction" color="orange">
            <v-list-item
              v-for="(action, index) in $store.state.actions"
              :key="index"
              style="border-bottom: 1px solid grey"
            >
              <v-list-item-icon>
                <v-icon :color="action.iconColor || 'blue-grey lighten-1'">{{
                  action.icon || "mdi-chevron-right"
                }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between">
                  <div class="d-flex flex-wrap align-center">
                    <v-img
                      v-if="action.flag"
                      :src="
                        `${$store.state.defaultCountryFlagPath}/${action.flag}`
                      "
                      class="mr-2 flag-bordered"
                      height="22"
                      width="36"
                    ></v-img>
                    <span v-html="action.description"></span>
                  </div>

                  <div>
                    <v-btn text color="red" @click="removeAction(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-title>

                <div
                  v-if="action.action.type === 'DISMISS_ARMY'"
                  class="d-flex"
                >
                  <div class="mr-7">
                    <v-icon color="yellow">mdi-account-multiple</v-icon>
                    {{ action.data.divisions }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="teal">mdi-tank</v-icon>
                    {{ action.data.tanks }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="red">mdi-airplane</v-icon>
                    {{ action.data.aircrafts }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="blue">mdi-ferry</v-icon>
                    {{ action.data.warships }}
                  </div>
                </div>

                <div v-if="action.action.type === 'SHOP'" class="d-flex">
                  <div class="mr-7">
                    <v-icon color="brown lighten-2">mdi-water</v-icon>
                    {{ action.data.oil }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="yellow">mdi-account-multiple</v-icon>
                    {{ action.data.divisions }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="teal">mdi-tank</v-icon>
                    {{ action.data.tanks }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="red">mdi-airplane</v-icon>
                    {{ action.data.aircrafts }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="blue">mdi-ferry</v-icon>
                    {{ action.data.warships }}
                  </div>
                </div>

                <div
                  v-if="action.action.type === 'IMPROVE_PROVINCES'"
                  class="d-flex"
                >
                  <div class="mr-7">
                    <v-icon color="green accent-3">mdi-chart-areaspline</v-icon>
                    {{ action.data.qty.production }}
                  </div>
                  <div class="mr-7">
                    <v-icon color="green accent-3">mdi-boom-gate-up</v-icon>
                    {{ action.data.qty.taxation }}
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    selectedAction: null,
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.manageActions.show;
    },
  },

  methods: {
    close() {
      this.$store.state.dialogs.manageActions.show = false;
    },
    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },
  },
};
</script>
