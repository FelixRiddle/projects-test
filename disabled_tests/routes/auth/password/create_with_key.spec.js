const dotenv = require("dotenv");
const generator = require("generate-password");

const { AuthAPI } = require("express-authentication");

const ResetPasswordAPI = require("express-authentication/src/api/auth/ResetPasswordAPI");
const ResetPasswordPrivateKey = require("express-authentication/src/controllers/env/private/ResetPasswordPrivateKey");
const serverUrl = require("express-authentication/src/public/web/serverUrl");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

describe("Create with key", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Get server url
    const ENV_SERVER_URL = envServerUrl();
    const url = serverUrl(ENV_SERVER_URL);
    
    // Haha I can't believe I wrote this 😂😂😂
    // it('Successfully success', async function() {
    it('Successful password re-creation', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin(url);
        
        const passwordApi = new ResetPasswordAPI(api.userData, url);
        await passwordApi.resetPassword();
        
        // Clone data and change password
        const newUserData = JSON.parse(JSON.stringify(api.userData));
        // Setup user
        const newUserPassword = generator.generate({
            length: 10,
            numbers: true
        });
        newUserData.password = newUserPassword;
        newUserData.confirmPassword = newUserPassword;
        
        // Change api data
        passwordApi.userData = newUserData;
        
        const privKeyApi = new ResetPasswordPrivateKey();
        const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
        // Delete user
        // TODO: Hmmm, after changing password it should log out from everywhere right?
        await api.deleteUser();
        
        expect(createPasswordResponse.updated).toBe(true);
    });
    
    // Check if we can login with the new password
    it('Successful re-login with the new password', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin(url);
        
        const passwordApi = new ResetPasswordAPI(api.userData, url);
        await passwordApi.resetPassword();
        
        // Clone data and change password
        const newUserData = JSON.parse(JSON.stringify(api.userData));
        // Setup user
        const newUserPassword = generator.generate({
            length: 10,
            numbers: true
        });
        newUserData.password = newUserPassword;
        newUserData.confirmPassword = newUserPassword;
        
        // Change api data
        passwordApi.userData = newUserData;
        
        const privKeyApi = new ResetPasswordPrivateKey();
        await passwordApi.createWithKey(privKeyApi.loadLocally());
        
        // --- Try to log in with the new password ---
        const apiA = new AuthAPI(newUserData, url);
        const loginRes = await apiA.loginGetJwt();
        
        // Delete user
        // TODO: Hmmm, after changing password it should log out from everywhere right?
        await api.deleteUser();
        
        expect(loginRes.loggedIn).toBe(true);
    });
    
    it('Password too large', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin(url);
        
        const passwordApi = new ResetPasswordAPI(api.userData, url);
        await passwordApi.resetPassword();
        
        // Clone data and change password
        const newUserData = JSON.parse(JSON.stringify(api.userData));
        // Setup user
        const newUserPassword = generator.generate({
            // Too large
            length: 65,
            numbers: true
        });
        newUserData.password = newUserPassword;
        newUserData.confirmPassword = newUserPassword;
        
        // Change api data
        passwordApi.userData = newUserData;
        
        const privKeyApi = new ResetPasswordPrivateKey();
        const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
        // Delete user
        // TODO: Hmmm, after changing password it should log out from everywhere right?
        await api.deleteUser();
        
        expect(!createPasswordResponse.updated).toBe(true);
    });
    
    it('Password too short', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin(url);
        
        const passwordApi = new ResetPasswordAPI(api.userData, url);
        await passwordApi.resetPassword();
        
        // Clone data and change password
        const newUserData = JSON.parse(JSON.stringify(api.userData));
        // Setup user
        const newUserPassword = generator.generate({
            // Too short
            length: 7,
            numbers: true
        });
        newUserData.password = newUserPassword;
        newUserData.confirmPassword = newUserPassword;
        
        // Change api data
        passwordApi.userData = newUserData;
        
        const privKeyApi = new ResetPasswordPrivateKey();
        const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
        
        // Delete user
        // TODO: Hmmm, after changing password it should log out from everywhere right?
        await api.deleteUser();
        
        expect(!createPasswordResponse.updated).toBe(true);
    });
});
