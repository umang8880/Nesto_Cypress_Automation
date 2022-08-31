
// Click on Element 
function clickElement ( locator ) {
    cy.get(locator).click()
}

// Enter text in Element 
function sendText ( locator, text ) {
    cy.get(locator).type(text)
}

module.exports = {
    clickElement,
    sendText
}