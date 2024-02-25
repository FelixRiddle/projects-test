const dotenv = require("dotenv");

const { AuthAPI } = require("express-authentication");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

const AuthTestAPI = require("../../../auth/AuthTestAPI");

// Setup dotenv
dotenv.config({
    path: ".env"
});

const url = envServerUrl();

test('Successful register', async () => {
    const api = new AuthTestAPI();
    
    // Register the user
    const registerRes = await api.registerTest();
    
    expect(registerRes.userRegistered).toBe(true);
});

// Short user password
test("Short user password on register", async function() {
    // Create user data
    const userData = {
        name: "Short password",
        email: "some_email3@gmail.com",
        password: "asd",
        confirmPassword: "asd"
    };
    
    const api = new AuthTestAPI(userData);
    
    // The user will not be able to register so we can skip deletion
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    // If it's false, then the user is not registered
    // Flip the bit to check against true
    expect(!registered).toBe(true);
});

// Longer than 64 characters password
test("Password too large", async function() {
    // Create user data
    const userData = {
        name: "Password too large",
        email: "some_email4@gmail.com",
        password: "Woh0dgvEByn6skV1BpUvx7X7XLio0HdaHtrMpacGBTCFImpjHUTb5fERCWkvV5A2A",
        confirmPassword: "Woh0dgvEByn6skV1BpUvx7X7XLio0HdaHtrMpacGBTCFImpjHUTb5fERCWkvV5A2A"
    };
    
    const api = new AuthTestAPI(userData);
    
    // The user will not be able to register so we can skip deletion
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    // If it's false, then the user is not registered
    // Flip the bit to check against true
    expect(!registered).toBe(true);
});

// --- Email ---
test("Bad email", async function() {
    // Create user data
    const userData = {
        // To identify them in DBeaver, I will put the test name here
        name: "Bad email",
        // Doesn't have domain name
        email: "some_email6@.com",
        password: "asdf1234",
        confirmPassword: "asdf1234"
    };
    
    const api = new AuthTestAPI(userData);
    
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    expect(!registered).toBe(true);
});

// --- Name ---
test("Null name", async function() {
    // Create user data
    const userData = {
        name: "",
        email: "some_email5@gmail.com",
        password: "asdf1234",
        confirmPassword: "asdf1234"
    };
    
    const api = new AuthTestAPI(userData);
    
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    expect(!registered).toBe(true);
});

test("Name too short", async function() {
    // Create user data
    const userData = {
        name: "aa",
        email: "name_too_short@gmail.com",
        password: "asdf1234",
        confirmPassword: "asdf1234"
    };
    
    const api = new AuthTestAPI(userData);
    
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    expect(!registered).toBe(true);
});

test("Name too long", async function() {
    // Create user data
    const userData = {
        // Name too long
        name: "CsSAVM7muEYXrEkZd6n8T1SoPoxgMNxsZ2UJSlthE6BPSCmeX72jU5EHULhn7rq7rAUNYtGeTOeW7URRra4fQ5DNQVF0iMYv80wkbU9I7bv0T30rvTlLkJKTufo0FPgqA",
        email: "name_too_long@gmail.com",
        password: "asdf1234",
        confirmPassword: "asdf1234"
    };
    
    const api = new AuthTestAPI(userData);
    
    const registerRes = await api.registerTest();
    const registered = registerRes.userRegistered;
    
    expect(!registered).toBe(true);
});
