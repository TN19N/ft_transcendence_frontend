import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
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
