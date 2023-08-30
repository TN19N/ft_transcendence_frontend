import './Score.css';
import ButtonAvatar from './ButtonAvatar';
import { useState, useEffect } from 'react';
import { Match } from './MatchHistory';
interface ScoreRecord {
    record: Match;
  }
const Score = ({record}:ScoreRecord) => {
    const [Winner, setWinner] = useState<string>("")
        useEffect(() => {
          if (record.userScore > record.opponentScore) {
            setWinner("winner-left");
          } else {
            setWinner("winner-right");
          }
        }, [record.userScore, record.opponentScore]);
    return (
      <div
        className={`flex w-full bg-background rounded-xl py-2 items-center text-white relative score-container ${Winner}`}
      >
        <div className="flex-1 flex  gap-3 iphone:text-[10px] tablet:text-[15px] imac:text-[24px] w-[40%]">
          <ButtonAvatar id={record.userId} />
          {record.userName}
        </div>
        <span className="flex-2 flex iphone:text-[14px] tablet:text-[18px] imac:text-[22px] justify-center">
          VS
        </span>
        <div className="flex-1 flex  gap-3 iphone:text-[10px] tablet:text-[15px] imac:text-[24px] w-[40%]">
          <ButtonAvatar id={record.opponentId} />
          {record.opponentName}
        </div>
      </div>
    );
}

export default Score;