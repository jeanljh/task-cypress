import uniswap from '../../pageobjects/uniswap'
import data from "../../fixtures/data.json";

describe('Test Suite - Uniswap Features', () => {
    before(() => {
        cy.visit('')
        uniswap.btnConnectWallet().click()
        uniswap.btnConnectMeta().click()
        cy.acceptMetamaskAccess().should('be.true')
    })
    context('Network - Mainnet', () => {
        before(() => {
            cy.getNetwork().then(n => {
                if (n.networkName !== 'mainnet')
                    cy.changeMetamaskNetwork('mainnet').should('be.true')
            })
        })
        it('Test - select a token exchange pair to get swap rate', () => {
            cy.getSwapRate(data.swapPair1.tokenFrom, data.swapPair1.tokenTo, data.swapPair1.amount)
        })
        it('Test - token swap is not allowed for insufficient fund', () => {
            cy.getSwapRate(data.swapPair2.tokenFrom, data.swapPair2.tokenTo, data.swapPair2.amount)
            uniswap.btnSwap().should('not.be.enabled')
        })
        it('Test - import a custom erc20 token', () => {
            cy.importToken(data.customToken.address, data.customToken.symbol)
        })
    })

    context('Network - Rinkeby', () => {
        before(() => {
            cy.getNetwork().then(n => {
                if (n.networkName !== 'rinkeby')
                    cy.changeMetamaskNetwork('rinkeby').should('be.true')
            })
        })
        it('Test - perform token swap for an exchange pair when account has sufficient fund', () => {
            uniswap.textNetwork('rinkeby')
            cy.getSwapRate(data.swapPair1.tokenFrom, data.swapPair1.tokenTo, data.swapPair1.amount)
            cy.swapToken()
        })
    })
  })