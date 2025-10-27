<template>
  <div class="h100 centralized-container">
    <div>
      <v-card color="grey darken-3" dark tile width="400px">
        <v-card-title class="justify-center display-1">Sign In</v-card-title>

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
            Do not have an account?
            <span
              class="font-weight-bold blue--text cursor-pointer"
              @click="$router.push({ name: 'SignUp' })"
              >Sign up</span
            >
          </p>
        </v-card-text>

        <v-divider />

        <v-card-actions class="justify-end">
          <v-btn :disabled="!canSubmit" text color="blue" @click="submit()"
            >Login</v-btn
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
      password: null,
    },
    validFields: {
      username: false,
      password: false,
    },
  }),

  computed: {
    canSubmit() {
      return this.validFields.username && this.validFields.password;
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
        .post("/players/auth", {
          ...this.fieldValues,
        })
        .then((res) => {
          // TODO use cookies to save jwt token
          localStorage.setItem("token", res.data.data.jwt.token);
          localStorage.setItem("playerId", res.data.data.playerId);
          localStorage.setItem("playerNickname", res.data.data.playerNickname);
          localStorage.setItem("reloadAndRedirectToMainMenu", true);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = "Invalid credentials";
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
  },

  mounted() {
    const redirect = localStorage.getItem("reloadAndRedirectToMainMenu");

    if (!redirect) {
      return;
    }

    localStorage.removeItem("reloadAndRedirectToMainMenu");
    this.$router.push({ name: "MainMenu" });
  },
};
</script>
