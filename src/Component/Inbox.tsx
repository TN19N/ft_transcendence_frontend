import { SearchIcon } from "./Icons"
import Cards from "./Cards"
const Inbox = () => {
    return (
        <div className= 'flex flex-col gap-4 px-3 bg-InboxColor rounded-xl overflow-hidden h-[78vh]'>
            <div className="flex justify-between">
                <button className=" w-full p-4 text-msgColorOff active text-center">Chat</button>
                <button className="w-full p-4 text-msgColorOff text-center">Channel</button>
            </div>
            <div className="flex items-center gap-4  bg-background py-3 rounded-full px-4 ">
                <input className="w-full  text-msgColorOff bg-transparent outline-none placeholder:text-msgColorOff text-[12px]" type="text" placeholder="Search..." />
                <SearchIcon className="fill-BordeButtomColor w-4 h-4" />
            </div>
            <div className="flex flex-col gap-3 overflow-auto item-center h-[67vh]">
                {
                    [...Array(20)].map((_, i) => (
                        <div key={i}>
                            <Cards />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Inbox;