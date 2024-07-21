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
    try {
        let result = await Customer.insertMany(arr)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomerService = async (limit,page,name) => {
    try {
        let result = null;
        if (limit && page){
            let offset = (page - 1) * limit;
            if(name){
                result = await Customer.find(
                    {
                        "name": { $regex: '.*' + name + '.*' }
                    }
                ).skip(offset).limit(limit).exec();
            } else
                result = await Customer.find({}).skip(offset).limit(limit).exec();
        }
        else
            result = await Customer.find({});
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const putUpdateCustomerService = async (id, name, email, address) => {
    try {
        let result =
            await Customer.updateOne({_id: id}, {name, email, address});
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteCustomerService = async (id) => {
    try{
        let result = await Customer.deleteById(id)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteArrayCustomerService = async (arrIds) => {
    try{
        let result = await Customer.delete({ _id: { $in: arrIds } });
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService,
    putUpdateCustomerService,
    deleteCustomerService,
    deleteArrayCustomerService
}