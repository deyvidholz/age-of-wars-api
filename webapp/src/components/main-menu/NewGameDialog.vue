<template>
  <v-dialog
    v-model="$store.state.mainMenu.dialogs.newGame.show"
    width="520"
    persistent
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="green accent-3" class="mr-2">mdi-earth-box-plus</v-icon>

        Create New Game
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4">
        <v-text-field
          v-model="fieldValues.name"
          label="Name"
          type="text"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              value && value.match(/^[\w ]{4,16}$/)
                ? ruleValid('name')
                : ruleInvalid('name', 'Invalid name'),
          ]"
        ></v-text-field>

        <v-text-field
          v-model="fieldValues.password"
          label="Password"
          type="password"
          hint="Leave this field empty to create game without password"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              !value || (value && value.match(/^.{3,24}$/))
                ? ruleValid('password')
                : ruleInvalid(
                    'password',
                    'Your password must have between 3~24 characters'
                  ),
          ]"
        ></v-text-field>

        <v-switch
          v-model="fieldValues.allowCheats"
          label="Allow Cheats"
          color="red"
          value="true"
        ></v-switch>

        <v-switch
          v-model="fieldValues.resetAlliances"
          label="Reset All Alliances"
          color="orange"
          value="true"
          hint="Start game with no pre-existing alliances"
          persistent-hint
        ></v-switch>

        <v-select
          v-model="fieldValues.maxPlayers"
          label="Max Players Allowed"
          :items="maxPlayersSelectValues"
        />

        <v-combobox
          v-model="fieldValues.blacklistedCountries"
          :items="blacklistedCountriesComboboxValues"
          label="Blacklisted Countries"
          multiple
          chips
        ></v-combobox>

        <v-select
          v-model="fieldValues.templateId"
          label="Template (optional)"
          :items="templateSelectValues"
          item-text="name"
          item-value="id"
          clearable
          hint="Apply a custom template to modify starting conditions"
          persistent-hint
          class="mt-4"
        >
          <template v-slot:prepend-item>
            <v-list-item @click="openTemplateManager()">
              <v-list-item-icon>
                <v-icon color="purple">mdi-palette</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Manage Templates</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="cancel()">Cancel</v-btn>

        <v-btn
          :disabled="!canSubmit"
          color="green accent-3"
          text
          @click="submit()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    fieldValues: {
      name: null,
      password: null,
      allowCheats: null,
      resetAlliances: null,
      maxPlayers: 'Max',
      blacklistedCountries: [],
      templateId: null,
    },
    validFields: {
      name: false,
      password: true,
    },
    maxPlayersSelectValues: ['Max', 2, 4, 8, 10, 16, 24, 48, 64, 100],
    blacklistedCountriesComboboxValues: [],
    templateSelectValues: [],
  }),

  computed: {
    isShowing() {
      return this.$store.state.mainMenu.dialogs.newGame.show;
    },
    canSubmit() {
      return this.validFields.name && !this.$store.state.isRequesting;
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        return;
      }

      this.http
        .get('/available-countries')
        .then(
          (res) =>
            (this.blacklistedCountriesComboboxValues = res.data.data.countries)
        )
        .catch((err) => {
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });

      // Load templates
      this.http
        .get('/templates')
        .then((res) => {
          this.templateSelectValues = [
            { id: null, name: 'None' },
            ...res.data.data.templates,
          ];
        })
        .catch((err) => {
          console.error('Failed to load templates:', err);
          this.templateSelectValues = [{ id: null, name: 'None' }];
        });
    },
  },

  methods: {
    clear() {
      this.fieldValues.name = null;
      this.fieldValues.password = null;
      this.fieldValues.allowCheats = null;
      this.fieldValues.resetAlliances = null;
      this.fieldValues.maxPlayers = 'Max';
      this.fieldValues.blacklistedCountries = [];
      this.fieldValues.templateId = null;
      this.validFields.name = false;
      this.validFields.password = true;
    },
    openTemplateManager() {
      this.$store.state.mainMenu.dialogs.templateManager.show = true;
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
      this.$store.state.mainMenu.dialogs.newGame.show = false;
      this.clear();
    },
    submit() {
      const payload = {
        name: this.fieldValues.name,
        password: this.fieldValues.password,
        templateId: this.fieldValues.templateId,
        options: {
          allowCheats: Boolean(this.fieldValues.allowCheats),
          resetAlliances: Boolean(this.fieldValues.resetAlliances),
          maxPlayers:
            this.fieldValues.maxPlayers === 'Max'
              ? -1
              : this.fieldValues.maxPlayers,
          blacklistedCountries: this.fieldValues.blacklistedCountries,
        },
      };

      this.http
        .post('/games', payload)
        .then((res) => {
          localStorage.setItem('gameId', res.data.data.game.id);

          this.$store.state.dialogs.info.handler = () => {
            this.http
              .get(`/games/start/${res.data.data.game.id}`)
              .then((response) => {
                this.$router.push({ name: 'Game' });
              })
              .catch((err) => {
                this.$store.state.dialogs.info.title =
                  err.response.data.message;
                this.$store.state.dialogs.info.isError = true;
                this.$store.state.dialogs.info.show = true;
              });
          };

          this.$store.state.dialogs.info.onClose = () => {
            this.cancel();
          };

          this.$store.state.dialogs.info.title = res.data.message;
          this.$store.state.dialogs.info.show = true;
        })
        .catch((err) => {
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
  },
};
</script>
