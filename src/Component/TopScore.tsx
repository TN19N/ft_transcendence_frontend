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
        <div className="flex flex-col gap-4 w-[32%] bg-InboxColor rounded-2xl pb-3 ">
            <div className="flex justify-between text-white text-2xl w-[100%] p-2 ">
                <div className="flex">
                    <TopScoreIcon className="w-8 h-8" />
                    Top Score
                </div>
                <span className="ml-auto text-xl">Wins</span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto h-full">
            {topScoresData.map((data, index) => (
                <div
                    key={index}
                    className="flex gap-3 items-center text-white text-xl ml-4 bg-background rounded-2xl p-3 w-[90%]"
                >
                    <img
                        src={Avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    {data.name}
                </div>
            ))}
            </div>
        </div>
    );
};

export default TopScore;

