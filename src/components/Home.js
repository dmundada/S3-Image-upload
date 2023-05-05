import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props
  const location = useLocation();
  const user = location.state ? location.state : JSON.parse(localStorage.getItem("user"));
  var timeOfDay;
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    timeOfDay = 'Morning';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Afternoon';
  } else {
    timeOfDay = 'Evening';
  }

  var navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("IN")
    }
    else {
      navigate('/login')
    }
  });

  return (
    user ?
      <div className="home">
        <div className="card text-white mb-3 home-container" >
          <h3 className="card-header bg-info text-center">Good {timeOfDay} Mr. {user.firstName} {user.lastName}</h3>
          <div className="card-body bg-light text-dark d-flex flex-row justify-content-around">
            <img className="img" src={user.image?user.image:'https://www.proton.se/Content/images/placeholder-image.jpg'} ></img>
            <div>
              <h5 className="card-title">Name: {user.firstName} {user.lastName}</h5>
              <h5 className="card-title">Mobile: {user.number}</h5>
              <h5 className="card-title">Email: {user.email}</h5>
            </div>
          </div>
        </div>
        <Notes showAlert={showAlert}></Notes>
      </div> : null
  );
};

export default Home;
