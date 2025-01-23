import axios from '../../utils/axios'

export function uploadImage(file) {
    try {
        if (!file) {
            throw new Error("No file provided.");
        }
        if (!file || !(file instanceof File)) {
            throw new Error("Invalid file. Please provide a valid File object.");
        }

        let body = new FormData();
        body.append('file',file,file.name);
        let config = {
            headers:{ 'Content-Type': 'multipart/form-data' }
        };
        return axios.post("/api/v1/prawn/aws/upload/image",body,config);

    } catch (error) {
        console.error("Error uploading image:", error.message);
        throw error;
    }
}
