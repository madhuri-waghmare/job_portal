import { useEffect, useState } from "react";
import { db, auth } from "../Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import JobForm from "./JobForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobCollection);
      setJobs(jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!auth.currentUser) return alert("Not authorized");
    await deleteDoc(doc(db, "jobs", id));
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <>
      <h2>Admin Panel</h2>
      <JobForm editingJob={editingJob} setEditingJob={setEditingJob} />
      <h3>Existing Jobs</h3>
      <div className="card-grid">
        {jobs.map(job => (
          <div key={job.id} className="card">
            <h5 className="card-title">{job.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
            <button className="btn btn-primary" onClick={() => setEditingJob(job)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;