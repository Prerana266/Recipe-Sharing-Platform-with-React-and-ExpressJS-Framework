const Recipes=require("../models/recipe")
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "recipe-sharing-platform" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(fileBuffer);
    });
};








const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
}

const addRecipe = async (req, res) => {
    try {
        console.log(req.user);

        const { title, ingredients, instructions, time } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({
                message: "Required fields can't be empty"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Recipe image is required"
            });
        }

        const result = await uploadToCloudinary(req.file.buffer);

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: result.secure_url,
            createdBy: req.user.id
        });

        return res.json(newRecipe);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Error while adding recipe",
            error: err.message
        });
    }
};

const editRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;

        let recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        let coverImage = recipe.coverImage;

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            coverImage = result.secure_url;
        }

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            {
                title,
                ingredients,
                instructions,
                time,
                coverImage
            },
            { new: true }
        );

        return res.json(updatedRecipe);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Error while updating recipe",
            error: err.message
        });
    }
};
const deleteRecipe=async(req,res)=>{
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}