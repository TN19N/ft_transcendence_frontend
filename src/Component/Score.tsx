import './Score.css';
import ButtonAvatar from './ButtonAvatar';
import { useState } from 'react';

interface MatchRecord {
    id: string;
    userId: string;
    opponentId: string;
    userScore: number;
    opponentScore: number;
  }
interface ScoreRecord {
    record: MatchRecord;
  }
const Score = ({record}:ScoreRecord) => {
    const [Winner, setWinner] = useState<string>("")
    if (record.userScore > record.opponentScore )
        setWinner('winner-left');
    else
        setWinner('winner-right');
    return (
        <div className={`flex w-full bg-background rounded-xl py-2 items-center text-white relative score-container ${Winner}`}>
            <div className='flex-1 flex items-center justify-center gap-3 iphone:text-[10px] tablet:text-[15px] imac:text-[24px]'>
            <ButtonAvatar id={record.userId}/>
                Ahmaidi
            </div>
            <span className='flex-2 flex iphone:text-[14px] tablet:text-[18px] imac:text-[22px] justify-center'>VS</span>
            <div className='flex-1 flex items-center justify-center gap-3 iphone:text-[10px] tablet:text-[15px] imac:text-[24px]'>
                <ButtonAvatar id={record.opponentId} />
                Ahmaidi
            </div>
        </div>
    );
}

export default Score;