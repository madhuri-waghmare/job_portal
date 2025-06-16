import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function JobCard({ job }) {
  return (
   
      <div className="card">
        <h2>{job.title} </h2>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p>{job.location} {job.description}</p>
        <button onclick="viewProject('#')">View Project</button>
      </div>
   
  );
}

export default JobCard;