import './commands'
import "@synthetixio/synpress/support";

cy.on('uncaught:exception', (err, runnable) => {
      return false
});