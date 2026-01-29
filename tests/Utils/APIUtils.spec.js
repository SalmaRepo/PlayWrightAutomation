class APIUtils{

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
        this.token=null;
    }


async getToken(){
const loginResponse=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:this.loginPayload});
//expect(loginResponse.ok()).toBeTruthy();
const loginResponseJSON=await loginResponse.json();
this.token=loginResponseJSON.token.toString();
return this.token;
}

async createOrder(orderPayload){
    let response={};
    response.token=this.getToken();
    const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{'Authorization':await this.getToken(),
                'Content-Type':'application/json'
            },
        }
    )
    //let orderResponseJSON={}
    //orderResponseJSON.orders=[]
    let orderResponseJSON=await orderResponse.json();
    console.log(orderResponseJSON)
    let orderId=orderResponseJSON.orders[0];
    response.orderId=orderId;
    return orderId;
    
}

}

module.exports={APIUtils};