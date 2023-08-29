import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import Score from "./Score";
import { toast } from "react-toastify";

export interface Match {
  id: string;
  opponentId: string;
  opponentName: string;
  opponentScore: number;
  userId: string;
  userName: string;
  userScore: number;
}
interface MatchHistoryProps {
  id: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ id }) => {
  const [records, setRecords] = useState<Match[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/game/record?id=${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
  navigate("/login");
} else {
  const errorMessage = error.response?.data?.message || "An error occurred";
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_LEFT,
  });
}
      });
  }, []);
  return (
    <div className="flex flex-col gap-3 !overflow-auto">
      {records.length !== 0 ? (
        <>
          {records.map((record) => (
            <Score key={record.id} record={record} />
          ))}
        </>
      ) : (
        <div className="flex bg-background p-3 rounded-xl  justify-center text-white text-[13px] tablet:text-[18px] laptop:text-[20px] imac:text-[24px]">
          <span>No Matches Yet</span>
        </div>
      )}
    </div>
  );
};

export default MatchHistory;
