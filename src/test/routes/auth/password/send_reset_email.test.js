const dotenv = require("dotenv");

const { AuthAPI, UserAPI, ResetPasswordAPI } = require("express-authentication");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

/**
 * You can do it whether you're authenticated or not
 */
test('Reset email sent(Authenticated)', async function() {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // The api is at 'auth2'
    const url = `${envServerUrl()}/auth2`;
    
    const userPassword = "asd12345";
    const userData = {
        name: "Incorrect password",
        email: "incorrect_password@email.com",
        password: userPassword,
        confirmPassword: userPassword
    };
    const api = new AuthAPI(userData, url);
    
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    await api.loginGetJwt();
    
    const passApi = ResetPasswordAPI.fromAuthenticatedAPI(api);
    const sendEmailRes = await passApi.sendResetEmail();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(sendEmailRes.resetEmailSent).toBe(true);
});

/**
 * Send reset email without authentication
 */
test('Reset email sent', async function() {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // The api is at 'auth2
    const url = `${envServerUrl()}/auth2`;
    
    const userPassword = "asd12345";
    const userData = {
        name: "Incorrect password",
        email: "incorrect_password@email.com",
        password: userPassword,
        confirmPassword: userPassword
    };
    const api = new AuthAPI(userData, url);
    
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    await api.loginGetJwt();
    
    const passApi = new ResetPasswordAPI(userData, url);
    const sendEmailRes = await passApi.sendResetEmail();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(sendEmailRes.resetEmailSent).toBe(true);
});
