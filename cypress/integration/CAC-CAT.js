/// <reference types="Cypress"/>


describe('Central de atendimento ao cliente CAC CAT', ()=>{

  beforeEach(()=>{
    //runs before each test
    cy.visit('./src/index.html')
  })
  //it == test
  it('Verificar o titulo da aplicação',()=>{
    console.log('test here')
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it.skip('preenche os campos obrigatórios e envia o formulário',()=>{
    cy.get('#firstName').should('be.visible').type('firstName')
    cy.get('#lastName').should('be.visible').type('last name')
    cy.get('#email').should('be.visible').type('test@test.com')
    cy.get('#phone').should('be.visible').type('0800101010',{log:false})
    cy.get('#open-text-area').should('be.visible').type('testing with cypress ∞§¶•ªºº–º¡™£¢¢∞∞ ',{
      delay:100,
      log: false
    })

    cy.get("button[type='submit']").should('be.visible').click()

    cy.contains('Mensagem enviada com sucesso.').should('be.visible')
    cy.get('.success').should('be.visible')
  })

  it.skip('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=>{
    cy.get('#firstName').should('be.visible').type('firstName')
    cy.get('#lastName').should('be.visible').type('last name')
    cy.get('#email').should('be.visible').type('test.invalid.com',{delay:400})
    cy.get("button[type='submit']").should('be.visible').click()
    cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
  })
  it.skip('telefone aceita só numeros',()=>{
    cy.get('#phone').should('be.visible').type('Alfanumericos !@!@##$').should('have.value','')
  })

  it.skip('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
    cy.get('#firstName').should('be.visible').type('firstName')
    cy.get('#lastName').should('be.visible').type('last name')
    cy.get('#email').should('be.visible').type('test@test.com',{delay:400})
    // cy.get('#phone-checkbox').should('not.be.disabled').click().should('be.enabled')
    cy.get('#phone-checkbox').click();
    cy.get("button[type='submit']").should('be.visible').click()
    cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')

  })

  it.skip('preenche e limpa os campos nome, sobrenome, email e telefone',()=>{
    cy.get('#firstName').should('be.visible').type('firstName').should('have.value','firstName').clear().should('have.value','')
    cy.get('#lastName').should('be.visible').type('last name').should('have.value', 'last name').clear().should('have.value','')
    cy.get('#email').should('be.visible').type('test@test.com').should('have.value','test@test.com').clear().should('have.value','')
    cy.get('#phone').should('be.visible').type('08001010').should('have.value','08001010').clear().should('have.value','')
  })

  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
    cy.get('button[type="submit"]').should('be.visible').click()
    // cy.contains('.button', 'Enviar').should('be.visible').click() //using contains('css', text)
    cy.get('.error').should('be.visible')
  })

  const fillForm= require('../pageObjects/fillForm')
  const user = {}
  user.firstName = 'john',
  user.lastName = 'doe',
  user.email= 'jdoe@test.com',
  user.phone = '08001010'
  it.skip('fill form with pageObjects',()=>{
    fillForm.fill(user)
    cy.get('button[type="button"]').should('be.visible')
    cy.contains('.button', 'Enviar').should('be.visible').click()
    cy.contains('.success', 'Mensagem enviada com sucesso.').should('be.visible')
  })

})