import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "dxlcaoneq",
    api_key: "194621958231153",
    api_secret: "RihEwpmXvaH6CM9uACo17Q6fOo4",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'yoga-videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi'], 
        transformation: [{ quality: 'auto' }], 
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 
    }
});
export default upload;