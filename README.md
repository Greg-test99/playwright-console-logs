# playwright-console-logs

Using Playwright to capture the errors logged to console when landing on a test page

## Description

Example of a test that uses playwright to capture console log errors that occur when navigating to a test URL.
The logged console error messages are written to a local file

### Set up

install playwright
npm install -D @playwright/test

### Executing program

npx playwright test

Each test run will create a new file in the project directory as below
image.png
