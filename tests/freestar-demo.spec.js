// @ts-check
const { test } = require("@playwright/test");
const fs = require("fs");

const now = new Date();
const folderName = `error-reports-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
const fileName = `errors-${Date.now()}.txt`;

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.log(err);
}

const writeLogs = function (msg) {
  fs.appendFile(`${folderName}/${fileName}`, `${msg.text()}\r\n`, (err) => {
    if (err) console.log(err);
  });
};

test("Extract console logs to file", async ({ page }) => {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      writeLogs(msg);
    }
  });
  await page.goto("https://demos.freestar.com/products/display");
  await page.getByRole("button", { name: "AGREE" }).click();
  //TODO: how to fix this hard wait - when does the last error happen?
  await page.waitForTimeout(10000);
});
