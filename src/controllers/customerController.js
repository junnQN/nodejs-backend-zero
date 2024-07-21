// {key : value}
const {uploadSingleFile} = require("../services/fileService");
const {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService, putUpdateCustomerService, deleteCustomerService, deleteArrayCustomerService
} = require("../services/customerService");

const aqp = require('api-query-params');

module.exports = {
    postCreateCustomer: async (req, res) => {
        let {name, address, phone, email, description} = req.body;

        let imageUrl = ""
        if (!req.files || Object.keys(req.files).length === 0) {
            // Do nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
            image: imageUrl
        }

        let customer = await createCustomerService(customerData);

        return res.status(200).json(
            {
                errorCode: 0,
                data: customer
            }
        )
    },
    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers);
        if (customers) {
            return res.status(200).json(
                {
                    errorCode: 0,
                    data: customers
                }
            )
        } else {
            return res.status(200).json(
                {
                    errorCode: -1,
                    data: customers
                }
            )
        }
    },
    getAllCustomers: async (req, res) => {

        let limit = req.query.limit;
        let page= req.query.page;
        let name = req.query.name;
        let result = null;

        if(limit && page){
            result = await getAllCustomerService(limit, page, name, req.query)
        } else
            result = await getAllCustomerService()
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    putUpdateCustomer: async (req, res) => {
        let {id, name, email, address} = req.body;
        let result = await putUpdateCustomerService(id, name, email, address)
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    deleteCustomer: async (req, res) => {
        let id = req.body.id
        let result = await deleteCustomerService(id)
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    },
    deleteArrayCustomer: async (req, res) => {
        let ids = req.body.customersId;
        let result = await deleteArrayCustomerService(ids)
        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        )
    }
}