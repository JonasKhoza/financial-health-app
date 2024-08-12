import React from "react";
import Form from "../components/Profile/Form";
import styles from "./styles/profile.module.css";
import { ProfileDataInterface } from "../models/Profile/Profile.models";
import { SERVER_URL } from "../utils/server.utils";

async function getUserProfileData(userProfile: ProfileDataInterface) {
  //TURN THIS INTO A CUSTOM HOOK
  const res = await fetch(`${SERVER_URL}/users/auth/profile`, {
    method: "POST",
    body: JSON.stringify(userProfile),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
}

const Profile = () => {
  return (
    <div className={styles.profile_container}>
      <h1>Update Profile</h1>
      <Form getUserProfileData={getUserProfileData} />
    </div>
  );
};

export default Profile;
