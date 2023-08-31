import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { errorMsg } from "./Poperror";
import { useUserContext } from "./UserContext";

interface Achievement {
  type: string;
  title: string;
  description: string;
}

const AchievementsComponent = () => {
  const userId = useUserContext();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const {id} = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/user/achievements?id=${(id)? id :userId?.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setAchievements(response.data);
        console.log("Response ", response.data);
        
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
  }, [navigate]);
console.log("Achiev 1",achievements);
  return (
    <div className="flex laptop:flex-col items-center gap-3 text-white">
      <span className=" iphone:text-[12px] tablet:text-[16px] tablet:self-center imac:text-[25px]">
        Achievement :
      </span>
      {achievements.length ? (
        achievements.map((achievement, index) => (
          <div className="flex flex-col" key={index}>
            <img
              src={`${process.env.SERVER_HOST}/api/v1/user/achievement/${achievement.type}`}
              alt="Achievement Avatar"
              className="w-2 h-2 iphone:w-5 iphone:h-5 tablet:w-12 tablet:h-12 laptop:w-[60px] laptop:h-[60px]"
            />
            <span
              title={achievement.description}
              className="iphone:text-[7px] tablet:text-[13px] laptop:text-[15px] font-bold"
            >
              {achievement.title}
            </span>
          </div>
        ))
      ) : (
        <span>Make your first Achievement</span>
      )}
    </div>
  );
};

export default AchievementsComponent;
