const path = require('path');

const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // remember to create  the upload folder first
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    // get image extension
    let extName = path.extname(fileObject.name);

    // get image 's name (without extension)
    let baseName = path.basename(fileObject.name, extName);

    // create final path
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    // Use the mv() method to place the file somewhere on your server

    try{
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null,
        }
    } catch(error) {
        console.log(">>> check error: ", error);
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(error)
        }
    }
}

const uploadMultipleFiles = async (filesArr) => {
    try{
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        let resultArr= []
        let countSuccess = 0
        for (let i = 0; i < filesArr.length; i++) {
            // get image extension
            let extName = path.extname(filesArr[i].name);

            // get image 's name (without extension)
            let baseName = path.basename(filesArr[i].name, extName);

            // create final path
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;

            try{
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    filename: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }
        return{
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error){
        console.log(">>> check error: ", error);
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(error)
        }
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
}