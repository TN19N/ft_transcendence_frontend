import Avatar from '../assets/ahmaidi.png';
import { AddIcon } from './Icons';
const SugPeople = () => {
    return (
    <div className="flex gap-2 items-center text-white iphone:text-[10px] tablet:text-[12px] laptop:text-[18px] bg-background rounded-2xl p-2 laptop:gap-4">
    <img src={Avatar} alt="avatar" className="w-6 h-6 rounded-full tablet:w-8 tablet:h-8 laptop:w-14 laptop:h-14" />
    ahmaidi
    <button>
      <AddIcon className="w-7 h-7" />
    </button>
  </div>);
}

export default SugPeople;