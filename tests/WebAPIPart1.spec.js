const {test,expect,request}=require('@playwright/test');
const {APIUtils}=require('./Utils/APIUtils.spec.js')

const loginPayload={userEmail: "salma.shaikh751@gmail.com", userPassword: "Itsmyassign@123"}
const orderPayload={orders: [{country:"Cuba", productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let response;
let token;

test.beforeAll(async()=>{
const apiContext=await request.newContext();
const apiUtils=new APIUtils(apiContext,loginPayload);
token=await apiUtils.getToken();
response=await apiUtils.createOrder(orderPayload);
console.log(response)
})
//test.beforeEach(()=>{})

test('assign1 Playwright test',async ({page})=>{
    //const APIUtils=new APIUtils(apiContext,loginPayload);
    //const orderId=createOrder(orderPayload);
    await page.addInitScript(value=>{
window.localStorage.setItem('token',value)
    },token)
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
/*const email='salma.shaikh751@gmail.com';
await page.locator('.card-body b').first().waitFor();
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole("button",{name:"Checkout"}).click();
await page.locator("select.input").first().selectOption("03");
await page.locator("select.input").nth(1).selectOption("30");
await page.locator(".form__cc>>.txt").nth(2).fill("salma");
await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
await page.getByRole("button",{name:"India"}).nth(1).click()
await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
const orderId=await page.locator(" .em-spacer-1 .ng-star-inserted").textContent()
console.log(orderId)*/
await page.pause()
await page.locator("ul .btn").nth(1).click();
const orderIdList=page.locator('tbody tr')
await orderIdList.first().waitFor()
const orderIdFinal=response;
await page.pause()
await orderIdList.filter({hasText:orderIdFinal}).getByRole("button",{name:"View"}).click();
expect(response.includes(await page.locator(".col-text").textContent())).toBeTruthy();

})