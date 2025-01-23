import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const dataURLToBlob = (dataURL: string) => {
  const [header, data] = dataURL.split(",");  // data:[<MIME-type>][;charset=<encoding>(선택사항)][;base64],<data>
  const mimeString = header.split(":")[1].split(";")[0];
  const byteString = atob(data); // base64 값을 디코딩
  const array = new Uint8Array(byteString.length); // 바이너리 데이터를 8비트 부호 없는 정수(0~255) 배열로 변환
  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i); // charCodeAt: 문자열에서 특정 위치에 있는 문자의 유니코드 값을 반환
  }
  return new Blob([array], { type: mimeString });
};

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

export { uploadImageToFirebase, deleteImageFromFirebase, dataURLToBlob };
