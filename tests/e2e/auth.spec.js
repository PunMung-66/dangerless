import fs from "fs";
import { test } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { chromium } from "playwright";

test("Google Sign-In persistent login", async () => {
  // Path where Chromium will store cookies, sessions, etc.
  const cookiePath = "/home/ubuntu/.config/chromium/Default";

  // Remove previous session folder
  if (fs.existsSync(cookiePath)) {
    fs.rmSync(cookiePath, { recursive: true, force: true });
  }
  // Launch persistent browser context
  const browser = await chromium.launchPersistentContext(cookiePath, {
    headless: true,
    args: [`--disable-blink-features=AutomationControlled`],
  });

  const page = await browser.newPage();

  // Go to your web app
  await page.goto("http://localhost:3000/");

  // Click Google Sign-In button
  await page.getByRole("button", { name: "Sign In with Google" }).click();

  // Perform Google login (if not already logged in)
  await page.getByRole("textbox", { name: "Email or phone" }).click();
  await page
    .getByRole("textbox", { name: "Email or phone" })
    .fill(process.env.GOOGLE_SIGNIN_EMAIL);
  await page.getByRole("button", { name: "Next" }).click();

  // Wait and fill password (optional: use environment variable instead)
  await page.waitForSelector('input[type="password"]');
  await page.fill('input[type="password"]', process.env.GOOGLE_SIGNIN_PASSWORD);
  await page.click("#passwordNext");

  // Wait for redirect to your app after login
  await page.waitForURL("http://localhost:3000/**");

  await browser.close();
});
