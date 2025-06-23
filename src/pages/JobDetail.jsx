import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../superbase/config';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) {
          console.error('Error fetching job:', error.message);
        } else {
          setJob(data);
        }
      } catch (err) {
        console.error('Unexpected error fetching job:', err);
      }
    };

    const fetchResumes = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('resumes')
          .list(`${jobId}/`);
    
        if (error) {
          console.error('Error fetching resumes:', error.message);
        } else {
          const files = data.map(file => ({
            name: file.name,
            url: supabase.storage
              .from('resumes')
              .getPublicUrl(`${jobId}/${file.name}`).data.publicUrl,
          }));
          setResumes(files);
        }
      } catch (err) {
        console.error('Unexpected error fetching resumes:', err);
      }
    };
    

    const loadData = async () => {
      setLoading(true);
      await fetchJob();
      await fetchResumes();
      setLoading(false);
    };
console.log("ID",jobId)
    if (jobId) {
      console.log('Job ID from URL:', jobId);
      loadData();
    }
  }, [jobId]);

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found or failed to load.</p>;

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>

      <h4>Uploaded Resumes</h4>
      {resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        <ul>
          {resumes.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobDetail;
