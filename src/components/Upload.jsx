import React, { useState } from "react";
import "./compo.css";
import loader from "./Lightning.gif";

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("video", formData.video);

      const resp = await fetch(`${import.meta.env.VITE_BACKEND}/data/upload`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      if (!resp.ok) {
        console.error(await resp.text());
      } else {
        alert("Uploaded Successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="upload-loading">
      <img src={loader} alt="loader" className="upload-loader" />
    </div>
  ) : (
    <div className="upload-container">
      <h2 className="edukari-title">EduKARI</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
        <input type="text" name="title" placeholder="Video Title" value={formData.title} onChange={handleChange} className="upload-input" required />
        <textarea name="description" placeholder="Video Description" value={formData.description} onChange={handleChange} className="upload-textarea" required />
        <input type="file" name="video" accept="video/*" onChange={handleChange} className="upload-file-input" required />
        <button type="submit" className="upload-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Upload;
