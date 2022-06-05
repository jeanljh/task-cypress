class Uniswap {
    textNetwork = network => cy.contains('div', new RegExp(network, 'i'))
    btnConnectWallet = () => cy.get('#connect-wallet')
    btnConnectMeta = () => cy.get('#connect-METAMASK')
    inputAmountFrom = () => cy.get('#swap-currency-input input')
    inputAmountTo = () => cy.get('#swap-currency-output input')
    btnTokenInput = () => cy.get('span.token-symbol-container').eq(0)
    btnTokenOutput = () => cy.get('span.token-symbol-container').eq(1)
    inputTokenSearch = () => cy.get('#token-search-input')
    textToken = token => cy.contains('div.css-8mokm4', token)
    btnSwap = () => cy.get('#swap-button')
    btnImport = () => cy.contains('button', 'Import')
    btnSwapConfirm = () => cy.get('#confirm-swap-or-send')
    btnClose = () => cy.contains('button', 'Close')
    textPending = () => cy.contains('1 Pending')
}

export default new Uniswap()