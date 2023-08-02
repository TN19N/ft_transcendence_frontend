import Avatar from '../assets/ahmaidi.png';
import { AddIcon } from './Icons';
const SugPeople = () => {
    return (
    <div className="flex gap-2 items-center text-white text-lg bg-background rounded-2xl p-3">
    <img src={Avatar} alt="avatar" className="w-8 h-8 rounded-full" />
    ahmaidi
    <button>
      <AddIcon className="w-7 h-5" />
    </button>
  </div>);
}

export default SugPeople;