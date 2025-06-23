import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
   
      <div className="card">
        <h2>{job.title} </h2>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p>{job.location} {job.description}</p>
        <Link to={`/apply/${job.id}`} >Apply Job</Link>
      </div>
   
  );
}

export default JobCard;