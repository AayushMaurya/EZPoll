import React, { useState } from "react";
import { contactCreater } from "../apis/contactapi";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await contactCreater(formData);
    if (data.success) {
      alert(data.message);
      setIsLoading(false);
    } else {
      alert(data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container how">
        <div className="row ">
          <h3 className="howTitle"> CONTACT AND FEEDBACK</h3>
        </div>
        <div className="row">
          <h3 className="howExp">Facing any Issues? Feel free to Contact Us</h3>
        </div>
        <div className="row formBody w-50 p-4">
          <form onSubmit={formHandler}>
            <input
              className="inp"
              type="email"
              placeholder="Email"
              name="email"
              onChange={changeHandler}
              value={formData.email}
            />
            <br />
            <input
              className="inp"
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={changeHandler}
              value={formData.subject}
            />
            <br />
            <textarea
              className="inp"
              type="text"
              name="message"
              placeholder="Message"
              onChange={changeHandler}
              value={formData.message}
            />
            <br />
            {!isLoading && <button type="submit" className="btn2 vloginBtn">submit</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
