import {SearchIcon } from './Icons';
import SugPeople from './SugPeople';
const InvitePeople = () => {
    return (
        <section className="flex-1 flex gap-2">
        <div className="flex flex-col gap-2 bg-InboxColor w-full rounded-xl">
          <h4 className="text-white p-2 text-[10px] tablet:text-[14px] laptop:[18xp]">People you may Know</h4>
          <div className="flex flex-col items-center gap-2 overflow-hidden h-[70vh]">
          <div className="flex bg-background rounded-full p-1 w-[70%]">
                <input className="w-full  text-msgColorOff bg-transparent outline-none placeholder:text-msgColorOff text-[8px] tablet:text-[12px]" type="text" placeholder="Search..." />
                <SearchIcon className="fill-BordeButtomColor w-3 h-3 tablet:w-4 tablet:h-4" />
          </div>
            <div className="flex flex-col gap-1 overflow-auto tablet:flex-row tablet:flex-wrap tablet:justify-center">
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
             <SugPeople />
            </div>
          </div>
        </div>
      </section>
    );
}


export default InvitePeople;