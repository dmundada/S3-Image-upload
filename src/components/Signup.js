import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName:"",
    email:"",
    number: "",
    password: "",
    image:""
  });

  const [file, setFile] = useState();
  const [imageUrlData, setImageUrlData] = useState('');
  let navigate = useNavigate();
 
  function handleImage(e) {
      setFile(e.target.files[0]);
  }

  const handleUpload =async (event)=>{
    event.preventDefault();
    const { url } = await fetch("http://localhost:5000/s3Url").then(res => res.json())
    console.log(url)
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    })
  
    const imageUrl = url.split('?')[0]
    console.log(imageUrl)
    setImageUrlData(imageUrl)
    setCredentials({ ...credentials, image: imageUrl })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {firstName, lastName, email, number, password, image } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        number,
        image
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem('user', JSON.stringify(json.user));
      navigate('/',{state: json.user});
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert(json.error, "danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="card form-class">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            First Name
          </label>
          <input
            type="name"
            className="form-control"
            name="firstName"
            id="firstName"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Last Name
          </label>
          <input
            type="name"
            className="form-control"
            name="lastName"
            id="lastName"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlFile1" className="form-label">Example file input</label>
          <input id="imageInput" type="file" accept="image/*" className="form-control" name="image" onChange={handleImage}/>
          <div className="image-upload">
          <button className="btn btn-success" onClick={handleUpload}>Upload</button>
          {imageUrlData && <p className="image-font">Image uploaded successfully!</p>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Mobile
          </label>
          <input
            type="number"
            className="form-control"
            name="number"
            id="number"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary text-center btn-right" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;