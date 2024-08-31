import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import FileInput from "../common/Input/FileInput";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
// import { refEqual } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    
    if (title && desc && displayImage && bannerImage) {
        setLoading(true);
        //upload a file and gets downloads links
     try{
        const bannerImageRef = ref(
            storage,
            // `podcasts-bannerImage`
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
           await uploadBytes(bannerImageRef, bannerImage);
    
           const bannerImageUrl = await getDownloadURL(bannerImageRef)

        const displayImageRef = ref(
            storage,
            // `podcasts-bannerImage`
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
           await uploadBytes(displayImageRef, displayImage);
    
           const displayImageUrl = await getDownloadURL(displayImageRef)

           const podcastData = {
            title: title,
            discription: desc,
            bannerImage: bannerImageUrl,
            displayImage: displayImageUrl,
            createdBy: auth.currentUser.uid
           };

           const docRef = await addDoc(collection(db, "podcasts"), podcastData);
           setTitle("");
           setDesc("");
           setBannerImage(null);
           setDisplayImage(null);

          toast.success(" Podcast Created!");
          setLoading(false);


        }catch (e){
            toast.error(e.message)
            console.log(e)
            setLoading(false);
        }
       
    //   console.log(uploaded);
    //   toast.success("File uploaded");
    } else {
      toast.error("Please Enter All Values ");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };
  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />

      <FileInput
        accept={"Image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />
      <FileInput
        accept={"Image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />

      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
