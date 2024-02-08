import express, {Response ,Request} from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from '../models/hotels';
import verifyToken from '../middelware/auth';
import { body } from 'express-validator';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 *1024
    }
})

router.post
    ("/", 
    verifyToken,[
        body("name").notEmpty().withMessage('name is required'),
        body("city").notEmpty().withMessage('city is required'),
        body("country").notEmpty().withMessage('country is required'),
        body("description").notEmpty().withMessage('description is required'),
        body("type").notEmpty().withMessage('Hotel type is required'),
        body("pricePerNight").notEmpty().isNumeric().
        withMessage('price  is required'),
        body("facilities").notEmpty().isArray().
        withMessage('facilities  are required'),
    ],
    upload.array("imageFiles", 6), 
    async(req : Request , res : Response)=>{
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        
        //1 upload the images to cloudinary 
        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdate = new Date();
        newHotel.userId = req.userId;

        const hotel =  new Hotel(newHotel);
        await hotel.save();
        res.status(201).send(hotel);

    } catch (error) {
        console.log("Error while creating a hotle", error);
        return res.status(200).json({message : "error"})
        
    }
})



router.get("/", verifyToken, async(req:Request, res:Response) => {

    try {
        const hotels = await Hotel.find({userId: req.userId})
        res.json(hotels);
    } catch (error) {
        res.status(500).json({message : "Error while fetching hotels"})
    }
})


router.get("/:id" , verifyToken ,async (req:Request , res : Response) => {
    const id = req.params.id.toString()

    try {
        const hotel = await Hotel.findOne({
            _id : id,
            userId : req.userId,
        })

        res.json(hotel)
    } catch (error) {
        return res.status(500).json({message : "Errro while fetching hotels"})
    }
})


router.put("/:hotelId", verifyToken, upload.array("imageFiles"),
async(req:Request , res: Response) => {
    try {
        const updatedHotel : HotelType = req.body;
        updatedHotel.lastUpdate = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId : req.userId,
        },
        updatedHotel,
        {new : true}
        )

        if(!hotel){
            return res.status(400).json({message : "hotel not found"})
        }

        const files = req.files as Express.Multer.File[]
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])]
        await hotel.save();
        res.status(201).json(hotel)
    } catch (error) {
        return res.status(500).json({message : "something went wrong"})
    }
})



async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}


export default router
