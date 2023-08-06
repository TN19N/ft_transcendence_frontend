import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import LogoBar from "./LogoBar";

export default function () {
  const [password, setPassword] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post("/api/user/enable2FA", { password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col bg-background ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <LogoBar />
      <div className="h-[78vh] self-center m-5 flex flex-col justify-center">
        <div className="bg-InboxColor rounded-xl imac:p-10 iphone:p-2 flex flex-col iphone:gap-2 iphone:w-[200px] iphone:h-[300px] tablet:w-[300px] tablet:h-[300px] laptop:w-[400px] laptop:h-[350px] imac:w-[400px] imac:h-[400px] justify-center">
            <h1 className="text-center text-white iphone:text-[14px] tablet:text-[16px] imac:text-[25px]">Enable 2FA</h1>
        <img
          src="https://i.ibb.co/0jZ3qYH/Group-1.png"
          alt="Authentication"
          className="iphone:w-[120px] iphone:h-[120px] tablet:w-[160px] tablet:h-[160px] imac:w-[250px] imac:h-[250px] self-center"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
          <input
            className="w-full text-msgColorOff outline-none placeholder:text-msgColorOff iphone:text-[8px] iphone:w-[70%] tablet:w-[60%] laptop:w-[45%] imac:w-[80%] tablet:text-[10px] imac:text-[14px] rounded-xl iphone:p-[5px]"
            type="text"
            placeholder="Please enter your password ..."
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="submit" value="Submit" className="iphone:w-[70px] iphone:h-[20px] iphone:text-[12px] tablet:w-[90px] tablet:h-[30px] tablet:text-[16px] imac:text-[20px] imac:w-[100px] imac:h-[40px] self-center bg-BordeButtomColor text-white rounded-lg cursor-pointer"
          />
        </form>
        </div>
      </div>
    </div>
  );
}

