

import { storage } from '../lib/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function upload(file: File) {
    const storageRef = ref(storage, (new Date().getTime()) + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file)//.then((snapshot) => { })
    const url = await getDownloadURL(storageRef)
    return url
}



