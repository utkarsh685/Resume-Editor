import React from "react";
import axios from "axios";

function ResumeSection({ sectionName, content, onUpdate, isList }) {
  const handleChange = (e, index = null) => {
    if (isList) {
      const updated = [...content];
      updated[index] = e.target.value;
      onUpdate(sectionName, updated);
    } else {
      onUpdate(sectionName, e.target.value);
    }
  };

  const enhanceSection = async () => {
    const text = isList ? content.join(", ") : content;
    const res = await axios.post("http://localhost:8000/ai-enhance", {
      section: sectionName,
      content: text
    });
    const improved = res.data.enhanced;
    if (isList) {
      onUpdate(sectionName, improved.split(", "));
    } else {
      onUpdate(sectionName, improved);
    }
  };

  const addEntry = () => onUpdate(sectionName, [...content, ""]);
  const removeEntry = index => {
    const updated = content.filter((_, i) => i !== index);
    onUpdate(sectionName, updated);
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <h3>{sectionName.toUpperCase()}</h3>
      {isList ? (
        content.map((item, i) => (
          <div key={i}>
            <input value={item} onChange={(e) => handleChange(e, i)} />
            <button onClick={() => removeEntry(i)}>Remove</button>
          </div>
        ))
      ) : (
        <textarea value={content} onChange={handleChange} />
      )}
      {isList && <button onClick={addEntry}>Add</button>}
      <button onClick={enhanceSection}>Enhance with AI</button>
    </div>
  );
}

export default ResumeSection;