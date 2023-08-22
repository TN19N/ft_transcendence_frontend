import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import LogoBar from "./LogoBar";
import { useNavigate } from 'react-router';

const Enable2FA = () => {
  const [QrCode, setQrCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.patch(`${process.env.SERVER_HOST}/api/v1/user/turnOn2fa`, {})
      .then((response) => {
        setQrCode(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
          console.log('Unauthorized');
        } else {
          console.error('Error ', error);
        }
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    const isValid = /^\d{6}$/.test(inputPassword);
    setIsValidPassword(isValid);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidPassword) {
      axios.patch(`${process.env.SERVER_HOST}/api/v1/user/enable2fa`, { code: password })
        .then((response) => {
          setQrCode(response.data);
          navigate('/home');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/login');
            console.log('Unauthorized');
          } else {
            console.error('Error ', error);
          }
        });
    }
  };

  return (
    <div className="flex flex-col bg-background ring ring-white ring-opacity-10 rounded-xl w-[90%]">
      <LogoBar />
      <div className="h-[78vh] self-center m-5 flex flex-col justify-center">
        <div className="bg-InboxColor rounded-xl imac:p-10 iphone:p-2 flex flex-col iphone:gap-2 iphone:w-[200px] iphone:h-[300px] tablet:w-[300px] tablet:h-[300px] laptop:w-[400px] laptop:h-[350px] imac:w-[400px] imac:h-[400px] justify-center">
          <h1 className="text-center text-white iphone:text-[14px] tablet:text-[16px] imac:text-[25px]">Check 2FA</h1>
          <img
            src={QrCode}
            alt="Authentication"
            className="rounded-xl iphone:w-[120px] iphone:h-[120px] tablet:w-[160px] tablet:h-[160px] imac:w-[250px] imac:h-[250px] self-center"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center mb-2">
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
              className={`iphone:w-[70px] iphone:h-[20px] iphone:text-[12px] tablet:w-[90px] tablet:h-[30px] tablet:text-[16px] imac:text-[20px] imac:w-[100px] imac:h-[40px] self-center bg-BordeButtomColor text-white rounded-lg cursor-pointer ${
                isValidPassword ? "" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!isValidPassword}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Enable2FA;
