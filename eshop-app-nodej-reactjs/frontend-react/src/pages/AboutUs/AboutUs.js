import React from "react";

const aboutUsStyle = {
  maxWidth: "900px",
  margin: "15px auto",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const titleStyle = {
  color: "#333",
  fontSize: "2rem",
  marginBottom: "20px",
};

const contentStyle = {
  lineHeight: "1.6",
  color: "#555",
};

const paragraphStyle = {
  marginBottom: "15px",
};

function AboutUs() {
  return (
    <div style={aboutUsStyle}>
      <h1 style={titleStyle}>AboutUs</h1>
      <div style={contentStyle}>
        <p style={paragraphStyle}>
          Our ecommerce application is a platform that aims to offer you the
          highest quality products at the most affordable prices. Since customer
          satisfaction is our priority, we evaluate all feedback and strive to
          further improve our services.
        </p>
        <p style={paragraphStyle}>
          You can trust the quality of the products on our site and enjoy safe
          shopping. We thank you.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
