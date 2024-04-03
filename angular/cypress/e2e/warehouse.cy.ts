describe('Inhibit Warehouse Test', () => {
    it('Inhibit a warehouse and verify if it was inhibited', () => {
      cy.viewport(1366, 768)
      cy.visit('/')
      cy.get('#email').type('admin@eletric-go.com',{delay: 100}).should('have.value', 'admin@eletric-go.com')
      cy.get('#password').type('12345',{delay: 100}).should('have.value', '12345')
      cy.get('#go').click()
      cy.wait(3000)
      cy.get('#createWarehouse').click()
      cy.wait(1500)
      cy.contains('Create Warehouse')
      cy.get('#id').type(' ').clear()
      cy.get('#id').clear().type('B10',{delay: 100}).should('have.value', 'B10')
      cy.get('#designation').clear().type('Bragança',{delay: 100}).should('have.value', 'Bragança')
      cy.get('#address').clear().type('Rua das Cerdeiras,4550-623,Aveiro,Portugal,99',{delay: 100}).should('have.value', 'Rua das Cerdeiras,4550-623,Aveiro,Portugal,99')
      cy.get('#latitude').clear().type('41.8520',{delay: 100}).should('have.value', '41.8520')
      cy.get('#longitude').clear().type('-8.5520',{delay: 100}).should('have.value', '-8.5520')
      cy.get('#altitude').clear().type('855',{delay: 100}).should('have.value', '855')
      cy.get('#submit').click()
      cy.wait(3000)
      cy.get('#ok').click()
  
      cy.get('#getWarehouses').click()
      cy.wait(1500)
      cy.get('#myInput').type('B10{enter}',{delay: 100}).should('have.value', 'B10')
      cy.get('#IB10').click()
      cy.wait(3000)
      cy.get('#active').click()
      cy.get('#myInput').type('{enter}',{delay: 100}).should('have.value', 'B10')
      cy.get('mat-row').should('be.visible')
      cy.wait(3000)
      cy.get('#menuu').click()
      cy.wait(500)
      cy.get('#logout').click()
    })
  
    it('Activate a truck and verify if it was activated', () => {
      cy.viewport(1366, 768)
      cy.visit('/')
      cy.get('#email').type('admin@eletric-go.com',{delay: 100}).should('have.value', 'admin@eletric-go.com')
      cy.get('#password').type('12345',{delay: 100}).should('have.value', '12345')
      cy.get('#go').click()
      cy.wait(3000)
  
      cy.get('#getWarehouses').click()
      cy.wait(1500)
      cy.get('#myInput').type('B10{enter}',{delay: 100}).should('have.value', 'B10')
      cy.get('#AB10').click()
      cy.wait(3000)
      cy.get('#inhibt').click()
      cy.get('#myInput').type('{enter}',{delay: 100}).should('have.value', 'B10')
      cy.get('mat-row').should('be.visible')
      cy.wait(3000)
      cy.get('#B10').click()
      cy.wait(3000)
      cy.get('#menuu').click()
      cy.wait(500)
      cy.get('#logout').click()
    })
  })