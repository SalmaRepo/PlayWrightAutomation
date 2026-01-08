const {test,expect}=require('@playwright/test');

test('Browser Playwright test',async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
})


test('Page Playwright test',async ({page})=>{

   // const context=await browser.newContext();
    //const page=await context.newPage();
    const userName=page.locator('#username');
    const signIn=page.locator('#signInBtn');
    const cardTitles=page.locator('.card-body a');
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //await expect(page).toHaveTitle("Google");
   await userName.fill('rahulshetty');
   await page.locator("[type='password']").fill('learning');
   await signIn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill('rahulshettyacademy');
   await signIn.click();
   console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   const allTitles=await cardTitles.allTextContents();
   console.log(allTitles)

    
})

test('UI Controls',async ({page})=>{
const userName=page.locator('#username');
const signIn=page.locator('#signInBtn');
const documentLink=page.locator("[href*='documents-request']")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //await expect(page).toHaveTitle("Google");
await userName.fill('rahulshetty');
await page.locator("[type='password']").fill('learning');
await page.locator("select.form-control").selectOption("consult");
await page.locator(".checkmark").last().click();
await page.locator("#okayBtn").click()
//assertion
console.log(await page.locator(".checkmark").last().isChecked())
await expect(page.locator(".checkmark").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
//uncheck
await page.locator("#terms").uncheck()
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLink).toHaveAttribute("class","blinkingText");
 

})

test('@child windows handl',async ({browser})=>{
 const context=await browser.newContext();
    const page=await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink=page.locator("[href*='documents-request']");
   const [newPage]=await  Promise.all([
      context.waitForEvent('page')//listen for any new page pending,rejected,fulfilled promise
      ,documentLink.click()]);//new page is opened
   
   const text=await newPage.locator('.red').textContent()//its not page.locator its newPage.locator
   console.log(text);
   const arrayText=text.split('@');
   const domain=arrayText[1].split(" ")[0]
   console.log(domain);
   await page.locator('#username').fill(domain);
   //await page.pause;
   console.log(await page.locator('#username').textContent())
   console.log(await page.locator('#username').inputValue())

    
})
