// const updateload = async (uri) => {
//     let formData = new FormData();
//     let localUri = uri;
//     let filename = localUri.split('/').pop();

import requestApi from "../request/request";

//     // Infer the type of the image
//     let match = /\.(\w+)$/.exec(filename);
//     let type = match ? `image/${match[1]}` : `image`;

//     formData.append('multipartFile', { uri: localUri, name: filename, type });
//     try {
//       let response = axios.post('http://10.0.2.2:8080/api/v1/uploads/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Accept': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//         },
//       }).then((response) => {
//         setNameImage(response.data);
//       }).catch((error) => {
//         console.log(error);
//       });
     
//     } catch (error) {
//       console.error('Upload failed:', error);
//       Alert.alert('Upload failed!', 'An error occurred while uploading image.');
//     }
//   }
const updateload = async (uri) => {
    let formData = new FormData();
    let localUri = uri;
    let filename = localUri.split('/').pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('multipartFile', { uri: localUri, name: filename, type });
    const name = await requestApi('/uploads/upload', 'POST', formData, null,'multipart/form-data')
    .then((response) => {
        return response.data;
    }).catch((error) => {
        alert('Upload failed!', 'An error occurred while uploading image.');
        console.log(error);
    });
    return name;
}

export default updateload;
