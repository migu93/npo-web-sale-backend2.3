const Service = require('../models/ServiceSchema');

exports.getAllServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};

exports.getServiceById = async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (!service) {
        return res.status(404).send('Service not found');
    }
    res.json(service);
};

exports.createService = async (req, res) => {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
};

exports.updateService = async (req, res) => {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
        return res.status(404).send('Service not found');
    }
    res.json(updatedService);
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
