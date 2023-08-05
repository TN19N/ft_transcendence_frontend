import {SearchIcon } from './Icons';
import SugPeople from './SugPeople';
const InvitePeople = () => {
    return (
        <section className="flex-1 laptop:flex-[2] flex">
        <div className="flex flex-col gap-2 bg-InboxColor w-full rounded-xl">
          <h4 className="text-white p-2 text-[10px] tablet:text-[14px] laptop:text-[22px] ">People you may Know</h4>
          <div className="flex flex-col items-center gap-2 overflow-hidden h-[70vh]">
          <div className="flex bg-background rounded-full p-1 w-[70%]">
                <input className="w-full  text-msgColorOff bg-transparent pl-2 outline-none placeholder:text-msgColorOff text-[8px] tablet:text-[12px] laptop:text-[18px]" type="text" placeholder="Search..." />
                <SearchIcon className="fill-BordeButtomColor w-3 h-3 tablet:w-4 tablet:h-4 laptop:w-6 laptop:h-6 mr-1" />
          </div>
            <div className="flex flex-col  overflow-auto gap-3 tablet:flex-row tablet:flex-wrap tablet:justify-center mt-4 laptop:gap-12">
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