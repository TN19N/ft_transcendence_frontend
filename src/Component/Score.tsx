import Avatar from '../assets/ahmaidi.png';
const Score = () => {
    return (
        <div className="flex w-full bg-background rounded-xl py-2 items-center text-white relative">
                    <div className='flex-1 flex items-center justify-center gap-3 iphone:text-[10px] tablet:text-[15px]'>
                        <img src={Avatar} alt="avatar" className="iphone:w-5 iphone:h-5 tablet:w-8 tablet:h-8 rounded-full" />
                        Ahmaidi
                    </div>
                    <span className='flex-2 flex iphone:text-[14px] tablet:text-[18px] justify-center '>VS</span>
                    <div className='flex-1 flex items-center justify-center gap-3 iphone:text-[10px] tablet:text-[15px]'>
                        <img src={Avatar} alt="avatar" className="iphone:w-5 iphone:h-5 tablet:w-8 tablet:h-8 rounded-full" />
                        Ahmaidi
                    </div>
                    <div className="rounded-rectangle"></div>
                </div>
    );
}

export default Score;