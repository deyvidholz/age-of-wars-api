<template>
  <div class="h100 centralized-container">
    <div>
      <v-card color="grey darken-3" dark tile width="400px">
        <v-card-title class="justify-center display-1">Sign Up</v-card-title>

        <v-divider />

        <v-card-text>
          <v-text-field
            v-model="fieldValues.username"
            @keyup="submit($event)"
            label="Username"
            type="text"
            dark
            clearable
            autocomplete="off"
            :rules="[
              (value) =>
                value && value.match(/^\w{4,16}$/)
                  ? ruleValid('username')
                  : ruleInvalid('username', 'Invalid username'),
            ]"
          ></v-text-field>

          <v-text-field
            v-model="fieldValues.nickname"
            @keyup="submit($event)"
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
            @keyup="submit($event)"
            label="Password"
            type="password"
            dark
            clearable
            autocomplete="off"
            :rules="[
              (value) =>
                value && value.match(/^.{6,24}$/)
                  ? ruleValid('password')
                  : ruleInvalid(
                      'password',
                      'Your password must have between 6~24 characters'
                    ),
            ]"
          ></v-text-field>

          <p>
            Already have an account?
            <span
              class="font-weight-bold blue--text cursor-pointer"
              @click="$router.push({ name: 'SignIn' })"
              >Sign in</span
            >
          </p>
        </v-card-text>

        <v-divider />

        <v-card-actions class="justify-end">
          <v-btn :disabled="!canSubmit" text color="green" @click="submit()"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    fieldValues: {
      username: null,
      nickname: null,
      password: null,
    },
    validFields: {
      username: false,
      nickname: false,
      password: false,
    },
  }),

  computed: {
    canSubmit() {
      return (
        this.validFields.username &&
        this.validFields.nickname &&
        this.validFields.password
      );
    },
  },

  methods: {
    ruleValid(fieldName) {
      this.validFields[fieldName] = true;
      return true;
    },
    ruleInvalid(fieldName, text) {
      this.validFields[fieldName] = false;
      return text;
    },
    submit(event = null) {
      if (event) {
        if (event.code !== "Enter") {
          return;
        }

        if (!this.canSubmit) {
          return;
        }
      }

      this.http
        .post("/players", {
          ...this.fieldValues,
        })
        .then((res) => {
          this.$store.state.dialogs.info.handler = () => {
            this.$router.push({ name: "SignIn" });
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
