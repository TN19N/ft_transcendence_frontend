import {SearchIcon } from './Icons';
import SugPeople from './SugPeople';
const InvitePeople = () => {
    return (
        <section className="flex gap-2 w-[68%]">
        <div className="flex flex-col gap-2 bg-InboxColor w-full rounded-xl">
          <h4 className="text-white p-4 text-2xl">People you may Know</h4>
          <div className="flex flex-col items-center gap-2 ">
          <div className="flex bg-background rounded-full p-3 w-[50%]">
                <input className="w-full  text-msgColorOff bg-transparent outline-none placeholder:text-msgColorOff text-lg" type="text" placeholder="Search..." />
                <SearchIcon className="fill-BordeButtomColor w-6 h-6" />
            </div>
            <div className="flex gap-6 items-center align-center px-10">
             <SugPeople />
             <SugPeople />
             <SugPeople /> 
            </div>
            <div className="flex gap-6 items-center align-center px-10 ">
              <SugPeople />
              <SugPeople />
              <SugPeople />
            </div>
            <div className="flex gap-6 items-center align-center px-10 ">
              <SugPeople />
              <SugPeople />
              <SugPeople />
            </div>
            <div className="flex gap-6 items-center align-center px-10">
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