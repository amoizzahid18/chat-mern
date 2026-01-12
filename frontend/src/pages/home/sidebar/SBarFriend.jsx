import { useChatUI } from "../../ChatUIContext.jsx";

function SBarFriend({ id, profilePic, fullname, username, bio, email }) {
  const { openDm, setFriendsDM, showSideBar, setShowSidebar } = useChatUI();
  return (
    <div
      className="flex h-12 md:h-16 hover:bg-white/30 cursor-default duration-75 justify-start items-center px-2 md:px-0"
      onClick={() => {
        setFriendsDM({
          id: id,
          profilePic: profilePic,
          fullname: fullname,
          username: username,
          bio: bio,
          email: email,
        });
        console.log(fullname)
        openDm();
        if (showSideBar) setShowSidebar(false);
      }}
    >
      <div>
        <img className="size-7 md:size-8 rounded-3xl m-2 md:m-2" src={profilePic} />
      </div>

      <div className="flex flex-col ml-2 items-start">
        <div className="font-bold">{fullname}</div>
        <div className="text-xs opacity-60">{bio}</div>
      </div>
    </div>
  );
}

export default SBarFriend;
