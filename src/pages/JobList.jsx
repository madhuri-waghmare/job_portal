import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      const jobCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobCollection);
      setJobs(jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <h2>Job Listings</h2>
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className="card-grid">
        {currentJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <Pagination
        jobsPerPage={jobsPerPage}
        totalJobs={filteredJobs.length}
        paginate={setCurrentPage}
      />
    </>
  );
}

export default JobList;