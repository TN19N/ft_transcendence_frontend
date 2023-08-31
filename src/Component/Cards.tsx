// @ts-nocheck
const Cards = (props :any) => {
    return (
    <div className={`flex gap-2 ${props.chosen ? "bg-[#01101F]" : ""} border-b-[0.2px] py-1 px-2 border-b-ButtomMsgColor hover:bg-blue-600`} onClick={() => {props.setChatId(props.id);props.setName(props.name)}}>
        <img src={props.avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
        <div className="flex flex-col gap-1 justify-center">
            <p className="text-msgColorOn text-[12px] imac:text-[16px]">{props.name}</p>
            <p className="text-msgColorOff text-[10px] imac:text-[14px] mb-2 w-[12em] truncate overflow-hidden">{props.message}</p>
        </div>
    </div> 
    );
}

export default Cards;