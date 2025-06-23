import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '../components/Grid';
import { fetchJobs } from '../redux/jobSlice';

function JobList() {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobs.items);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <main>
      <h1>Job Listing</h1>
      <Grid data={jobs} columns={['title', 'company']} mode="user" />
    </main>
  );
}

export default JobList;