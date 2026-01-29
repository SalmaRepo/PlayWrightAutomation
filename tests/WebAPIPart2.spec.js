const {test,expect}=require('@playwright/test');
let webContext;
const email='salma.shaikh751@gmail.com';

test.beforeAll(async({browser})=>{
const email='salma.shaikh751@gmail.com';
const password='Itsmyassign@123';

const context=await browser.newContext();
const page=await context.newPage();

await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill(password);
await page.locator('#login').click()
await page.waitForLoadState('networkidle');
await context.storageState({path:'state.json'});
webContext=await browser.newContext({storageState:'state.json'})



})
test('assign1 Playwright test',async ()=>{
const page=await webContext.newPage();
await page.goto('https://rahulshettyacademy.com/client');
const products=page.locator('.card-body');
await page.locator('.card-body b').first().waitFor();
console.log(await page.locator('.card-body b').allTextContents())
const count=await products.count();//count method here gives the number of locators with the same locator
for(let i=0;i<count;i++){
    if(await products.nth(i).locator("b").textContent()==='ZARA COAT 3'){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}

await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
expect(bool).toBeTruthy();
await page.locator("text='Checkout'").click();
await page.locator("select.input").first().selectOption("03");
await page.locator("select.input").nth(1).selectOption("30");
await page.locator(".form__cc>>.txt").nth(1).fill("786");
await expect(page.locator(".form__cc>>.txt").nth(1)).toHaveValue("786");
await page.locator(".form__cc>>.txt").nth(2).fill("salma");
await page.locator("[placeholder='Select Country']").pressSequentially("ind",{delay:150});
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount=await dropdown.locator("button").count();
for(let i=0;i<optionsCount;i++){
    if(await dropdown.locator("button").nth(i).textContent()===' India'){
        await dropdown.locator("button").nth(i).click();
        break
    }
}

await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator(" .em-spacer-1 .ng-star-inserted").textContent()
console.log(orderId)
await page.locator("ul .btn").nth(1).click();
const orderIdList=page.locator('tbody tr')
await orderIdList.first().waitFor()
//await page.pause()
const orderCount=await orderIdList.count();
for(let i=0;i<orderCount;i++){
 if(orderId.includes(await orderIdList.locator("th").nth(i).textContent())){
    console.log(await orderIdList.locator("th").nth(i).textContent())
     await orderIdList.nth(i).locator("text='View'").click();
     break;

 }else{
    console.log('not found')
 }
}


expect(orderId.includes(await page.locator(".col-text").textContent())).toBeTruthy();




})