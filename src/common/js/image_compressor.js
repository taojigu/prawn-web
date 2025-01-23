class ImageCompressor {
    /**
     * Compress an image file to the specified size limit.
     * @param {File} file - The image file to be compressed.
     * @param {number} maxSize - The maximum allowed file size in KB.
     * @param {number} quality - Initial compression quality (0 to 1).
     * @returns {Promise<File>} - A promise resolving to the compressed image file.
     */
    static compress(file, maxSize = 100, quality = 0.9) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Scale the image to maintain aspect ratio
                    const scale = Math.min(1, 1000 / Math.max(img.width, img.height));
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;

                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Recursive function to compress the image
                    const compressImage = (currentQuality) => {
                        canvas.toBlob(
                            (blob) => {
                                if (blob.size / 1024 <= maxSize || currentQuality <= 0.1) {
                                    const compressedFile = new File([blob], file.name, {
                                        type: file.type,
                                    });
                                    resolve(compressedFile);
                                } else {
                                    // Retry with lower quality
                                    compressImage(currentQuality - 0.1);
                                }
                            },
                            file.type,
                            currentQuality
                        );
                    };

                    compressImage(quality);
                };

                img.onerror = (err) => reject(err);
                img.src = event.target.result;
            };

            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }
}

export default ImageCompressor;
