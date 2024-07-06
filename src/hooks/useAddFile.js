import { storage } from "../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";

export const UseAddFile = () => {
  const uploadFile = async (fileUpload) => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  };
  return { uploadFile };
};
