// const dotenv = require("dotenv");
// const generator = require("generate-password");

// const { BackendServerAccessAPI } = require("backdoor-server-access");
// const { AuthAPI, ResetPasswordAPI } = require("express-authentication");
// const { envServerUrl } = require("express-authentication/src/controllers/env/env");

// // Haha I can't believe I wrote this 😂😂😂
// // it('Successfully success', async function() {
// test('Successful password re-creation', async function() {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // The api is at 'auth2
//     const url = `${envServerUrl()}/auth2`;
    
//     // Fast setup
//     const api = await AuthAPI.createAndLogin(url);
    
//     const passwordApi = new BackendServerAccessAPI();
//     await passwordApi.resetPassword();
    
//     // Clone data and change password
//     const newUserData = JSON.parse(JSON.stringify(api.userData));
//     // Setup user
//     const newUserPassword = generator.generate({
//         length: 10,
//         numbers: true
//     });
//     newUserData.password = newUserPassword;
//     newUserData.confirmPassword = newUserPassword;
    
//     // Change api data
//     passwordApi.userData = newUserData;
    
//     const privKeyApi = new ResetPasswordPrivateKey();
//     const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
    
//     // Delete user
//     // TODO: Hmmm, after changing password it should log out from everywhere right?
//     await api.deleteUser();
    
//     expect(createPasswordResponse.updated).toBe(true);
// });

// // Check if we can login with the new password
// test('Successful re-login with the new password', async function() {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // The api is at 'auth2
//     const url = `${envServerUrl()}/auth2`;
    
//     // Fast setup
//     const api = await AuthAPI.createAndLogin(url);
    
//     const passwordApi = new ResetPasswordAPI(api.userData, url);
//     await passwordApi.resetPassword();
    
//     // Clone data and change password
//     const newUserData = JSON.parse(JSON.stringify(api.userData));
//     // Setup user
//     const newUserPassword = generator.generate({
//         length: 10,
//         numbers: true
//     });
//     newUserData.password = newUserPassword;
//     newUserData.confirmPassword = newUserPassword;
    
//     // Change api data
//     passwordApi.userData = newUserData;
    
//     const privKeyApi = new ResetPasswordPrivateKey();
//     await passwordApi.createWithKey(privKeyApi.loadLocally());
    
//     // --- Try to log in with the new password ---
//     const apiA = new AuthAPI(newUserData, url);
//     const loginRes = await apiA.loginGetJwt();
    
//     // Delete user
//     // TODO: Hmmm, after changing password it should log out from everywhere right?
//     await api.deleteUser();
    
//     expect(loginRes.loggedIn).toBe(true);
// });

// test('Password too large', async function() {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // The api is at 'auth2
//     const url = `${envServerUrl()}/auth2`;
    
//     // Fast setup
//     const api = await AuthAPI.createAndLogin(url);
    
//     const passwordApi = new ResetPasswordAPI(api.userData, url);
//     await passwordApi.resetPassword();
    
//     // Clone data and change password
//     const newUserData = JSON.parse(JSON.stringify(api.userData));
//     // Setup user
//     const newUserPassword = generator.generate({
//         // Too large
//         length: 65,
//         numbers: true
//     });
//     newUserData.password = newUserPassword;
//     newUserData.confirmPassword = newUserPassword;
    
//     // Change api data
//     passwordApi.userData = newUserData;
    
//     const privKeyApi = new ResetPasswordPrivateKey();
//     const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
    
//     // Delete user
//     // TODO: Hmmm, after changing password it should log out from everywhere right?
//     await api.deleteUser();
    
//     expect(!createPasswordResponse.updated).toBe(true);
// });

// test('Password too short', async function() {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // The api is at 'auth2
//     const url = `${envServerUrl()}/auth2`;
    
//     // Fast setup
//     const api = await AuthAPI.createAndLogin(url);
    
//     const passwordApi = new ResetPasswordAPI(api.userData, url);
//     await passwordApi.resetPassword();
    
//     // Clone data and change password
//     const newUserData = JSON.parse(JSON.stringify(api.userData));
//     // Setup user
//     const newUserPassword = generator.generate({
//         // Too short
//         length: 7,
//         numbers: true
//     });
//     newUserData.password = newUserPassword;
//     newUserData.confirmPassword = newUserPassword;
    
//     // Change api data
//     passwordApi.userData = newUserData;
    
//     const privKeyApi = new ResetPasswordPrivateKey();
//     const createPasswordResponse = await passwordApi.createWithKey(privKeyApi.loadLocally());
    
//     // Delete user
//     // TODO: Hmmm, after changing password it should log out from everywhere right?
//     await api.deleteUser();
    
//     expect(!createPasswordResponse.updated).toBe(true);
// });
