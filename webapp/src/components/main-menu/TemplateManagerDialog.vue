<template>
  <v-dialog
    v-model="$store.state.mainMenu.dialogs.templateManager.show"
    width="900"
    persistent
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="purple lighten-2" class="mr-2">
          mdi-palette
        </v-icon>
        Template Manager
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="max-height: 600px; overflow-y: auto">
        <!-- List View -->
        <div v-if="view === 'list'">
          <v-list color="grey darken-3">
            <v-list-item
              v-for="template in templates"
              :key="template.id"
              @click="selectTemplate(template)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ template.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="template.description">
                  {{ template.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-caption">
                  {{ template.data.countries.length }} countries modified
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div>
                  <v-btn icon @click.stop="editTemplate(template)">
                    <v-icon color="blue">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click.stop="deleteTemplate(template.id)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-alert v-if="templates.length === 0" type="info" text>
            No templates yet. Create one to customize your game starting
            conditions!
          </v-alert>

          <v-btn
            color="purple lighten-2"
            block
            class="mt-4"
            @click="createNew()"
          >
            <v-icon left>mdi-plus</v-icon>
            Create New Template
          </v-btn>
        </div>

        <!-- Create/Edit View -->
        <div v-if="view === 'edit'">
          <v-text-field
            v-model="fieldValues.name"
            label="Template Name"
            :rules="[
              (value) =>
                (value && value.length >= 3 && value.length <= 50) ||
                'Name must be between 3 and 50 characters',
            ]"
            counter="50"
          ></v-text-field>

          <v-textarea
            v-model="fieldValues.description"
            label="Description (optional)"
            rows="2"
            counter="200"
          ></v-textarea>

          <v-divider class="my-4"></v-divider>

          <div class="mb-2">
            <strong>Template Data (JSON)</strong>
            <v-btn
              x-small
              text
              color="blue"
              class="ml-2"
              @click="showExampleJson = !showExampleJson"
            >
              <v-icon small left>mdi-help-circle</v-icon>
              {{ showExampleJson ? 'Hide' : 'Show' }} Example
            </v-btn>
          </div>

          <v-alert type="info" dense text class="mb-2">
            <strong>💡 Tip:</strong> This template starts with all countries and their default values.
            You can modify only the countries/properties you want to change and delete the rest.
          </v-alert>

          <v-alert v-if="showExampleJson" type="info" dense text class="mb-2">
            <pre style="font-size: 11px; overflow-x: auto">{{ exampleJson }}</pre>
          </v-alert>

          <v-textarea
            v-model="fieldValues.dataJson"
            label="JSON Data"
            rows="15"
            outlined
            :error-messages="jsonError"
            @input="validateJson()"
            class="monospace-textarea"
          ></v-textarea>

          <v-alert v-if="jsonError" type="error" dense text>
            {{ jsonError }}
          </v-alert>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn
          v-if="view === 'edit'"
          color="grey"
          text
          @click="cancelEdit()"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>

        <v-btn color="red" text @click="close()">
          Close
        </v-btn>

        <v-btn
          v-if="view === 'edit'"
          :disabled="!canSave"
          color="purple lighten-2"
          text
          @click="saveTemplate()"
        >
          <v-icon left>mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    view: 'list', // 'list' or 'edit'
    templates: [],
    selectedTemplate: null,
    fieldValues: {
      name: '',
      description: '',
      dataJson: '',
    },
    jsonError: null,
    showExampleJson: false,
    exampleJson: JSON.stringify(
      {
        countries: [
          {
            name: 'United States',
            army: {
              divisions: 500,
              tanks: 800,
              aircrafts: 400,
              warships: 500,
            },
            economy: {
              balance: 10000,
            },
            provinces: [
              {
                mapRef: 'US-NY',
                levels: {
                  production: 50,
                  taxation: 50,
                },
                oilProduction: 100,
              },
            ],
          },
          {
            name: 'Russia',
            army: {
              divisions: 400,
            },
            economy: {
              balance: 5000,
            },
          },
        ],
      },
      null,
      2
    ),
  }),

  computed: {
    isShowing() {
      return this.$store.state.mainMenu.dialogs.templateManager.show;
    },
    canSave() {
      return (
        this.fieldValues.name &&
        this.fieldValues.name.length >= 3 &&
        this.fieldValues.name.length <= 50 &&
        this.fieldValues.dataJson &&
        !this.jsonError &&
        !this.$store.state.isRequesting
      );
    },
  },

  watch: {
    isShowing(newValue) {
      if (newValue) {
        this.loadTemplates();
        this.view = 'list';
      }
    },
  },

  methods: {
    async loadTemplates() {
      try {
        const res = await this.http.get('/templates');
        this.templates = res.data.data.templates;
      } catch (err) {
        this.$store.state.dialogs.info.title =
          err.response?.data?.message || 'Failed to load templates';
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
      }
    },

    async createNew() {
      this.selectedTemplate = null;
      this.fieldValues.name = '';
      this.fieldValues.description = '';
      this.jsonError = null;
      this.view = 'edit';

      // Fetch base game data to populate the template
      try {
        const res = await this.http.get('/templates/base-game-data');
        this.fieldValues.dataJson = JSON.stringify(
          res.data.data.templateData,
          null,
          2
        );
      } catch (err) {
        console.error('Failed to load base game data:', err);
        // Fallback to empty structure if API fails
        this.fieldValues.dataJson = JSON.stringify(
          { countries: [] },
          null,
          2
        );
        this.$store.state.dialogs.info.title =
          'Warning: Could not load base game data. Starting with empty template.';
        this.$store.state.dialogs.info.isError = false;
        this.$store.state.dialogs.info.show = true;
      }
    },

    selectTemplate(template) {
      this.selectedTemplate = template;
      // For now, just show template info
      this.$store.state.dialogs.info.title = `Template: ${template.name}`;
      this.$store.state.dialogs.info.isError = false;
      this.$store.state.dialogs.info.show = true;
    },

    editTemplate(template) {
      this.selectedTemplate = template;
      this.fieldValues.name = template.name;
      this.fieldValues.description = template.description || '';
      this.fieldValues.dataJson = JSON.stringify(template.data, null, 2);
      this.jsonError = null;
      this.view = 'edit';
    },

    async deleteTemplate(templateId) {
      if (!confirm('Are you sure you want to delete this template?')) {
        return;
      }

      try {
        await this.http.delete(`/templates/${templateId}`);
        this.$store.state.dialogs.info.title = 'Template deleted successfully';
        this.$store.state.dialogs.info.isError = false;
        this.$store.state.dialogs.info.show = true;
        this.loadTemplates();
      } catch (err) {
        this.$store.state.dialogs.info.title =
          err.response?.data?.message || 'Failed to delete template';
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
      }
    },

    validateJson() {
      try {
        const data = JSON.parse(this.fieldValues.dataJson);
        if (!data.countries || !Array.isArray(data.countries)) {
          this.jsonError = 'Data must contain a "countries" array';
          return false;
        }
        this.jsonError = null;
        return true;
      } catch (err) {
        this.jsonError = `Invalid JSON: ${err.message}`;
        return false;
      }
    },

    async saveTemplate() {
      if (!this.validateJson()) {
        return;
      }

      const payload = {
        name: this.fieldValues.name,
        description: this.fieldValues.description,
        data: JSON.parse(this.fieldValues.dataJson),
      };

      try {
        if (this.selectedTemplate) {
          // Update existing
          await this.http.put(`/templates/${this.selectedTemplate.id}`, payload);
          this.$store.state.dialogs.info.title = 'Template updated successfully';
        } else {
          // Create new
          await this.http.post('/templates', payload);
          this.$store.state.dialogs.info.title = 'Template created successfully';
        }

        this.$store.state.dialogs.info.isError = false;
        this.$store.state.dialogs.info.show = true;
        this.loadTemplates();
        this.view = 'list';
      } catch (err) {
        this.$store.state.dialogs.info.title =
          err.response?.data?.message || 'Failed to save template';
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
      }
    },

    cancelEdit() {
      this.view = 'list';
      this.selectedTemplate = null;
    },

    close() {
      this.$store.state.mainMenu.dialogs.templateManager.show = false;
      this.view = 'list';
      this.selectedTemplate = null;
    },
  },
};
</script>

<style scoped>
.monospace-textarea >>> textarea {
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
