class APIUtils1{

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
        this.token=null;
    }

    async getToken(){
        const loginResponse=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {data:this.loginPayload});

        const loginResponseJSON=await loginResponse.json();
        this.token=loginResponseJSON.token.toString();
        return this.token;
    }

};

module.exports={APIUtils1};