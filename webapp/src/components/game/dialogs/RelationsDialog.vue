<template>
  <v-dialog
    v-model="$store.state.dialogs.relations.show"
    width="920"
    v-if="target.id && simulation"
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="orange" class="mr-2"> mdi-handshake </v-icon>

        Relations
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px">
        <Tabs :data="tabContent" color="grey darken-4">
          <v-tab-item value="tab-war">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-row>
                  <v-col md="5" class="text-center">
                    <div class="d-flex justify-center mb-1">
                      <div>
                        <v-img
                          :src="playerCountry.flag"
                          class="mr-2 flag-bordered"
                          height="22"
                          width="36"
                        />
                      </div>

                      <h2>{{ playerCountry.name }}</h2>
                    </div>

                    <div>
                      Total MP:
                      <span class="red--text">
                        {{
                          formatMoney(
                            simulation.totals.attackers.militaryPower.totals
                              .total,
                            true,
                            false
                          )
                        }}
                      </span>

                      <v-divider class="my-1" />

                      <div>
                        <h4 class="orange--text">Army (Total)</h4>

                        <div class="d-flex justify-space-between">
                          <div>
                            <v-icon color="yellow">
                              mdi-account-multiple
                            </v-icon>

                            {{
                              simulation.totals.attackers.armies.totals
                                .divisions
                            }}
                          </div>

                          <div>
                            <v-icon color="teal"> mdi-tank </v-icon>

                            {{
                              simulation.totals.attackers.armies.totals.tanks
                            }}
                          </div>

                          <div>
                            <v-icon color="red"> mdi-airplane </v-icon>

                            {{
                              simulation.totals.attackers.armies.totals
                                .aircrafts
                            }}
                          </div>

                          <div>
                            <v-icon color="blue"> mdi-ferry </v-icon>

                            {{
                              simulation.totals.attackers.armies.totals.warships
                            }}
                          </div>
                        </div>
                      </div>

                      <v-divider class="my-1" />

                      <div v-if="simulation.participants.attackers.length">
                        <ul class="text-left">
                          <li
                            class="mb-3 cursor-pointer"
                            v-for="ally in simulation.participants.attackers"
                            :key="ally.id"
                          >
                            <v-checkbox
                              v-model="callToWar"
                              class="d-inline-block"
                              :value="ally.name"
                              style="margin-bottom: -15px; margin-top: -3px"
                              @click="getWarSimulation(true)"
                            />
                            {{ ally.name }}
                            | MP:
                            <span class="red--text">
                              {{
                                formatMoney(
                                  ally.militaryPower.total,
                                  true,
                                  false
                                )
                              }}
                            </span>

                            <div class="d-flex justify-space-between">
                              <div class="mr-5">
                                <v-icon color="yellow">
                                  mdi-account-multiple
                                </v-icon>

                                {{ ally.army.divisions }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="teal"> mdi-tank </v-icon>

                                {{ ally.army.tanks }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="red"> mdi-airplane </v-icon>

                                {{ ally.army.aircrafts }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="blue"> mdi-ferry </v-icon>

                                {{ ally.army.warships }}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <v-btn
                        small
                        color="blue"
                        tile
                        @click="getWarSimulation()"
                        v-if="!callToWar.length"
                      >
                        Reset
                      </v-btn>
                    </div>
                  </v-col>

                  <v-col
                    md="2"
                    class="d-flex flex-column align-center justify-center"
                  >
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          small
                          outlined
                          tile
                          color="purple accent-2"
                          class="mb-5"
                          v-bind="attrs"
                          v-on="on"
                          @click="
                            $store.state.dialogs.aggressivenessRanking.show = true
                          "
                        >
                          <v-icon>mdi-skull-crossbones</v-icon>
                          <span>+{{ simulation.aggressivenessToBeAdded }}</span>
                        </v-btn>
                      </template>
                      <span
                        >Your Aggressiveness will be
                        {{
                          $store.state.playerCountry.aggressiveness +
                          simulation.aggressivenessToBeAdded
                        }}</span
                      >
                    </v-tooltip>

                    <h1 class="display-3 red--text">VS</h1>
                  </v-col>

                  <v-col md="5" class="text-center">
                    <div class="d-flex justify-center mb-1">
                      <div>
                        <v-img
                          :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                          class="mr-2 flag-bordered"
                          height="22"
                          width="36"
                        />
                      </div>

                      <h2>{{ target.name }}</h2>
                    </div>

                    <div>
                      Total MP:
                      <span class="red--text">
                        {{
                          formatMoney(
                            simulation.totals.victims.militaryPower.totals
                              .total,
                            true,
                            false
                          )
                        }}
                      </span>

                      <v-divider class="my-1" />

                      <div>
                        <h4 class="orange--text">Army (Total)</h4>

                        <div class="d-flex justify-space-between">
                          <div>
                            <v-icon color="yellow">
                              mdi-account-multiple
                            </v-icon>

                            {{
                              simulation.totals.victims.armies.totals.divisions
                            }}
                          </div>

                          <div>
                            <v-icon color="teal"> mdi-tank </v-icon>

                            {{ simulation.totals.victims.armies.totals.tanks }}
                          </div>

                          <div>
                            <v-icon color="red"> mdi-airplane </v-icon>

                            {{
                              simulation.totals.victims.armies.totals.aircrafts
                            }}
                          </div>

                          <div>
                            <v-icon color="blue"> mdi-ferry </v-icon>

                            {{
                              simulation.totals.victims.armies.totals.warships
                            }}
                          </div>
                        </div>
                      </div>

                      <v-divider class="my-1" />

                      <div v-if="simulation.participants.victims.length">
                        <ul class="text-left">
                          <li
                            class="mb-3"
                            v-for="ally in simulation.participants.victims"
                            :key="ally.id"
                          >
                            {{ ally.name }}
                            | MP:
                            <span class="red--text">
                              {{
                                formatMoney(
                                  ally.militaryPower.total,
                                  true,
                                  false
                                )
                              }}
                            </span>

                            <div class="d-flex justify-space-between">
                              <div class="mr-5">
                                <v-icon color="yellow">
                                  mdi-account-multiple
                                </v-icon>

                                {{ ally.army.divisions }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="teal"> mdi-tank </v-icon>

                                {{ ally.army.tanks }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="red"> mdi-airplane </v-icon>

                                {{ ally.army.aircrafts }}
                              </div>

                              <div class="mr-5">
                                <v-icon color="blue"> mdi-ferry </v-icon>

                                {{ ally.army.warships }}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="red"
                  tile
                  :disabled="!canDeclareWar"
                  @click="setAction('DECLARE_WAR')"
                >
                  <v-icon color="red darken-4" class="mr-2">
                    mdi-target-variant
                  </v-icon>
                  Declare War
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <!-- <v-tab-item value="tab-peace-offer">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2>{{ target.name }}</h2>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="amber darken-1"
                  tile
                  :disabled="!canSendPeaceOffer"
                  @click="setAction('REQUEST_PEACE')"
                >
                  <v-icon color="amber darken-4" class="mr-2">
                    mdi-email
                  </v-icon>
                  Send Peace Offer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item> -->

          <v-tab-item value="tab-ally">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2>{{ target.name }}</h2>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="orange"
                  tile
                  :disabled="!canBreakAlliance"
                  @click="setAction('BREAK_ALLIANCE')"
                >
                  <v-icon class="mr-2"> mdi-handshake </v-icon>
                  Break Alliance
                </v-btn>

                <v-btn
                  color="blue"
                  tile
                  :disabled="!canSendAllyRequest"
                  @click="setAction('REQUEST_ALLY')"
                >
                  <v-icon color="blue darken-4" class="mr-2">
                    mdi-handshake
                  </v-icon>
                  Send Ally Request
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <!-- <v-tab-item value="tab-enemy">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2>{{ target.name }}</h2>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn color="orange" tile :disabled="!canAddAsEnemy">
                  <v-icon color="orange darken-4" class="mr-2">
                    mdi-sword-cross
                  </v-icon>
                  Set As Enemy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item> -->

          <v-tab-item value="tab-guarantee">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2>{{ target.name }}</h2>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="orange"
                  tile
                  :disabled="!canRemoveIndependenceGuaranteeing"
                  @click="setAction('REMOVE_INDEPENDENCE_GUARANTEEING')"
                >
                  <v-icon class="mr-2"> mdi-handshake </v-icon>
                  Remove Guarantee
                </v-btn>

                <v-btn
                  color="teal"
                  tile
                  :disabled="!canGuaranteeIndependence"
                  @click="setAction('GUARANTEE_INDEPENDENCE')"
                >
                  <v-icon color="teal darken-4" class="mr-2">
                    mdi-handshake
                  </v-icon>
                  Guarantee Independence
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-insult">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2 class="mb-2">{{ target.name }}</h2>
                <p class="ma-0 pa-0">Their opinion about us will be reduced</p>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="deep-orange"
                  tile
                  @click="setAction('SEND_INSULT')"
                >
                  <v-icon color="deep-orange darken-4" class="mr-2">
                    mdi-thumb-down
                  </v-icon>
                  Send Insult
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-send-resources">
            <v-card flat dark tile>
              <v-card-text class="text-center">
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${target.flag}`"
                  class="flag-bordered mx-auto mb-2"
                  width="180"
                />

                <h2 class="mb-2">{{ target.name }}</h2>

                <v-row>
                  <v-col sm="12" md="4">
                    <v-select
                      v-model="resourceType"
                      :items="availableResourceTypes"
                      label="What you want to sell/send?"
                      @change="checkResourceInputs"
                    />
                  </v-col>

                  <v-col sm="12" md="4" v-if="resourceType === 'PROVINCE'">
                    <v-select
                      v-model="resourceProvince"
                      label="Province to sell"
                      item-text="name"
                      item-value="mapRef"
                      :items="availableProvinces"
                      :loading="disableResourceProvinceInput"
                      :disabled="disableResourceProvinceInput"
                    />
                  </v-col>

                  <v-col sm="12" md="4" v-else>
                    <v-text-field v-model="resourceAmount" label="Amount" />
                  </v-col>

                  <v-col sm="12" md="4">
                    <v-text-field
                      v-model="resourcePrice"
                      label="Price"
                      :disabled="disableResourcePriceInput"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  color="green darken-3"
                  tile
                  @click="setAction('SEND_RESOURCE')"
                >
                  <v-icon dark class="mr-2"> mdi-gift </v-icon>
                  Sell Resource
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </Tabs>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
import Tabs from "@/components/game/Tabs";

export default {
  data: () => ({
    // Send Resource data
    availableResourceTypes: ["MONEY", "OIL", "PROVINCE"],
    availableProvinces: [],
    resourceType: "MONEY",
    resourceAmount: 0,
    resourceProvince: null,
    resourcePrice: 0,
    disableResourcePriceInput: true,
    disableResourceProvinceInput: true,

    // Declare War data
    simulation: null,
    callToWar: [],
    armies: {
      divisions: 0,
    },

    // Tabs
    tabContent: [
      {
        id: "tab-war",
        title: "War",
        icon: "mdi-target-variant",
        iconColor: "red",
      },
      // {
      //   id: "tab-peace-offer",
      //   title: "Peace Offer",
      //   icon: "mdi-email",
      //   iconColor: "white",
      // },
      {
        id: "tab-ally",
        title: "Ally",
        icon: "mdi-handshake",
        iconColor: "blue",
      },
      // {
      //   id: "tab-enemy",
      //   title: "Enemy",
      //   icon: "mdi-sword-cross",
      //   iconColor: "orange",
      // },
      {
        id: "tab-guarantee",
        title: "Guarantee",
        icon: "mdi-handshake",
        iconColor: "teal",
      },
      {
        id: "tab-insult",
        title: "Insult",
        icon: "mdi-thumb-down",
        iconColor: "deep-orange",
      },
      {
        id: "tab-send-resources",
        title: "Send Resources",
        icon: "mdi-gift",
        iconColor: "green accent-3",
      },
    ],
  }),

  components: {
    Tabs,
  },

  computed: {
    isShowing() {
      return this.$store.state.dialogs.relations.show;
    },
    playerCountry() {
      return this.$store.state.playerCountry;
    },
    target() {
      return this.$store.state.province.country;
    },
    isSelfTarget() {
      return this.playerCountry.id === this.target.id;
    },
    hasFriendlyRelations() {
      return [
        ...this.playerCountry.allies,
        ...this.playerCountry.guaranteeingIndependence,
        ...this.playerCountry.independenceGuaranteedBy,
      ].some((ally) => ally.id === this.target.id);
    },
    isEnemy() {
      return [
        ...this.playerCountry.enemies,
        ...this.playerCountry.inWarWith,
      ].some((enemy) => enemy.id === this.target.id);
    },
    isInWarWithTarget() {
      return this.playerCountry.inWarWith.some(
        (enemy) => enemy.id === this.target.id
      );
    },
    isGuaranteeingIndependence() {
      return this.playerCountry.guaranteeingIndependence.some(
        (ally) => ally.id === this.target.id
      );
    },
    canDeclareWar() {
      return !(
        this.isSelfTarget ||
        this.hasFriendlyRelations ||
        this.isInWarWithTarget
      );
    },
    canSendPeaceOffer() {
      return this.isInWarWithTarget;
    },
    canSendAllyRequest() {
      return !this.hasFriendlyRelations;
    },
    isAlliedWith() {
      return this.playerCountry.allies.some(
        (ally) => ally.id === this.target.id
      );
    },
    canBreakAlliance() {
      return this.isAlliedWith;
    },
    canAddAsEnemy() {
      return !(this.hasFriendlyRelations || this.isEnemy);
    },
    canRemoveIndependenceGuaranteeing() {
      return this.isGuaranteeingIndependence;
    },
    canGuaranteeIndependence() {
      return !(this.hasFriendlyRelations || this.isEnemy);
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        this.stopAllAudiosKeepingTime();
        this.$store.state.audio.AUDIO_WAR_SUSPENSE_2.play();
        return;
      }

      this.stopAllAudiosKeepingTime();
      this.$store.state.audio.AUDIO_WAR_SUSPENSE_1.play();
      this.getWarSimulation();
    },
  },

  methods: {
    ...mapMutations(["stopAllAudios", "stopAllAudiosKeepingTime"]),
    close() {
      this.$store.state.dialogs.relations.show = false;
    },

    getWarSimulation(includeField = false) {
      const payload = {
        attacker: this.$store.state.playerCountry.name,
        target: this.$store.state.province.country.name,
      };

      const isSelfTarget =
        this.$store.state.playerCountry.id ===
        this.$store.state.province.country.id;

      if (includeField) {
        payload.include = this.callToWar;
      }

      if (!payload.attacker || !payload.target || isSelfTarget) {
        this.close();
        this.$store.state.dialogs.info.title = "No target selected";
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
        return;
      }

      this.http
        .post(`/countries/war-simulation`, payload)
        .then((res) => {
          const { simulation } = res.data.data;
          this.simulation = simulation;

          this.callToWar = [
            ...simulation.participants.attackers.map((country) => country.name),
          ];
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    clearDuplicatedAction(type) {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) =>
          action.action.type === type &&
          action.action.data.targetId === this.target.id
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }
    },

    clearDuplicatedRelationAction(type) {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) =>
          [
            "DECLARE_WAR",
            "REQUEST_ALLY",
            "GUARANTEE_INDEPENDENCE",
            "REQUEST_PEACE",
            "SEND_RESOURCE",
          ].includes(action.action.type) &&
          action.action.data.targetId === this.target.id
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }
    },

    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },

    setAction(actionType) {
      switch (actionType) {
        case "DECLARE_WAR":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-sword-cross",
            iconColor: "red lighten-2",
            description: `Declare war on ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "DECLARE_WAR",
              data: {
                targetId: this.target.id,
                callToWar: this.callToWar,
              },
            },
          });
          break;

        case "REQUEST_PEACE":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-flag",
            iconColor: "white",
            description: `Send Peace Request to ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "REQUEST_PEACE",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "REQUEST_ALLY":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-handshake",
            iconColor: "blue lighten-2",
            description: `Send Ally Request to ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "REQUEST_ALLY",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "BREAK_ALLIANCE":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-handshake",
            iconColor: "orange lighten-2",
            description: `Break alliance with ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "BREAK_ALLIANCE",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "GUARANTEE_INDEPENDENCE":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-handshake",
            iconColor: "teal lighten-2",
            description: `Guarantee Independence of ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "GUARANTEE_INDEPENDENCE",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "REMOVE_INDEPENDENCE_GUARANTEEING":
          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-handshake",
            iconColor: "orange lighten-2",
            description: `Remove ${this.target.name}'s independence guaranteeing`,
            flag: this.target.flag,
            action: {
              type: "REMOVE_INDEPENDENCE_GUARANTEEING",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "SEND_INSULT":
          this.clearDuplicatedAction(actionType);
          this.addAction({
            icon: "mdi-thumb-down",
            iconColor: "deep-orange lighten-2",
            description: `Send Insult To ${this.target.name}`,
            flag: this.target.flag,
            action: {
              type: "SEND_INSULT",
              data: {
                targetId: this.target.id,
              },
            },
          });
          break;

        case "SEND_RESOURCE":
          // TODO intercept all resources when call next turn and create only one
          let description =
            this.resourceType === "PROVINCE"
              ? `Sell province "${this.resourceProvince}" to ${this.target.name} for $${this.resourcePrice}`
              : `Send ${this.resourceAmount} of ${this.resourceType} to ${this.target.name} for $${this.resourcePrice}`;

          this.clearDuplicatedRelationAction(actionType);
          this.addAction({
            icon: "mdi-gift",
            iconColor: "green accent-3",
            description,
            flag: this.target.flag,
            action: {
              type: "SEND_RESOURCES",
              data: {
                targetId: this.target.id,
                resources: [
                  {
                    type: this.resourceType,
                    amount: this.resourceAmount,
                    provinceMapRef: this.resourceProvince,
                    price: this.resourcePrice,
                  },
                ],
              },
            },
          });

          this.resourceType = "MONEY";
          this.resourceAmount = 0;
          this.resourceProvince = null;
          this.resourcePrice = 0;
          break;
      }

      this.$store.state.dialogs.info.title = `Action set`;
      this.$store.state.dialogs.info.show = true;
    },

    addAction(action) {
      this.$store.state.actions.push(action);
    },

    checkResourceInputs(resourceType) {
      if (resourceType === "MONEY") {
        this.resourcePrice = 0;
        this.disableResourcePriceInput = true;
        return;
      }

      if (resourceType === "PROVINCE") {
        this.disableResourceProvinceInput = true;
        this.http
          .get(`/countries/${this.$store.state.playerCountry.name}`)
          .then(({ data: { data } }) => {
            const {
              country: { provinces },
            } = data;

            this.availableProvinces = provinces;
            this.resourceProvince = this.availableProvinces[0].mapRef;
            this.disableResourceProvinceInput = false;
          })
          .catch((error) => {
            console.log(error.response);
            this.$store.state.isRequestingProvince = false;
            this.$store.state.dialogs.info.title = "An error occurred";
            this.$store.state.dialogs.info.description =
              error.response.data.message;

            this.$store.state.dialogs.info.show = true;
            element.style.fill = "#ffffff";
          });
      }

      this.disableResourcePriceInput = false;
    },
  },
};
</script>
