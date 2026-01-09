const {test,expect}=require('@playwright/test');
test('assign1 Playwright test',async ({page})=>{
const email='salma.shaikh751@gmail.com';
const password='Itsmyassign@123';
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
const products=page.locator('.card-body');
await page.getByPlaceholder('email@example.com').fill(email);
await page.getByPlaceholder('enter your passsword').fill(password);
await page.getByRole('button',{name:'Login'}).click()
//await page.waitForLoadState('networkidle')
await page.locator('.card-body b').first().waitFor();
//console.log(await page.locator('.card-body b').allTextContents())
//const count=await products.count();//count method here gives the number of locators with the same locator
/*for(let i=0;i<count;i++){
    if(await products.nth(i).locator("b").textContent()==='ZARA COAT 3'){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}*/
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
//await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
//const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
//expect(bool).toBeTruthy();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
//await page.locator("text='Checkout'").click();
await page.getByRole("button",{name:"Checkout"}).click();
await page.locator("select.input").first().selectOption("03");
await page.locator("select.input").nth(1).selectOption("30");
//await page.locator(".form__cc>>.txt").nth(1).fill("786");
//await expect(page.locator(".form__cc>>.txt").nth(1)).toHaveValue("786");
//await page.locator(".form__cc>>.txt").nth(2).fill("salma");
await page.locator(".form__cc>>.txt").nth(2).fill("salma");
//await page.locator("[placeholder='Select Country']").pressSequentially("ind",{delay:150});
await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
await page.getByRole("button",{name:"India"}).nth(1).click()
//const optionsCount=await dropdown.locator("button").count();
/*for(let i=0;i<optionsCount;i++){
    if(await dropdown.locator("button").nth(i).textContent()===' India'){
        await dropdown.locator("button").nth(i).click();
        break
    }
}*/

await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByText("PLACE ORDER").click();
//await page.locator(".action__submit").click();
//await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
const orderId=await page.locator(" .em-spacer-1 .ng-star-inserted").textContent()
console.log(orderId)
await page.locator("ul .btn").nth(1).click();
const orderIdList=page.locator('tbody tr')
await orderIdList.first().waitFor()
//await page.pause()
const orderIdFinal=orderId.split('|')[1].trim()
await page.pause()
await orderIdList.filter({hasText:orderIdFinal}).getByRole("button",{name:"View"}).click();
/*const orderCount=await orderIdList.count();
for(let i=0;i<orderCount;i++){
 if(orderId.includes(await orderIdList.locator("th").nth(i).textContent())){
    console.log(await orderIdList.locator("th").nth(i).textContent())
     await orderIdList.nth(i).locator("text='View'").click();
     break;

 }else{
    console.log('not found')
 }
}*/
expect(orderId.includes(await page.locator(".col-text").textContent())).toBeTruthy();

})