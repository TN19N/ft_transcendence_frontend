import avatar from '../assets/ahmaidi.png'
const Cards = () => {
    return (
    <div className="flex gap-2 border-b-[0.2px] border-b-ButtomMsgColor">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
        <div className="flex flex-col gap-1">
            <p className="text-msgColorOn text-[12px] imac:text-[16px]">Ahmaidi</p>
            <p className="text-msgColorOff text-[10px] imac:text-[14px] mb-2 truncate">Hello how are you tell me ore about what yooou did dggsdg sddg sd gsd gs dg sd?</p>
        </div>
        <span className="text-white ml-auto">&#8942;</span>
    </div> 
    );
}

export default Cards;