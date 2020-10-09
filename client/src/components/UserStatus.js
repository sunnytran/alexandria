import React from "react";

const UserStatus = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const modMessage =
    "Make sure users are behaving and not posting bad stuff! Sticky important posts, delete bad ones, and lock anything getting too out of hand";
  const userMessage =
    "You can post and reply to other users. Make sure you behave or a mod will have to intervene!";
  const guestMessage =
    "View posts and replies while you are here. If you want to participate in this community, contact me!";

  var message = guestMessage;
  if (props.user.role === "user") message = userMessage;
  else if (props.user.role === "mod") message = modMessage;

  return (
    <div>
      {console.log(props.user)}
      Hello {props.user.username}! You are a {props.user.role}.&nbsp;
      {message}&nbsp;
      <a
        href="/"
        class="no-underline text-blue-500 hover:underline hover:text-white"
        onClick={handleLogout.bind(this)}
      >
        [Logout]
      </a>
    </div>
  );
};

export default UserStatus;
