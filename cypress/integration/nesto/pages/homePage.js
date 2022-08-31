const webUtility = require('../utility/webUtility')

const homePageLocators = {
    welcomeBackText: '#dashboard_welcomeBack',
    logOutBtn: 'button[data-test-id="logout"]'
}

// Logut from the site
function logout () {
    webUtility.clickElement(homePageLocators.logOutBtn)
}
module.exports = {
    homePageLocators,
    logout
}