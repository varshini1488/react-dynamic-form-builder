import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./App.css";

const fieldOptions = [
  { label: "Name", type: "text" },
  { label: "USN", type: "text" },
  { label: "Email", type: "text" },
  { label: "DOB", type: "text" },
  { label: "Year of Study", type: "dropdown", options: ["1st", "2nd", "3rd", "4th"] },
  { label: "Gender", type: "dropdown", options: ["Male", "Female", "Other"] },
  { label: "Hobby", type: "checkbox", options: ["Reading", "Music", "Traveling", "Gaming"] },
  { label: "Interested Domain", type: "checkbox", options: ["AI", "Web Dev", "Cybersecurity", "IoT"] },
];

function App() {
  const [selectedField, setSelectedField] = useState("");
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  const handleAddField = () => {
    if (!selectedField) return;
    const field = fieldOptions.find(f => f.label === selectedField);
    const id = Date.now();
    setFields([...fields, { ...field, id }]);
    setSelectedField("");
  };

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id, value) => {
    const prev = formData[id] || [];
    const updated = prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value];
    setFormData({ ...formData, [id]: updated });
  };

  const handleRemove = id => {
    setFields(fields.filter(f => f.id !== id));
    const updatedData = { ...formData };
    delete updatedData[id];
    setFormData(updatedData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="app">
      {/* 🌟 Title Added Here */}
      <h1 className="title">✨ Dynamic Form Builder ✨</h1>

      <div className="form-builder">
        <select value={selectedField} onChange={e => setSelectedField(e.target.value)}>
          <option value="">-- Select Field --</option>
          {fieldOptions.map((field, i) => (
            <option key={i} value={field.label}>
              {field.label}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={handleAddField}>Add Field</button>
      </div>

      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div className="form-field" key={field.id}>
            <label>{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                value={formData[field.id] || ""}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            )}

            {field.type === "dropdown" && (
              <select
                value={formData[field.id] || ""}
                onChange={e => handleChange(field.id, e.target.value)}
              >
                <option value="">-- Select --</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="checkbox-group">
                {field.options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={(formData[field.id] || []).includes(opt)}
                      onChange={() => handleCheckboxChange(field.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            <button className="delete-btn" onClick={() => handleRemove(field.id)} type="button">
              <FaTrash />
            </button>
          </div>
        ))}

        {fields.length > 0 && (
          <button className="submit-btn" type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default App;
