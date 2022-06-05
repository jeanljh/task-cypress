import "@testing-library/cypress/add-commands";
import uniswap from '../../pageobjects/uniswap'

Cypress.Commands.add('getSwapRate', (tokenFrom, tokenTo, amountFrom) => {
    uniswap.inputAmountFrom().clear().type(amountFrom).should('have.value', amountFrom)
    uniswap.btnTokenInput().invoke('text').then(t => {
        if (t !== tokenFrom) {
            uniswap.btnTokenInput().click()
            uniswap.inputTokenSearch().type(tokenFrom).should('have.value', tokenFrom)
            uniswap.textToken(tokenFrom).click({force: true})
            uniswap.btnTokenInput().should('have.text', tokenFrom)
        }
    })
    uniswap.btnTokenOutput().invoke('text').then(t => {
        if (t !== tokenTo) {
            uniswap.btnTokenOutput().click()
            uniswap.inputTokenSearch().type(tokenTo).should('have.value', tokenTo)
            uniswap.textToken(tokenTo).click({force: true})
            uniswap.btnTokenOutput().should('have.text', tokenTo)
        }
    })
    uniswap.inputAmountTo().should('not.have.value', '').and('not.be.NaN')
})

Cypress.Commands.add('importToken', (tokenAddress, tokenSymbol) => {
    uniswap.btnTokenInput().click()
    uniswap.inputTokenSearch().type(tokenAddress)
    uniswap.btnImport().click()
    uniswap.btnImport().click()
    uniswap.inputAmountTo().should('not.have.value', '').and('not.be.NaN')
    uniswap.btnTokenInput().should('have.text', tokenSymbol)
})

Cypress.Commands.add('swapToken', () => {
    uniswap.btnSwap().should('be.enabled')
    uniswap.btnSwap().click()
    uniswap.btnSwapConfirm().click()
    cy.confirmMetamaskTransaction().should('be.true')
    uniswap.btnClose().click()
    uniswap.textPending().should('not.exist')
})