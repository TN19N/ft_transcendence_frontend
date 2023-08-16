import  { useEffect, useState } from 'react';
import { SearchIcon } from './Icons';
import SugPeople from './SugPeople';
import axios from 'axios';

interface SugPeopleData {
  id: string;
  name: string;
  status: string;
}

const InvitePeople = () => {
  const [suggestedPeople, setSuggestedPeople] = useState<SugPeopleData[]>([]);
  const [searchPeople, setSearchPeople] = useState<string>("");
  
  useEffect(() => {
    axios.get(`${process.env.SERVER_HOST}/api/v1/user/search?query=${searchPeople}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setSuggestedPeople(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          window.location.href = '/login';
          console.log('Unauthorized');
        }
      });
  }, [searchPeople]);

  const first20SuggestedPeople = suggestedPeople.slice(0, 20);

  return (
    <section className="flex-1 laptop:flex-[2] flex">
      <div className="flex flex-col gap-2 bg-InboxColor w-full rounded-xl">
        <h4 className="text-white p-2 text-[10px] tablet:text-[14px] laptop:text-[22px] ">
          People you may Know
        </h4>
        <div className="flex flex-col items-center gap-2 overflow-hidden h-[70vh]">
          <div className="flex bg-background rounded-full p-1 w-[70%]">
            <input
              className="w-full text-msgColorOff bg-transparent pl-2 outline-none placeholder:text-msgColorOff text-[8px] tablet:text-[12px] laptop:text-[18px]"
              type="text"
              placeholder="Search..."
              value={searchPeople}
              onChange={(e) => setSearchPeople(e.target.value)}
            />
            <button>
              <SearchIcon className="fill-BordeButtomColor w-3 h-3 tablet:w-4 tablet:h-4 laptop:w-6 laptop:h-6 mr-1"/>
            </button>
          </div>
          <div className="flex flex-col  overflow-auto gap-3 tablet:flex-row tablet:flex-wrap tablet:justify-center mt-4 laptop:gap-12">
            {first20SuggestedPeople.map((person) => (
              <SugPeople key={person.id} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvitePeople;
