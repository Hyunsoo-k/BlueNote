import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbSzWsJTefyjS9LJdeCVKc4LuqFdH2PT0",
  authDomain: "bluenote-storage-f16b8.firebaseapp.com",
  projectId: "bluenote-storage-f16b8",
  storageBucket: "bluenote-storage-f16b8.appspot.com",
  messagingSenderId: "508868483806",
  appId: "1:508868483806:web:9961cad437ed7a1ead404f",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImageToFirebase = async (path: string, file: any) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Failed to upload image:", error);
  }
};

const deleteImageFromFirebase = async (path: string) => {
  try {
    const fileRef = ref(storage, path);

    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const dataURLToBlob = (dataURL: string) => {
  //data:[<MIME-type>][;charset=<encoding>][;base64],<data>

  const [header, data] = dataURL.split(",");
  const mimeString = header.split(":")[1].split(";")[0];
  const byteString = atob(data);
  const array = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i);
  }
  return new Blob([array], { type: mimeString });
};

export { uploadImageToFirebase, deleteImageFromFirebase, dataURLToBlob };
