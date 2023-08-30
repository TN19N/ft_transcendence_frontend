import { TopScoreIcon } from "./Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonAvatar from "./ButtonAvatar";
import { toast } from "react-toastify";

export interface TopScore {
  id: string;
  name: string;
  status: string;
  wins: number;
  losses: number;
}

const TopScoreComponent = () => {
  const [topScores, setTopScores] = useState<TopScore[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/user/leaderboard`, {
        withCredentials: true,
      })
      .then((response) => {
        setTopScores(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
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
  }, [navigate]);
  const Top10 = topScores.filter((top:TopScore) => top.wins > 0).slice(0, 10);
  return (
    <div className="flex-1 tablet:flex-2 flex flex-col gap-4 bg-InboxColor rounded-2xl pb-3">
      <div className="flex justify-between text-white text-[8px] w-[95%] p-2 tablet:text-[16px] laptop:text-[18px] imac:text-[22px]">
        <div className="flex gap-1 items-center">
          <TopScoreIcon className="w-3 h-3 tablet:w-6 tablet:h-6 laptop:w-8 laptop:h-8" />
          Top Score
        </div>
        <span>Wins</span>
      </div>
      <div className="flex flex-col gap-2 overflow-auto h-full">
        {Top10.length ? (
          Top10.map(
            (top) =>
              top.wins > 0 && (
                <div
                  key={top.id}
                  className="flex gap-3 items-center text-white iphone:text-[10px] tablet:text-[16px] ml-2 bg-background rounded-xl p-2 w-[90%]"
                >
                  <ButtonAvatar id={top.id} />
                  {top.name}
                </div>
              )
          )
        ) : (
          <div className="flex justify-center items-center text-white iphone:text-[10px] tablet:text-[16px] laptop:text-[24px] m-auto bg-background rounded-xl p-2 w-[90%] iphone:h-[20vh]">
            <span>No Matches Yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopScoreComponent;
