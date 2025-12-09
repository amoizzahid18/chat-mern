import { useChatUI } from "../../ChatUIContext.jsx";

function SBarFriend({ id, profilePic, fullname, username, bio, email }) {
  const { openDm, setFriendsDM } = useChatUI();
  return (
    <div
      className="flex h-16 hover:bg-white/30 cursor-default duration-75 justify-start items-center"
      onClick={() => {
        setFriendsDM({
          id: id,
          profilePic: profilePic,
          fullname: fullname,
          username: username,
          bio: bio,
          email: email,
        });
        openDm();
      }}
    >
      <div>
        <img className="size-8 rounded-4xl m-2" src={profilePic} />
      </div>

      <div className="flex flex-col ml-2 items-start">
        <div className="font-bold">{fullname}</div>
        <div className="text-xs opacity-60">{bio}</div>
      </div>
    </div>
  );
}

export default SBarFriend;
