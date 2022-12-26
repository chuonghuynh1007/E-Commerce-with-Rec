var ctrl = module.exports;
const Bill = require('../model/billModel');
const hsc = require("http-status-codes");

ctrl.cart = async (req, res) => {
    try{
        const { id: id } = req.params;
        const bill = await Bill.findOne({ _id: id });
        if(!bill) res.status(hsc.StatusCodes.NOT_FOUND).json({ msg: "This bill hasnot existed yet!" });
        res.status(hsc.StatusCodes.OK).json({ bill });
    } catch (error) {
        console.error(error);
        res.status(hsc.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

ctrl.addCart = async (req, res) => {
	const createdBy = req.user.userId;
    const item = req.prod.prodID;
    const price = req.prod.discount;
	try {
		const count = await Bill.find({ createBy: createdBy }).count();
		if (count === 0) {
			const bill = await Bill.create({ createBy: createdBy, totalPrice: price });
			const newItem = {
				product: item,
			};
			await bill.updateOne({ $push: { items: newItem } });
			res.status(hsc.StatusCodes.OK).json({ msg: "Create bill success" });
		} else {
			const bill = await Bill.findOne({ createBy: createdBy });
			const newItem = {
				product: item,
			};
            const total = String(Number(bill.totalPrice) + Number(price));
			await bill.updateOne({ $push: { items: newItem }, totalPrice: total });
			res.status(hsc.StatusCodes.OK).json({ msg: "Update bill success" });
		}
	} catch (error) {
		console.error(error);
		res.status(hsc.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
}

ctrl.alterCart = async (req, res) => {
    // const { id: id } = req.params;

	// const bill = await Bill.findOne({ _id: id });
	// if (!bill) {
	// 	throw new NotFoundError(`No bill with id :${id}`);
	// }

	// const billName = req.body.billName;
	// const image = "http://127.0.0.1:5000/images/" + req.file.filename;

	// checkPermissions(req.user, bill.createdBy);

	// const newImage = {
	// 	image: image,
	// };
	// const updatedbill = await Bill.findOneAndUpdate(
	// 	{ _id: id },
	// 	{ billName },
	// 	{
	// 		$push: {
	// 			list_image: newImage,
	// 		},
	// 	},
	// 	{
	// 		new: true,
	// 		runValidators: true,
	// 	}
	// );
	// res.status(StatusCodes.OK).json({ updatedbill });
}

ctrl.delCart = async (req, res) => {
    try{
        const { id: id } = req.params;
        const bill = await Bill.findOne({ _id: id });
        if(!bill) res.status(hsc.StatusCodes.NOT_FOUND).json({ msg: "This bill hasnot existed yet!" });
        await bill.remove();    
        res.status(hsc.StatusCodes.OK).json({ msg: "Success! Bill was paid" });
    } catch (error) {
        console.error(error);
        res.status(hsc.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
