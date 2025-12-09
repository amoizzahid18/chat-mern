import SBarFriend from "./SBarFriend";

function SidebarFriends({ friends }) {
  return (
    <div className=" bg-white/20 text-white border border-white/30 w-full my-4 shadow-md h-full min-h-120 rounded-box">
      <div className="max-h-[490px]   overflow-y-scroll text-center">
        {friends.length !== 0 ? (
          friends.map((friend) => (
            <SBarFriend
              key={friend._id} // always add a unique key in map
              id={friend._id}
              fullname={friend.fullname}
              username={friend.username}
              bio={friend.bio}
              profilePic={friend.profilePic}
              email={friend.email}
            />
          ))
        ) : (
          <>
            <div className="text-xl mx-2 text-wrap font-bold min-h-96 flex items-center justify-center">
              You don't have any friends yet.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarFriends;
