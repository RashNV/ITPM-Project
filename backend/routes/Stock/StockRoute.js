const router = require("express").Router();
const ApiResult = require("../../models/Common/ApiResult");
const stockModel = require("../../models/Stock/stockModel");

router.get('/GetStock', async (req, res) => {
    try {
        const resStock = await stockModel.find({});
        res.send(new ApiResult(true, resStock));
    } catch (error) {
        res.send(new ApiResult(false, "Error: " + error.message));
    }
});

router.post('/SaveStock', async (req, res) => {
    try {
        await new stockModel(req.body).save();
        res.send(new ApiResult(true, "Succesfully save stock details !"));
    } catch (error) {
        console.log("error")
        res.send(new ApiResult(false, "Error: " + error.message));
    }
});

router.post('/UpdateStock', async (req, res) => {
    try {
        await stockModel.findOneAndUpdate({ strItemID: req.body.strItemID }, req.body);
        res.send(new ApiResult(true, "Succesfully update stock details !"));
    } catch (error) {
        res.send(new ApiResult(false, "Error: " + error.message));
    }
});

router.post('/DeleteStock', async (req, res) => {
    try {
        await stockModel.findOneAndDelete({ strItemID: req.body.strItemID });
        res.send(new ApiResult(true, "Succesfully delete stock details !"));
    } catch (error) {
        res.send(new ApiResult(false, "Error: " + error.message));
    }
});
module.exports = router;