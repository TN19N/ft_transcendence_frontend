import axios from "axios";

import { useNavigate } from "react-router-dom";
import { errorMsg } from "./Poperror";
interface Disableit {
  Disable: () => void;
}
const Disable2fa: React.FC<Disableit> = ({ Disable }) => {
  const navigate = useNavigate();
  const handleDisable = () => {
    axios
      .patch(`${process.env.SERVER_HOST}/api/v1/user/turnOff2fa`, {})
      .then(() => {
        Disable();
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
    <div>
      <button onClick={handleDisable}>Disable 2FA</button>
    </div>
  );
};

export default Disable2fa;
