const {test,expect,request}=require('@playwright/test');
import { APIUtils1 } from './Utils/APIUtils1.spec';
const loginPayload={userEmail: "salma.shaikh751@gmail.com", userPassword: "Itsmyassign@123"};
const fakeNoOrderPayload={data:[],message:"No Orders"}

let token;

test.beforeAll(async()=>{
    const apiContext=await request.newContext();
    const apiUtils=new APIUtils1(apiContext,loginPayload);
    token=await apiUtils.getToken()
})

test('client app test',async({page})=>{
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token)

await page.goto('https://rahulshettyacademy.com/client');
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>{
        const response=await page.request.fetch(route.request())
        let body=JSON.stringify(fakeNoOrderPayload);
        route.fulfill({
            response,
            body,
        })
    }
)
await page.locator("ul .btn").nth(1).click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent());
})