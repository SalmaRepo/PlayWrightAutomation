const {test,expect}=require('@playwright/test');

test('Browser Playwright test',async ({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
})


test('Page Playwright test',async ({page})=>{

   // const context=await browser.newContext();
    //const page=await context.newPage();
    page.route('**/*.{jpg,jpeg,png}',route=>route.abort())//aborts all images
    const userName=page.locator('#username');
    const signIn=page.locator('#signInBtn');
    const cardTitles=page.locator('.card-body a');
    page.on('request',request=>console.log(request.url()));//logs all the network urls
    page.on('response',response=>console.log(response.url(),response.status()))//logs all responses
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //await expect(page).toHaveTitle("Google");
   await userName.fill('rahulshetty');
   await page.locator("[type='password']").fill('Learning@830$3mK2');
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




