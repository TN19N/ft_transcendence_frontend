import { BlockIcon } from "./Icons"
import Avatar from '../assets/ahmaidi.png';

export default function Blocked() {
  return (
    <div className="flex w-[full] items-center text-white iphone:text-[10px] tablet:text-[15px] imac:text-[24px]">
      <div className='flex flex-col w-[40%] m-auto bg-background py-3 pl-3 rounded-xl'>
        <div className='flex w-[90%] justify-between  m-auto'>
          <div className='flex items-center gap-4 '>
            <img src={Avatar} alt="avatar" className="iphone:w-5 iphone:h-5 tablet:w-8 tablet:h-8 imac:w-12 imac:h-12 rounded-full" />
            <span>Ahmaidi</span>
          </div>
          <div className='flex items-center'>
          <button className='bg-buttonPlaybgColor p-2 rounded-[50%]'><BlockIcon className="w-8 h-8" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
