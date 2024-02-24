const dotenv = require("dotenv");

const { AuthAPI } = require("express-authentication");

const ResetPasswordAPI = require("express-authentication/src/api/auth/ResetPasswordAPI.js");
const serverUrl = require("express-authentication/src/public/web/serverUrl.js");
const { envServerUrl } = require("express-authentication/src/controllers/env/env.js");

describe("Start password reset process: ", () => {
    // Setup dotenv
    dotenv.config({
        path: ".env"
    });
    
    // Get server url
    const ENV_SERVER_URL = envServerUrl();
    const url = serverUrl(ENV_SERVER_URL);
    
    it('Starts the process', async function() {
        // Fast setup
        const api = await AuthAPI.createAndLogin(url);
        
        const passwordApi = new ResetPasswordAPI(api.userData, url);
        const resetRes = await passwordApi.resetPassword();
        
        // Delete user
        await api.deleteUser();
        
        expect(resetRes.resetEmailSent).toBe(true);
    });
});
