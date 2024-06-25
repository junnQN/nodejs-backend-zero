// {key : value}
const {uploadSingleFile} = require("../services/fileService");
const {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService, putUpdateCustomerService
} = require("../services/customerService");

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
        let result = await getAllCustomerService()
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
    }
}