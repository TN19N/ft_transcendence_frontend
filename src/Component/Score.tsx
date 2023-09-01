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
        <div className="flex-1 flex justify-evenly items-center iphone:text-[12px] tablet:text-[15px] imac:text-[24px] w-[40%]">
          <ButtonAvatar id={record.userId} />
          <span className="iphone:min-w-[40px]  tablet:min-w-[140px] laptop:min-w-[180px]">
            {record.userName}
          </span>
        </div>
        <span className="flex-2 flex iphone:text-[9px] tablet:text-[18px] imac:text-[22px] justify-center">
          VS
        </span>
        <div className="flex-1 flex  justify-evenly items-center iphone:text-[12px] tablet:text-[15px] imac:text-[24px] w-[40%]">
          <ButtonAvatar id={record.opponentId} />
          <span className="iphone:min-w-[40px]  tablet:min-w-[140px] laptop:min-w-[180px]">
            {record.opponentName}
          </span>
        </div>
      </div>
    );
}

export default Score;