import { Button } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import c from "./styles/form.module.css";
import { ProfileDataInterface } from "../../models/Profile/Profile.models";

const initialProfileState = {
  salutation: "",
  firstName: "",
  lastName: "",
  username: "",
};

const Form: React.FC<{
  getUserProfileData: (userProfile: ProfileDataInterface) => void;
}> = ({ getUserProfileData }) => {
  const [phone, setPhone] = useState("");
  const [profileData, setProfileData] =
    useState<ProfileDataInterface>(initialProfileState);

  function onProfileDataChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setProfileData((prevV) => {
      return { ...prevV, [name]: value };
    });
  }

  function createProfile() {
    const userProfileData = {
      ...profileData,
      phone,
    };
    getUserProfileData(userProfileData);
  }

  return (
    <form className={c.form_container}>
      <div className={c.form_group}>
        <label htmlFor="salutation">Salutation</label>
        <select
          id="salutation"
          name="salutation"
          onChange={onProfileDataChange}
        >
          <option value="">--Select--</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
          <option value="Prof">Prof</option>
          <option value="Dr">Dr</option>
        </select>
      </div>
      <div className={c.form_group}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
          onChange={onProfileDataChange}
        />
      </div>
      <div className={c.form_group}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter last name"
          onChange={onProfileDataChange}
        />
      </div>
      <div className={c.form_group}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={onProfileDataChange}
        />
      </div>
      <div className={c.form_group}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <PhoneInput
          country={"za"}
          value={phone}
          onChange={setPhone}
          inputProps={{
            name: "phoneNumber",
            required: true,
            autoFocus: true,
          }}
          containerClass={c.phone_input_container}
          inputClass={c.phone_input}
        />
      </div>
      <div className={c.form_group}>
        <Button
          className={c.submit_button}
          variant="contained"
          onClick={createProfile}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
