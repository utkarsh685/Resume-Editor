import React, { useState } from "react";
import axios from "axios";
import ResumeEditor from "./components/ResumeEditor";

function App() {
  const [resume, setResume] = useState({
    name: "John Doe",
    summary: "Experienced developer...",
    experience: ["Company A - Developer", "Company B - Intern"],
    education: ["B.Tech - ABC University"],
    skills: ["JavaScript", "Python"]
  });

  const saveResume = async () => {
    await axios.post("http://localhost:8000/save-resume", { resume });
    alert("Resume saved successfully!");
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
  };

  return (
    <div>
      <h1>Resume Editor</h1>
      <ResumeEditor resume={resume} setResume={setResume} />
      <button onClick={saveResume}>Save Resume</button>
      <button onClick={downloadResume}>Download JSON</button>
    </div>
  );
}

export default App;