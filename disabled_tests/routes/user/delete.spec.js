const dotenv = require("dotenv");

const { AuthAPI } = require("express-authentication");

const confirmUserEmailWithPrivateKey = require("express-authentication/src/email/confirmUserEmailWithPrivateKey");
const serverUrl = require("express-authentication/src/public/web/serverUrl");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

describe("Delete user", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Create user data
    const userData = {
        name: "Delete user",
        email: "delete_user@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const url = serverUrl(envServerUrl());
    const api = new AuthAPI(userData, url);
    
    it('Delete user', async function() {
        await api.registerUser();
        
        await confirmUserEmailWithPrivateKey(userData.email);
        
        await api.loginGetJwt();
        
        const deleteRes = await api.deleteUser();
        
        expect(deleteRes.userDeleted).toBe(true);
    });
});
