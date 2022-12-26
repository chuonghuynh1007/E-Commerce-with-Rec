var ctrl = module.exports;
const Product = require('../model/productModel');

// import { StatusCodes } from "http-status-codes";
const StatusCodes = require("http-status-codes")
const path = require("path")

const multer = require("multer")
const User = require("../model/userModel");

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "./public/images/"); // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        // file.fieldname + "-" 
        // + Date.now() + 
        file.originalname
      );
    },
  });

var upload = multer({
    storage: storage,
}).single('uploadImg');

ctrl.upload = async(req, res) =>{
    upload(req, res, function(err){
        res.json("Upload image successfuly!")
    })
}

ctrl.getAll = async (req, res) => {
    try{
        const products = await Product.find();

        if(!products) res.status(StatusCodes.StatusCodes.NOT_FOUND).json({ msg: "Empty database!" });
        res.status(StatusCodes.StatusCodes.OK).json({ products });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

ctrl.getByCate = async (req, res) => {
    try{
        const cate = req.query.category;
        const prods = await Product.find({ category: cate });
        if(!prods) res.status(StatusCodes.StatusCodes.NOT_FOUND).json({ msg: "No item belong to this category!" });
	    res.status(StatusCodes.StatusCodes.OK).json( prods );
    }
    catch (error) {
        console.error(error);
        res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

ctrl.detail = async (req, res) => {
    try{
        const { id: id } = req.params;
        const prod = await Product.findOne({ _id: id });
        if(!prod) res.status(StatusCodes.StatusCodes.NOT_FOUND).json({ msg: "This item hasnot existed yet!" });
        res.status(StatusCodes.StatusCodes.OK).json({ prod });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }

}

ctrl.addNew = async (req, res) => {
    var userId = "";
    const { prodName, color, email, size, price, cate, gender, image} = req.body;
    const discount = String(Number(price)*80/100);

    //console.log(req.body)

	// const image = "http://127.0.0.1:3001/images/" + req.file.filename;
    User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            res.json({success: false, data: "Wrong email!"});
          }
          //Match Password
          userId = user._id.toString()

          //console.log(userId)


        }).catch((error) => {
            console.log(error);
            throw(error);
          });
	try {
		const count = await Product.find({ prodName: prodName }).count()
        .catch((error) => {
            console.log(error);
            throw(error);
          });
		if (count === 0) {
			const newProd = await Product.create({ prodName:prodName, color:color, size:size, price:price, discount:discount, category:cate, gender:gender, createBy: userId, image:image})
            .catch((error) => {
                console.log(error);
                throw(error);
              });
			// upload(req, res, function(err){
            //     if (err) res.json(err)
            //     else res.json("Upload image successfuly!")
            // })
            res.status(StatusCodes.StatusCodes.OK).json({ msg: "Add new product success" });            
		} else {
			res.status(StatusCodes.StatusCodes.CONFLICT).json({ msg: "This item has existed!" });
		}
        
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
}

ctrl.delProd = async (req, res) => {
    try{
        const { id: id } = req.params;
        const prod = await Product.findOne({ _id: id });
        if(!prod) res.status(StatusCodes.StatusCodes.NOT_FOUND).json({ msg: "This item hasnot existed yet!" });
        await prod.remove();    
        res.status(StatusCodes.StatusCodes.OK).json({ msg: "Success! Item removed" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}