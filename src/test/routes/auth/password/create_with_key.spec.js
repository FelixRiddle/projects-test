const dotenv = require("dotenv");

const { AuthAPI, UserAPI, ResetPasswordAPI } = require("express-authentication");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

/**
 * Send reset email without authentication
 */
test('Create new password', async function() {
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
    
    // Create user and login
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    await api.loginGetJwt();
    
    // Create new password
    const newPassword = "adfasdfjasfj3io2j3";
    const newUserData = {
        name: "Incorrect password",
        email: "incorrect_password@email.com",
        password: newPassword,
        confirmPassword: newPassword
    };
    const passApi = new ResetPasswordAPI(newUserData, url);
    passApi.setBackdoorServerUrl(process.env.BACKDOOR_SERVER_ACCESS_URL);
    await passApi.createWithKey();
    
    // Now login with that
    const newApi = new AuthAPI(newUserData, url);
    const loginResult = await newApi.loginGetJwt();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(loginResult.loggedIn).toBe(true);
});
