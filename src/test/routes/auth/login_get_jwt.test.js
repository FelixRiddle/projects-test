const dotenv = require("dotenv");

const AuthTestAPI = require("../../../auth/AuthTestAPI");

const { AuthAPI, UserAPI } = require("express-authentication");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

test('Successful login', async function() {
    // Create user data
    const userData = {
        name: "Successful login",
        email: "successful_login@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const api = new AuthTestAPI(userData);
    
    // Login user to be able to delete it
    const loginResult = await api.loginUser();
    
    // This is practically the same as jest
    expect(loginResult.loggedIn).toBe(true);
});

// --- Test login validation ---
test('Incorrect password', async function() {
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
    
    // Change password
    api.userData.password = "asdf123456";
    const loginRes = await api.loginGetJwt();
    
    // You can't delete the user if you have incorrect login hahha
    // I can't believe I didn't realize that earlier 😂😂
    api.userData.password = userPassword;
    await api.loginGetJwt();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(!loginRes.loggedIn).toBe(true);
});

test('Short password', async function() {
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
    
    api.userData.password = "asd";
    const loginRes = await api.loginGetJwt();
    
    // Restore user password and login
    api.userData.password = userPassword;
    await api.loginGetJwt();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(!loginRes.loggedIn).toBe(true);
});

test('Long password', async function() {
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
    
    api.userData.password = "sK4z5HQeMT5wQzyrqkwkKi1fTyc7eJe0sBjPpHM83pE3PRce4utfPlOpA6h4pEGm9";
    const loginRes = await api.loginGetJwt();
    
    // Restore user password and login
    api.userData.password = userPassword;
    await api.loginGetJwt();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(!loginRes.loggedIn).toBe(true);
});

// Email
test('Wrong email', async function() {
    dotenv.config({
        path: ".env"
    });
    
    // The api is at 'auth2
    const url = `${envServerUrl()}/auth2`;
    
    const userPassword = "asd12345";
    const userEmail = "incorrect_password@email.com";
    const userData = {
        name: "Incorrect password",
        email: userEmail,
        password: userPassword,
        confirmPassword: userPassword
    };
    const api = new AuthAPI(userData, url);
    
    await api.registerUser();
    await api.confirmUserEmailWithPrivateKey(userData.email);
    
    api.userData.email = "aaaaa@com";
    const loginRes = await api.loginGetJwt();
    
    // Restore user email and login
    api.userData.email = userEmail;
    await api.loginGetJwt();
    
    // User api
    const userApi = UserAPI.fromAuthenticatedAPI(api);
    
    // Delete user
    await userApi.delete();
    
    expect(!loginRes.loggedIn).toBe(true);
});
