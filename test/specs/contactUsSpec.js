var assert = require('assert');

describe('contact us', function() {
    it('should be accessable from a link from the Navbar', function () {
        browser.url('http://www.qaworks.com/');
        browser.click('#menu-item-18894')
        var title = browser.getTitle();
        assert.equal(title, 'CONTACT US | QAWorks Limited');
    });
    it('should submit a contact form if all fields are entered correctly', function () {
        browser.url('http://www.qaworks.com/contact-us/');
        browser.setValue('input[name="your-name"]', 'j.Bloggs');
        browser.setValue('input[name="your-email"]', 'j.Bloggs@qaworks.com');
        browser.setValue('input[name="your-company"]', 'test automation');
        browser.setValue('textarea[name="your-message"]', 'please contact me I want to find out more');
        browser.click('#contact-us-send');
        browser.waitForVisible('.wpcf7-response-output', 5000);
        assert.equal(browser.getText('.wpcf7-response-output'), '×\nTHANK YOU FOR YOUR MESSAGE.');
    });
    it('should ask the user to resubmit if the name field is left blank', function () {
        browser.url('http://www.qaworks.com/contact-us/');
        browser.setValue('input[name="your-email"]', 'j.Bloggs@qaworks.com');
        browser.setValue('input[name="your-company"]', 'test automation');
        browser.setValue('textarea[name="your-message"]', 'please contact me I want to find out more');
        browser.click('#contact-us-send');
        browser.waitForVisible('.wpcf7-not-valid-tip', 5000);
        assert.equal(browser.getText('.wpcf7-not-valid-tip'), 'The field is required.');
    });
    it('should ask the user to resubmit if the email field is left blank', function () {
        browser.url('http://www.qaworks.com/contact-us/');
        browser.setValue('input[name="your-name"]', 'j.Bloggs');
        browser.setValue('input[name="your-company"]', 'test automation');
        browser.setValue('textarea[name="your-message"]', 'please contact me I want to find out more');
        browser.click('#contact-us-send');
        browser.waitForVisible('.wpcf7-not-valid-tip', 5000);
        assert.equal(browser.getText('.wpcf7-not-valid-tip'), 'The field is required.');
    });
    it('should ask the user to resubmit if the message field is left blank', function () {
        browser.url('http://www.qaworks.com/contact-us/');
        browser.setValue('input[name="your-name"]', 'j.Bloggs');
        browser.setValue('input[name="your-email"]', 'j.Bloggs@qaworks.com');
        browser.setValue('input[name="your-company"]', 'test automation');
        browser.click('#contact-us-send');
        browser.waitForVisible('.wpcf7-not-valid-tip', 5000);
        assert.equal(browser.getText('.wpcf7-not-valid-tip'), 'The field is required.');
    });
    it('should ask the user to resubmit if required fields are blank', function () {
        browser.url('http://www.qaworks.com/contact-us/');
        browser.click('#contact-us-send');
        browser.waitForVisible('.wpcf7-response-output', 5000);
        assert.equal(browser.getText('.wpcf7-response-output'), '×\nPLEASE RE-SUBMIT WITH CORRECT INFORMATION.');
    });
});
