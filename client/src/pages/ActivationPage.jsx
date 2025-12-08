import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
    const [error, setError] = useState(false);
   

 useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
         try {
           const token = decodeURIComponent(activation_token);
           const res = await axios.post(`${server}/user/activation`, {
              activation_token: token,
           })
           console.log(res.data);
         } catch (error) {
            console.error(error.response.data);
            setError(true);
         }
      };
      sendRequest();
    }
  }, [activation_token]);

 return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;