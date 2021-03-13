/// <reference types="Cypress" />
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'
import { Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
const homePage=new HomePage()
const productPage=new ProductPage()

Given('I open ECommerce Page', function() {
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
})

When ('I add items to Cart', function() {
    homePage.getShopTab().click()



this.data.productName.forEach(function(element) {
 
    cy.selectProduct(element)
  });
  productPage.checkOutButton().click()
})
var sum=0

And('Validate total prices', function() {
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {


         const amount=$el.text()
         var res= amount.split(" ")
        res= res[1].trim()
        sum= Number(sum)+Number(res)
        
        }).then(function()
        {
            cy.log(sum)
        })
        cy.get('h3 strong').then(function(element)
        {
            const amount=element.text()
            var res= amount.split(" ")
           var total= res[1].trim()
           expect(Number(total)).to.equal(sum)
        
        })
})

Then('select country submit and verify Thankyou', function() {
      cy.contains('Checkout').click()
  cy.get('#country').type('India')
  cy.wait(5000)
  cy.get('.suggestions > ul > li > a').click()
  cy.get('#checkbox2').click({force: true})
  cy.get('input[type="submit"]').click()
  //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
  cy.get('.alert').then(function(element)
  {
     const actualText=element.text()
    expect(actualText.includes("Success")).to.be.true
  })
})