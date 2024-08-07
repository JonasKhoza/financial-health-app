import React from "react";
import Form from "../components/Profile/Form";
import styles from "./styles/profile.module.css";
import { ProfileDataInterface } from "../models/Profile/Profile.models";

function getUserProfileData(userProfile: ProfileDataInterface) {
  console.log(userProfile);
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
