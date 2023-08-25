interface DetailsProps {
  friendsNumber: number;
  wins: number;
  losses: number; 
}

interface ProfileInfoProps {
  ProfileInfo: DetailsProps | null;
}
export default function ProfileInfo({ ProfileInfo }: ProfileInfoProps) {
  return (
    <div className="flex w-[90%] gap-3 bg-background rounded-xl py-2">
      <div className="flex flex-1 flex-col items-center">
        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">
          Friends
        </span>
        {ProfileInfo && (
          <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
            {ProfileInfo.friendsNumber}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col items-center  border-x-2 border-white ">
        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">
          Win
        </span>
        {ProfileInfo && (
          <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
            {ProfileInfo.wins}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col items-center">
        <span className="iphone:text-[13px] tablet:text-[18px] imac:text-[25px] text-white">
          Lose
        </span>
        {ProfileInfo && (
          <span className="iphone:text-[10px] tablet:text-[15px] imac:text-[22px] text-white ">
            {ProfileInfo.losses}
          </span>
        )}
      </div>
    </div>
  );
}
