<template>
  <v-dialog
    v-model="$store.state.mainMenu.dialogs.settings.show"
    width="520"
    persistent
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="yellow accent-3" class="mr-2">
          mdi-cog
        </v-icon>

        Settings
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4">
        <v-text-field
          v-model="fieldValues.nickname"
          label="Nickname"
          type="text"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              value && value.match(/^[\w ]{4,16}$/)
                ? ruleValid('nickname')
                : ruleInvalid('nickname', 'Invalid nickname'),
          ]"
        ></v-text-field>

        <v-text-field
          v-model="fieldValues.password"
          label="Password"
          type="password"
          hint="Leave this field empty to keep current password"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              !value || (value && value.match(/^.{6,24}$/))
                ? ruleValid('password')
                : ruleInvalid(
                    'password',
                    'Your password must have between 6~24 characters'
                  ),
          ]"
        ></v-text-field>

        <v-text-field
          v-model="fieldValues.passwordConfirmation"
          label="Password Confirmation"
          type="password"
          hint="Type your current password"
          dark
          clearable
          autocomplete="off"
          :rules="[
            (value) =>
              value && value.match(/^.{6,24}$/)
                ? ruleValid('passwordConfirmation')
                : ruleInvalid(
                    'passwordConfirmation',
                    'Type your current password'
                  ),
          ]"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="cancel()">
          Cancel
        </v-btn>

        <v-btn :disabled="!canSubmit" color="blue" text @click="submit()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    fieldValues: {
      nickname: null,
      password: null,
      passwordConfirmation: null,
    },
    validFields: {
      nickname: false,
      password: false,
      passwordConfirmation: false,
    },
  }),

  computed: {
    canSubmit() {
      return this.validFields.nickname && !this.$store.state.isRequesting;
    },
  },

  methods: {
    clear() {
      this.fieldValues.nickname = null;
      this.fieldValues.password = null;
      this.fieldValues.passwordConfirmation = null;
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
      this.$store.state.mainMenu.dialogs.settings.show = false;
      this.clear();
    },
    submit() {
      const payload = {
        nickname: this.fieldValues.nickname,
        currentPassword: this.fieldValues.passwordConfirmation,
      };

      if (this.fieldValues.password) {
        payload.password = this.fieldValues.password;
      }

      this.http
        .put("/players", payload)
        .then((res) => {
          this.cancel();
          this.$store.state.dialogs.info.title = res.data.message;
          this.$store.state.dialogs.info.show = true;
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
  },
};
</script>
