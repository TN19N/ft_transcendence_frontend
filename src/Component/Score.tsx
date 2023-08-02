import Avatar from '../assets/ahmaidi.png';
const Score = () => {
    return (
        <div className="flex w-full bg-background rounded-xl py-2 items-center text-white relative">
                    <div className='flex-1 flex items-center justify-center gap-3 '>
                        <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                        Ahmaidi
                    </div>
                    <span className='flex-1 flex text-4xl justify-center '>VS</span>
                    <div className='flex-1 flex items-center justify-center gap-3 text-lg'>
                        <img src={Avatar} alt="avatar" className="w-10 h-10 rounded-full ml-5" />
                        Ahmaidi
                    </div>
                    <div className="rounded-rectangle"></div>
                </div>
    );
}

export default Score;