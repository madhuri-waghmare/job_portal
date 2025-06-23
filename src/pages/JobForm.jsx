import { useState, useEffect } from "react";

function JobForm({ editingJob, onSubmit }) {
  const [formData, setFormData] = useState({ title: "", company: "" });

  useEffect(() => {
    if (editingJob) {
      setFormData({ title: editingJob.title, company: editingJob.company });
    } else {
      setFormData({ title: "", company: "" });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editingJob?.id || null, formData);
    setFormData({ title: "", company: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Job Title"
        required
      />
      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        required
      />
      <button type="submit">{editingJob ? "Update Job" : "Add Job"}</button>
    </form>
  );
}

export default JobForm;
