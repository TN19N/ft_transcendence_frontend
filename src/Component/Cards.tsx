import avatar from '../assets/ahmaidi.png'
const Cards = () => {
    return (
    <div className="flex gap-2 border-b-[0.2px] border-b-ButtomMsgColor">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
        <div className="flex flex-col gap-1">
            <p className="text-msgColorOn text-[12px]">Ahmaidi</p>
            <p className="text-msgColorOff text-[10px]">Hello how are you tell me ore about what yooou did?</p>
        </div>
        <span className="text-white ml-auto">&#8942;</span>
    </div> 
    );
}

export default Cards;