const { UserAPI } = require("express-authentication");

// Precision level 2
const REGISTER = 1;
const CONFIRM_EMAIL = 2;
const LOGIN = 3;
const DELETE = 4;

/**
 * Authentication tasks
 */
const mod = module.exports = class AuthTask {
    fetchResult = REGISTER;
    
    constructor(api, userData) {
        this.api = api;
        this.userData = userData;
    }
    
    /**
     * Create a user
     */
    async create() {
        let result = undefined;
        
        // --- Register ---
        const registerRes = await this.api.registerUser();
        if(this.fetchResult === REGISTER) {
            result = registerRes;
        }
        
        // Register may have failed, in that case, let's not continue
        if(!registerRes.userRegistered) {
            return result;
        }
        
        // --- Confirm user email ---
        const confirmUserEmailRes = await this.api.confirmUserEmailWithPrivateKey(this.userData.email);
        if(this.fetchResult === CONFIRM_EMAIL) {
            result = confirmUserEmailRes;
        }
        
        // Failure check
        if(!confirmUserEmailRes.emailConfirmed) {
            return result;
        }
        
        // --- Login user to be able to delete it ---
        const loginRes = await this.api.loginGetJwt();     
        if(this.fetchResult === LOGIN) {
            result = loginRes;
        }
        
        // We can't return here, the test should delete the user
        // // Failure check
        // if(!loginRes.loggedIn) {
        //     return result;
        // }
        
        return result;
    }
    
    /**
     * Create confirm and delete user
     * 
     * @returns {Object} Response data
     */
    async createAndDelete() {
        let result = await this.create();
        
        // --- Delete user ---
        // User api
        const userApi = UserAPI.fromAuthenticatedAPI(this.api);
        
        // Delete user
        const deleteRes = await userApi.delete();
        if(this.fetchResult === DELETE) {
            result = deleteRes;
        }
        
        return result;
    }
    
    /**
     * Get result
     * 
     * Get the result of a given task
     */
    getResultOf(taskId) {
        this.fetchResult = taskId;
        
        return this;
    }
};

mod.REGISTER = REGISTER;
mod.CONFIRM_EMAIL = CONFIRM_EMAIL;
mod.LOGIN = LOGIN;
mod.DELETE = DELETE;
