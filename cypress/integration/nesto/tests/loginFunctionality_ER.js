const loginPage = require('../pages/loginPage')
const homePage = require('../pages/homePage')

beforeEach(() => {
    Cypress.on ('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.visit('/login')
})
describe('Login Page Suite', () => {

    let data
    before(function () {
        cy.fixture('example').then(function (testData) {
          data = testData;
        })
      })

    it('Login With Invalid Email', () => {
        loginPage.login(data.InvalidEmail, data.ValidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Your email and/or your password is invalid.')
    })

    it('Login With Invalid Password', () => {
        loginPage.login(data.ValidEmail, data.InvalidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Your email and/or your password is invalid.')
    })

    it('Login With Invalid Email and password', () => {
        loginPage.login(data.InvalidEmail, data.InvalidPassword)
        cy.get(loginPage.loginPageLocators.invalidEmailAndPasswordMessage).should('have.text', 'Your email and/or your password is invalid.')
    })

    it('Login Without Email and password', () => {
        loginPage.clickLoginWithoutCreds()
        cy.get(loginPage.loginPageLocators.reqireValidationMessageForEmail).should('have.text', 'Required')
        cy.get(loginPage.loginPageLocators.reqireValidationMessageForpassWord).should('have.text', 'Required')
    })
    
    it('Validate UI of Login Page', () => {
        cy.get(loginPage.loginPageLocators.nestoImg).should('have.attr', 'src').and('contain', 'data:image/png;base64');
        cy.get(loginPage.loginPageLocators.nestoSecureImg).should('have.attr', 'src').and('contain', '/static/media/nesto_secure_logo_en_mobile.f60406f7.png')
        cy.get(loginPage.loginPageLocators.loginTitle).should('have.text', 'Log in to your account')
        cy.get(loginPage.loginPageLocators.emailLable).should('have.text', 'Email')
        cy.get(loginPage.loginPageLocators.passwordLable).should('have.text', 'Password')
        cy.get(loginPage.loginPageLocators.signUpMessage).should('have.text', "Don't have an account?   Sign up")
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
