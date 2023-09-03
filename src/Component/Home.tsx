import InvitePeople from "./InvitePeople";
import LogoBar from "./LogoBar";
import TopScore from "./TopScore";
import { memo } from "react";
import { useUserContext } from "./UserContext";

const Home = () => {
  const userId = useUserContext();

  return (
    <>
      {userId?.id ? (
        <div className="flex flex-col gap-4 bg-background ring ring-white ring-opacity-10 rounded-xl overflow-hidden w-[90%]">
          <LogoBar />
          <section className="flex gap-2 h-[78vh] w-[90%] overflow-hidden mb-6 m-auto">
            <InvitePeople />
            <TopScore />
          </section>
        </div>
      ) : null}
    </>
  );
};

export default memo(Home);
