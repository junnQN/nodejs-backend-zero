const Customer = require("../models/customer");
const res = require("express/lib/response");

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            email: customerData.email,
            address: customerData.address,
            phone: customerData.phone,
            description: customerData.description,
            image: customerData.image,
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayCustomerService = async (arr) => {
    try{
        let result = await Customer.insertMany(arr)
        return result
    } catch (error){
        console.log(error);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService
}