import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  addJob,
  deleteJob,
  updateJob,
  setEditingJob,
  clearEditingJob
} from "../redux/jobSlice";
import JobForm from "./JobForm";
import Grid from "../components/Grid";
import { useNavigate } from "react-router-dom";

function Admin() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.items);
  const editingJob = useSelector(state => state.jobs.editingJob);
  const navigate =useNavigate();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleAddJob = (data) => {
    dispatch(addJob(data)).then(() => dispatch(clearEditingJob()));
  };

  const handleUpdateJob = (id, data) => {
    console.log(id, "&&&&&&&&&&&")
    dispatch(updateJob({ id, data })).then(() => dispatch(clearEditingJob()));
  };

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      <h2>Admin Panel</h2>
      <JobForm
        editingJob={editingJob}
        onSubmit={(id, data) => {
          if (id) handleUpdateJob(id, data);
          else handleAddJob(data);
        }}
      />

      <h3>Existing Jobs</h3>
      <Grid
        data={jobs}
        columns={['title', 'company']}
        mode="admin"
        onEdit={(job) => dispatch(setEditingJob(job))}
        onDelete={(id) => handleDeleteJob(id)}
        onView={(id) => navigate(`/admin/jobs/${id}`)} 
      />

    </>
  );
}

export default Admin;
