const models = require("../models");
const { getInstanceById } = require("../services/modelService");
//const { validateName } = require("../services/validationService");
const { validationResult } = require('express-validator');
const { categoryTransformer } = require("../transformers/categoryTransformer");
const store = async (req, res, next) => {
    console.log(req.admin)
    const result = {
        success: true,
        data: null,
        messages: [],
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const ad = await models.Category.create({
        companyId: req.body.name,
        target: req.body.target,
        photo: req?.file?.filename,
    });
    if (ad) {
        result.data = categoryTransformer(ad);
        result.messages.push("Ad created successfully");
    } else {
        result.success = false;
        result.messages.push("Please try again later");
    }
    return res.send(result);
};
const index = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: [],
    };
    const ads = await models.Ad.findAll();
    result.data = ads;
    return res.send(result);
};
const update = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: [],
    };
    const { companyId = "", target = "", photo = "" } = req.body;
    const item = await getInstanceById(req.params.id, "Ad");
    if (item.success) {
       
            result.success = true;
            await item.instance.update({
                companyId,
                target,
                photo
            });
            result.data = item.instance;
            result.messages.push("Ad updated successfully");
        
    } else {
        result.messages = [...item.messages];
    }
    res.status(item.status);
    return res.send(result);
};
const show = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: [],
    };
    const item = await getInstanceById(req.params.id, "Ad");
    if (item.success) {
        result.success = true;
        result.data = item.instance.dataValues;
    }
    result.messages = [...item.messages];
    res.status(item.status);
    return res.send(result);
};

const destroy = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: [],
    };
    const item = await getInstanceById(req.params.id, "Ad");
    if (item.success) {
        result.success = true;
        await item.instance.destroy();
        result.messages.push("Ad deleted successfully");
    } else {
        result.messages = [...item.messages];
    }
    res.status(item.status);
    return res.send(result);
};
module.exports = {
    store,
    index,
    show,
    update,
    destroy,
};