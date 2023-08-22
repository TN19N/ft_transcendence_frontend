import React, { useState, useEffect } from "react";
import LogoBar from "./LogoBar";
import axios from "axios";
import { useNavigate } from "react-router";


interface ErrorResponse {
  response?: {
    status: number;
  };
}

const EditProfile = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentImage(`${process.env.SERVER_HOST}/api/v1/user/avatar`);
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];

    if (selectedImage) {
      const acceptedFormats = ["image/jpeg", "image/png"];
      if (!acceptedFormats.includes(selectedImage.type)) {
        setError("Unsupported file format. Only JPEG and PNG are allowed.");
        setCurrentImage(null);
        return;
      }
      const formData = new FormData();
      formData.append("avatar", selectedImage);
      try {
        await axios.post(
          `${process.env.SERVER_HOST}/api/v1/user/avatar`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error: ErrorResponse | any) {
        if (error.response?.status === 401) {
          navigate("/login");
          console.log("Unauthorized");
        } else {
          console.error(error);
        }
      }
      setError("");
      const imageURL = URL.createObjectURL(selectedImage);
      setCurrentImage(imageURL);
      
    }
  };

// Username update
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
    setError("");
  };

  const handleUsernameSubmit = async () => {
    if (newUsername.length){
      try {
        await axios.put(
          `${process.env.SERVER_HOST}/api/v1/user/profile`,
          { name: newUsername },
          { withCredentials: true }
        );
      } catch (error: ErrorResponse | any) {
        if (error.response?.status === 409) {
          setError("This username already exists");
        } else if (error.response?.status === 401) {
          navigate("/login");
          console.log("Unauthorized");
        } else {
          console.error(error);
        }
      }
    }
    else
      navigate('/profile');
  };

  return (
    <div className="flex flex-col bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%] ">
      <LogoBar />
      <div className="h-[78vh] self-center m-5 flex flex-col justify-center iphone:text-[12px]  tablet:text-[12px]">
        <div className="bg-InboxColor rounded-xl p-10 flex flex-col gap-2 items-center">
          <h1 className="text-center text-white text-2xl">Edit Profile</h1>
          <form
            
            encType="multipart/form-data"
            className="flex flex-col items-center gap-2"
          >
            {currentImage && (
              <img
                src={currentImage}
                alt="Profile"
                className="iphone:w-[80px] iphone:h-[80px] tablet:w-[150px] tablet:h-[150px] rounded-full"
              />
            )}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-blue-500">Change Image</span>
            </label>
          </form>

          <input
            className="w-full outline-none placeholder-gray-500 rounded-xl p-2 iphone:w-[200px] tablet:w-[200px] laptop:w-[200px]"
            maxLength={16}
            type="text"
            placeholder="Enter your New Username ..."
            value={newUsername}
            onChange={handleUsernameChange}
          />
          {error && <p className="text-red-500">{error}</p>}
            <button onClick={handleUsernameSubmit} className="w-37 h-10 bg-blue-500 text-white rounded-xl cursor-pointer iphone:text-[12px] tablet:text-[14px] p-2">
              Save changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
