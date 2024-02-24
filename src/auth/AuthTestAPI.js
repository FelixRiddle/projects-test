const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

const { AuthAPI, UserAPI } = require("express-authentication");

const serverUrl = require("express-authentication/src/public/web/serverUrl");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

class AuthTestAPI {
    constructor() {
        // Setup dotenv
        dotenv.config({
            path: ".env"
        });
        
        // Create user data
        const userData = {
            name: "Alistar",
            email: `${uuidv4()}@email.com`,
            password: "asd12345",
            confirmPassword: "asd12345"
        };
        this.userData = userData;
        
        // Get server url
        const ENV_SERVER_URL = envServerUrl();
        const url = serverUrl(ENV_SERVER_URL);
        
        // Auth api
        const api = new AuthAPI(userData, url);
        
        // 'express-authentication' by itself doesn't have a scope
        // but 'good-roots' does, for now, we will limit it to only good roots.
        api.setEndpointScope("auth2");
        
        this.api = api;
    }
    
    // --- Tests ---
    /**
     * Perform register test and get its result
     * 
     * The user is deleted at the end
     * 
     * @returns {Object} Response data object
     */
    async registerTest() {
        // Result
        const registerRes = await this.api.registerUser();
        
        // Confirm user email
        await this.api.confirmUserEmailWithPrivateKey(this.userData.email);
        
        // Login user to be able to delete it
        await this.api.loginGetJwt();
        
        // User api
        const userApi = UserAPI.fromAuthenticatedAPI(this.api);
        await userApi.delete();
        
        return registerRes;
    }
    
    /**
     * Confirm email through backdoor access
     */
    async backdoorEmailConfirmationTest() {
        // Result
        await this.api.registerUser();
        
        // Confirm user email
        const emailConfirmed = await this.api.confirmUserEmailWithPrivateKey(this.userData.email);
        
        // Login user to be able to delete it
        await this.api.loginGetJwt();
        
        // User api
        const userApi = UserAPI.fromAuthenticatedAPI(this.api);
        await userApi.delete();
        
        return emailConfirmed;
    }
    
    /**
     * Delete user
     * 
     * @returns 
     */
    async deleteUserTest() {
        // Result
        await this.api.registerUser();
        
        // Confirm user email
        await this.api.confirmUserEmailWithPrivateKey();
        
        // Login user to be able to delete it
        await this.api.loginGetJwt();
        
        const userApi = UserAPI.fromAuthenticatedAPI(this.api);
        
        // Now delete user, because we only need to check if register was successful
        const deleteRes = await userApi.delete();
        
        return deleteRes;
    }
    
    // --- Get/Sets ---
    /**
     * The two in one, set is optional, get is always
     * 
     * @param {*} nameA 
     * @returns 
     */
    name(nameA) {
        if(nameA) {
            this.userData.name = nameA;
        }
        
        return this.userData.name;
    }
    
    /**
     * The two in one, set is optional, get is always
     * 
     * @param {*} emailA 
     * @returns 
     */
    email(emailA) {
        if(emailA) {
            this.userData.email = emailA;
        }
        
        return this.userData.email;
    }
    
    /**
     * The two in one, set is optional, get is always
     * 
     * @param {*} emailA 
     * @returns 
     */
    password(passwordA) {
        if(passwordA) {
            this.userData.password = passwordA;
        }
        
        return this.userData.password;
    }
    
    /**
     * The two in one, set is optional, get is always
     * 
     * @param {*} emailA 
     * @returns 
     */
    confirmPassword(passwordA) {
        if(passwordA) {
            this.userData.confirmPassword = passwordA;
        }
        
        return this.userData.confirmPassword;
    }
}

module.exports = AuthTestAPI;
