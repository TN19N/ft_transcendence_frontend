import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Score from "./Score";

interface Record {
  id: string;
  userId: string;
  opponentId: string;
  userScore: number;
  opponentScore: number;
}

export default function MatchHistory() {
  const [records, setRecords] = useState<Record[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_HOST}/api/v1/game/record`, { withCredentials: true })
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate('/login');
          console.log('Unauthorized');
        }
      });
  }, [navigate]);

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
}

