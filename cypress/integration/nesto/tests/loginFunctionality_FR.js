const loginPage = require('../pages/loginPage')
const homePage = require('../pages/homePage')

beforeEach(() => {
    Cypress.on ('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.visit('/login')
    loginPage.changeLocale('FR')
})
describe('Login Page Suite for FR locale', () => {

    let data
    before(function () {
        cy.fixture('example').then(function (testData) {
          data = testData;
        })
    })

    it('Login With Invalid Email', () => {
        loginPage.login(data.InvalidEmail, data.ValidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Votre courriel et/ou votre mot de passe sont erronés.')
    })

    it('Login With Invalid Password', () => {
        loginPage.login(data.ValidEmail, data.InvalidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Votre courriel et/ou votre mot de passe sont erronés.')
    })

    it('Login With Invalid Email and password', () => {
        loginPage.login(data.InvalidEmail, data.InvalidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Votre courriel et/ou votre mot de passe sont erronés.')
    })

    it('Login Without Email and password', () => {
        loginPage.clickLoginWithoutCreds()
        cy.get(loginPage.loginPageLocators.reqireValidationMessageForEmail).should('have.text', 'Requis')
        cy.get(loginPage.loginPageLocators.reqireValidationMessageForpassWord).should('have.text', 'Requis')
    })

    it('Validate UI of Login Page', () => {
        cy.get(loginPage.loginPageLocators.nestoImg).should('have.attr', 'src').and('contain', 'data:image/png;base64');
        cy.get(loginPage.loginPageLocators.nestoSecureImg).should('have.attr', 'src').and('contain', '/static/media/nesto_secure_logo_fr_mobile.49975870.png')
        cy.get(loginPage.loginPageLocators.loginTitle).should('have.text', 'Connectez-vous à votre compte')
        cy.get(loginPage.loginPageLocators.emailLable).should('have.text', 'Courriel')
        cy.get(loginPage.loginPageLocators.passwordLable).should('have.text', 'Mot de passe')
        cy.get(loginPage.loginPageLocators.signUpMessage).should('have.text', "Vous n'avez pas de compte?  Inscrivez-vous")
        loginPage.validateLinkAndNavigateBack(loginPage.loginPageLocators.forgotPasswordLink, data.ForgotPasswordUrl)
        loginPage.validateLinkAndNavigateBack(loginPage.loginPageLocators.signUpLink, data.SignUpUrl)
    })

    it('Login With Valid Credentials', () => {
        loginPage.login(data.ValidEmail, data.ValidPassword)
        cy.get(homePage.homePageLocators.welcomeBackText).should('have.text', 'Welcome back')
        homePage.logout()
        cy.url().should('eq', data.LoginURL)
    })
})