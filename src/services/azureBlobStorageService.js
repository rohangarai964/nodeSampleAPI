const {BlobServiceClient} =require('@azure/storage-blob')
const fs=require('fs')

const uploadToAzureBlob = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Create blob service client
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

        // Generate a unique blob name (you can modify this)
        const blobName = localFilePath.split('\\').pop(); // Extracts file name
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Read file and upload
        const stream = fs.createReadStream(localFilePath);
        const uploadResponse = await blockBlobClient.uploadStream(stream);

        // Remove file after upload
        fs.unlinkSync(localFilePath);

        console.log(`File uploaded successfully to Azure: ${blockBlobClient.url}`);
        return blockBlobClient.url;

    } catch (error) {
        console.error("Azure Blob Upload Error:", error);
        fs.unlinkSync(localFilePath); // Remove file if upload fails
        return null;
    }
};
module.exports=uploadToAzureBlob