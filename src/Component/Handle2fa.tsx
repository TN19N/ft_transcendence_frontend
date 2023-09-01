import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { errorMsg } from "./Poperror";
const Handle2fa = () => {
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    const isValid = /^\d{6}$/.test(inputPassword);
    setIsValidPassword(isValid);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`${process.env.SERVER_HOST}/api/v1/auth/2fa`, { code: password })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          
          errorMsg(errorMessage);
        }
      });
  };

  return (
    <div className="flex flex-col bg-background ring ring-white ring-opacity-10 rounded-lg w-[90%]">
      <div className="h-[78vh] self-center m-5 flex flex-col justify-center">
        <div className="bg-InboxColor rounded-xl imac:p-10 iphone:p-2 flex flex-col iphone:gap-2 iphone:w-[200px] iphone:h-[300px] tablet:w-[300px] tablet:h-[300px] laptop:w-[400px] laptop:h-[350px] imac:w-[400px] imac:h-[400px] justify-center">
          <h1 className="text-center text-white iphone:text-[14px] tablet:text-[16px] imac:text-[25px]">
            Enter Password
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 items-center"
          >
            <input
              className={`w-full outline-none placeholder:text-msgColorOff iphone:text-[8px] iphone:w-[70%] tablet:w-[60%] laptop:w-[45%] imac:w-[80%] tablet:text-[10px] imac:text-[14px] rounded-xl iphone:p-[10px] ${
                isValidPassword ? "" : "text-red-500"
              }`}
              maxLength={6}
              type="text"
              placeholder="Please enter your password ..."
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="submit"
              value="Submit"
              className="iphone:w-[70px] iphone:h-[20px] iphone:text-[12px] tablet:w-[90px] tablet:h-[30px] tablet:text-[16px] imac:text-[20px] imac:w-[100px] imac:h-[40px] self-center bg-BordeButtomColor text-white rounded-lg cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Handle2fa;
