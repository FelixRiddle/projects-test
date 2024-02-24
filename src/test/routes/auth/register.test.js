const AuthTestAPI = require("../../../auth/AuthTestAPI");

test('Successful register', async () => {
    const api = new AuthTestAPI();
    
    // Register the user
    const registerRes = await api.registerTest();
    
    expect(registerRes.userRegistered).toBe(true);
});
