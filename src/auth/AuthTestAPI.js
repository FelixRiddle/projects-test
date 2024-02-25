const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

const { AuthAPI, UserAPI } = require("express-authentication");

const serverUrl = require("express-authentication/src/public/web/serverUrl");
const { envServerUrl } = require("express-authentication/src/controllers/env/env");

const AuthTask = require("./AuthTask");

module.exports = class AuthTestAPI {
    constructor(userData=undefined) {
        // Setup dotenv
        dotenv.config({
            path: ".env"
        });
        
        // Create user data
        if(userData) {
            this.userData = userData;
        } else {
            const defaultUserData = {
                name: "Alistar",
                email: `${uuidv4()}@email.com`,
                password: "asd12345",
                confirmPassword: "asd12345"
            };
            this.userData = defaultUserData;
        }
        
        // Get server url
        const ENV_SERVER_URL = envServerUrl();
        const url = serverUrl(ENV_SERVER_URL);
        
        // Auth api
        const api = new AuthAPI(this.userData, url);
        
        // 'express-authentication' by itself doesn't have a scope
        // but 'good-roots' does, for now, we will limit it to only good roots.
        api.setEndpointScope("auth2");
        
        this.authTask = new AuthTask(api, this.userData);
        
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
        this.authTask.getResultOf(AuthTask.REGISTER);
        return await this.authTask.createAndDelete();
    }
    
    /**
     * Confirm email through backdoor access
     * 
     * @returns {Object} Response data object
     */
    async backdoorEmailConfirmationTest() {
        this.authTask.getResultOf(AuthTask.CONFIRM_EMAIL);
        return await this.authTask.createAndDelete();
    }
    
    /**
     * Login user
     * 
     * @returns {Object} Response data object
     */
    async loginUser() {
        return await this.authTask
            .getResultOf(AuthTask.LOGIN)
            .createAndDelete();
    }
    
    /**
     * Delete user
     * 
     * @returns {Object} Response data object
     */
    async deleteUserTest() {
        this.authTask.getResultOf(AuthTask.DELETE);
        return await this.authTask.createAndDelete();
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
