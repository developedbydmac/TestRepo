Feature: End to end Ecommerce validation

    application Regression

    Scenario: Ecommerce products delivery
    Given I open ECommerce Page
    When I add items to Cart
    And Validate total prices
    Then select country submit and verify Thankyou 