import { TopScoreIcon } from "./Icons";
import Avatar from '../assets/ahmaidi.png';

const TopScore = () => {
    const topScoresData = [
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
        { name: 'Ahmaidi' },
    ];

    return (
        <div className="flex-1 tablet:flex-2 flex flex-col gap-4  bg-InboxColor rounded-2xl pb-3 ">
            <div className="flex justify-between text-white text-[8px] w-[95%] p-2 tablet:text-[16px] laptop:text-[18px]">
                <div className="flex gap-1 items-center">
                    <TopScoreIcon className="w-3 h-3 tablet:w-6 tablet:h-6 laptop:w-8 laptop:h-8"/>
                    Top Score
                </div>
                <span>Wins</span>
            </div>
            <div className="flex flex-col gap-2 overflow-auto h-full">
            {topScoresData.map((data, index) => (
                <div
                    key={index}
                    className="flex gap-3 items-center text-white iphone:text-[10px] tablet:text-[16px] ml-2 bg-background rounded-2xl p-2 w-[90%]"
                >
                    <img
                        src={Avatar}
                        alt="avatar"
                        className="rounded-full iphone:w-5 iphone:h-5 tablet:w-8 tablet:h-8"
                    />
                    {data.name}
                </div>
            ))}
            </div>
        </div>
    );
};

export default TopScore;

