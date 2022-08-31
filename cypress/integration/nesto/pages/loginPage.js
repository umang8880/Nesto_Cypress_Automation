const webUtility = require('../utility/webUtility')

const loginPageLocators = {
    emailTextBox: '#email',
    passwordTextBox: '#password',
    submitBtn: 'button[type="submit"][data-test-id="login"]',
    localeTxt: 'div[data-test-id="toggle-language"] > div',
    invalidEmailAndPasswordMessage: '#toasts_invalidPassword_title',
    reqireValidationMessageForEmail: 'div[data-test-id="form-error-email"] #validation_errors_isRequired',
    reqireValidationMessageForpassWord: 'div[data-test-id="form-error-password"] #validation_errors_isRequired',
    nestoImg: 'img[alt="Nesto"]',
    nestoSecureImg: 'img[data-test-id="nestoSecured"]',
    loginTitle: '#form_login_title',
    emailLable: 'div[data-test-id="input_label-email"]',
    passwordLable: 'div[data-test-id="input_label-password"]',
    forgotPasswordLink: '#form_signup_forgotPassword',
    signUpMessage: '#loginPage_signUp',
    signUpLink: 'span[id="loginPage_signUp"] span'
}


// Validate Login with email and Password
function login ( email, password ) {
    webUtility.sendText(loginPageLocators.emailTextBox, email )
    webUtility.sendText(loginPageLocators.passwordTextBox, password )
    webUtility.clickElement(loginPageLocators.submitBtn)
}

// Validate Login without Email and Password
function clickLoginWithoutCreds () {
    webUtility.clickElement(loginPageLocators.submitBtn)
}

// Click on Link, Validate navigation and go back to previous page
function validateLinkAndNavigateBack (locator, expectedURL) {
    webUtility.clickElement(locator)
    cy.url().should('eq', expectedURL)
    cy.go('back')
}


// Change the locale as per passed parameter
function changeLocale (locale) {
    let localFromUI
    cy.get(loginPageLocators.localeTxt).then(function(eletext) {
        localFromUI = eletext.text()
        if ( locale === localFromUI ) {
            webUtility.clickElement(loginPageLocators.localeTxt)
        }
    })
}

module.exports = {
    login,
    clickLoginWithoutCreds,
    validateLinkAndNavigateBack,
    changeLocale,
    loginPageLocators
}