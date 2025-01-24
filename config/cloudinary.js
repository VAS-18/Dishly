import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
        cloud_name: 'dmqbbniy6',
        api_key: '664655462113854',
        api_secret:'MQQ51jfPn-MzhK2ipqiuyKOX384',
    });


export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            throw new Error("No file path provided");
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log(response);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

