const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/nesto/tests/*.js',
    baseUrl: 'https://app.qa.nesto.ca',
  },
  defaultCommandTimeout: 10000,
});
