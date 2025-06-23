import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { applyJob } from '../redux/jobSlice';
import { supabase } from '../superbase/config';

const ApplyJob = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = useState('');

  const onSubmit = async (data) => {
    setStatus('Checking authentication...');

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    console.log(user)

    if (!user) {
      setStatus("You must be logged in to apply.");
      return;
    }

    const resumeFile = data.resume[0];
    if (!resumeFile) {
      setStatus("Please upload a resume.");
      return;
    }
    const filePath = `${jobId}/${user.id}_${resumeFile.name}`;
    setStatus('Uploading...');

    try {
      await dispatch(applyJob({
        jobId,
        name: data.name,
        email: data.email,
        filePath: filePath,
        resume: resumeFile
      })).unwrap();

      setStatus('Application submitted successfully!');
      reset();
    } catch (error) {
      console.error('Upload error:', error);
      setStatus(`Failed to apply: ${error.message || error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Apply for Job</h2>
      <input {...register('name')} placeholder="Name" required />
      <input {...register('email')} placeholder="Email" type="email" required />
      <input {...register('resume')} type="file" accept=".pdf,.doc,.docx" required />
      <button type="submit">Apply</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default ApplyJob;
