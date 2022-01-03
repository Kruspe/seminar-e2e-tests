const { Builder, By, until } = require('selenium-webdriver');

describe('Selenium', () => {
  it('should add two todos and complete the first one', async () => {
    const driver = await new Builder().forBrowser('safari').build();
    await driver.get('http://localhost:3000');
    const textField = await driver.findElement(By.id('task-input'));
    const submitButton = await driver.findElement(By.id('submit-button'));
    await textField.sendKeys('Task 1');
    await submitButton.click();
    await textField.sendKeys('Task 2');
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="todo-item"]')), 2000);
    const firstTodo = await driver.findElement(By.css('[data-testid="todo-item"]'));
    await firstTodo.click();
    // await driver.wait(until.elementLocated(By.css('.esifhsefiuhsef')), 60000)

    expect((await driver.findElements(By.css('[data-testid="todo-item"]'))).length).toEqual(2);
    expect(await (await driver.findElement(By.css('[data-testid="todo-checkbox"] > input'))).isSelected()).toBeTruthy();

    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.css('[data-testid="todo-item"]')), 2000);
    expect((await driver.findElements(By.css('[data-testid="todo-item"]'))).length).toEqual(2);
    expect(await (await driver.findElement(By.css('[data-testid="todo-checkbox"] > input'))).isSelected()).toBeTruthy();
    await driver.quit();
  });
});