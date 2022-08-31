# Nesto_Cypress_Automation

# Overview
Contains functional and UI test cases for Login functionality of Nesto site.

# Getting Started
Tests are created using [Cypress Test](https://www.cypress.io/) 
Tests are designed using Page Object Model.

## Local Set-up
1. Clone repository: Nesto_Cypress_Automation
2. Install dependencies: npm ci

## Tests run
1. To run all tests in headless mode, use `npx cypress run loginpage-workflow` for two default browsers Chrome and Electron
2. To run for a specific browser add parameter `-- browser <browser name>`
4. The tests run in headless mode by default; to override, add the '--headed' parameter to the above command: `npm run <script_name> --headed`.