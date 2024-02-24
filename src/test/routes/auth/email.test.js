const AuthTestAPI = require("../../../auth/AuthTestAPI");

test("Email confirmation backdoor access", async () => {
    const api = new AuthTestAPI();
    
    // Register the user
    const emailConfirmationRes = await api.backdoorEmailConfirmationTest();
    
    expect(emailConfirmationRes.emailConfirmed).toBe(true);
});
