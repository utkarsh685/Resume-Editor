import React from "react";
import ResumeSection from "./ResumeSection";

function ResumeEditor({ resume, setResume }) {
  const updateSection = (key, value) => {
    setResume(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <ResumeSection sectionName="name" content={resume.name} onUpdate={updateSection} />
      <ResumeSection sectionName="summary" content={resume.summary} onUpdate={updateSection} />
      <ResumeSection sectionName="experience" content={resume.experience} onUpdate={updateSection} isList />
      <ResumeSection sectionName="education" content={resume.education} onUpdate={updateSection} isList />
      <ResumeSection sectionName="skills" content={resume.skills} onUpdate={updateSection} isList />
    </div>
  );
}

export default ResumeEditor;