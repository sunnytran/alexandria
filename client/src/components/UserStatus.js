import React from "react";
import { connect } from "react-redux";

import { getUserData } from "../store/actions/user";

const UserStatus = ({ user, getUserData }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    getUserData();
  };

  const modMessage =
    "Make sure users are behaving and not posting bad stuff! Sticky important posts, delete bad ones, and lock anything getting too out of hand";
  const userMessage =
    "You can post and reply to other users. Make sure you behave or a mod will have to intervene!";
  const guestMessage =
    "View posts and replies while you are here. If you want to participate in this community, contact me!";

  var message = guestMessage;
  if (user.role === "user") message = userMessage;
  else if (user.role === "mod") message = modMessage;

  return (
    <div>
      {console.log(user)}
      {"Hello " +
        user.username +
        "! You are a " +
        user.role +
        ". " +
        message +
        " "}
      <a
        href="/"
        class="no-underline text-blue-500 hover:underline hover:text-white"
        onClick={handleLogout.bind(this)}
      >
        {user.role !== "guest" ? "[Logout]" : "[Login]"}
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserData })(UserStatus);
