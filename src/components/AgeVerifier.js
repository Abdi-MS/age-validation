import { useState } from "react";
import DatePicker from "react-datepicker";
import { Alert } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "./AgeVerifier.css";

const AgeVerifier = () => {
  const [underageAlert, setUnderAgeAlert] = useState(false);
  const [redirectAlert, setRedirectAlert] = useState(false);

  const handleCloseAlert = () => {
    setUnderAgeAlert(false);
    setRedirectAlert(false);
  };

  const DPSubmit = (input) => {
    const dob = new Date(input);
    const today = new Date();
    const yearDiff = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    let age = yearDiff;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() > dob.getDate())) {
      age -= 1;
    }
    if (age >= 15) {
      setRedirectAlert(true);
      setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 3000);
    } else {
      setUnderAgeAlert(true);
    }
  };

  return (
    <div class="outter-wrapper">
      <div class="DPWrapper">
        <h2>
          Click the search bar to enter your date of birth. Enter month/year to
          shorten the search
        </h2>
        <DatePicker onSelect={DPSubmit} />
        {underageAlert && (
          <Alert severity="error" onClose={handleCloseAlert}>
            <strong>Underage Warning</strong>
            <br />
            You are not old enough to access "www.google.com"
          </Alert>
        )}
        {redirectAlert && (
          <Alert severity="success" onClose={handleCloseAlert}>
            <strong>Redirecting ... </strong>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AgeVerifier;
