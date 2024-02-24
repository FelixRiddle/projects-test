const AuthTestAPI = require("../../../auth/AuthTestAPI");

test("Delete user test", async () => {
    const api = new AuthTestAPI();
    
    // Register the user
    const deleteRes = await api.deleteUserTest();
    
    expect(deleteRes.userDeleted).toBe(true);
});
