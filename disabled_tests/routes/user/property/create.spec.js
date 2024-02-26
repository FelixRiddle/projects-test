// const { v4: uuidv4 } = require("uuid");
// const dotenv = require("dotenv");

// const { AuthAPI, confirmUserEmailWithPrivateKey } = require("express-authentication");
// const { envServerUrl } = require("express-authentication/src/controllers/env/env")
// const { serverUrl } = require("express-authentication/src/controllers/env/env");

// // Jest doesn't support ECMASCRIPT
// const { PropertyAPI } = require("good-roots");

// test('Successful property creation', async function() {
//     // Setup dotenv
//     dotenv.config({
//         path: ".env"
//     });
    
//     // The api is at 'auth2'
//     const url = `${envServerUrl()}/auth2`;
    
//     const userPassword = "demacia_123";
//     const userData = {
//         name: "Garen",
//         email: `garen_${uuidv4()}@demacia.com`,
//         password: userPassword,
//         confirmPassword: userPassword
//     };
//     const api = new AuthAPI(userData, url);
    
//     // Create user and login
//     await api.registerUser();
//     await api.confirmUserEmailWithPrivateKey(userData.email);
//     await api.loginGetJwt();
//     console.log(`Property api: `, PropertyAPI);
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 3,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(propertyCreatedResult && propertyCreatedResult.propertyCreated).toBe(true);
// });

// // Test wrong ones
// // There are too many possibilities 😩 I will test some of them 
// it('Bad title', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "L",
//         description: "This is a luxury house",
//         rooms: 3,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad description', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury House",
//         description: "This",
//         rooms: 3,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad rooms quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 10,
//         parking: 2,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad parking quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 5,
//         bathrooms: 3,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad bathrooms quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad price quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 11,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Bad category quantity', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 5,
//         street: 'Norris Road 1223',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 4,
//         categoryId: 8,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });

// it('Street is not falsy', async function() {
//     const propertyApi = new PropertyAPI(api.instance);
    
//     // Create some property
//     const property = {
//         title: "Luxury house",
//         description: "This is a luxury house",
//         rooms: 4,
//         parking: 3,
//         bathrooms: 3,
//         street: '',
//         latitude: 35.0831751,
//         longitude: -90.022207,
//         priceId: 5,
//         categoryId: 4,
//         image: "",
//         // This is here but in the endpoint it does nothing
//         published: true,
//         userId: this.userId,
//     };
//     const propertyCreatedResult = await propertyApi.createProperty(property);
    
//     // Now delete every user property
//     await propertyApi.deleteAll();
    
//     expect(!(propertyCreatedResult && propertyCreatedResult.propertyCreated)).toBe(true);
// });
