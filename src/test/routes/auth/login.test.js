const AuthTestAPI = require("../../../auth/AuthTestAPI");

test('Successful login', async function() {
    // Create user data
    const userData = {
        name: "Successful User Registration",
        email: "some_email@email.com",
        password: "asd12345",
        confirmPassword: "asd12345"
    };
    
    const api = new AuthTestAPI(userData);
    
    // Login user to be able to delete it
    const loginResult = await api.loginUser();
    
    // This is practically the same as jest
    expect(loginResult.loggedIn).toBe(true);
});
