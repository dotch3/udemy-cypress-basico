const fillForm = {
  fill: user => {
     cy.get('#firstName').should('be.visible').type(user.firstName)
     cy.get('#lastName').should('be.visible').type(user.lastName)
     cy.get('#email').should('be.visible').type(user.email)
     cy.get('#phone').should('be.visible').type(user.phone,{log:false})
     cy.get('#open-text-area').should('be.visible').type('Fill form with page objects: ∞§¶•ªºº–º¡™£¢¢∞∞ ',{
      delay:100,
      log: false
    })

  }
}

module.exports = fillForm
