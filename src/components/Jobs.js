
import React, { useState, useEffect, useCallback } from 'react';
import data from '../data/data.json';
import './Jobs.css';
import JobDetailsModal from './JobDetailsModal'; // Import the modal component

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job for the modal
  const [appliedJobs, setAppliedJobs] = useState([]); // Track applied jobs

  useEffect(() => {
    setJobs(data);
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const doFilter = useCallback(() => {
    setFilteredJobs(
      jobs.filter(item =>
        (searchQuery === "" || item.position.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (jobType === "" || item.contract === jobType)
      )
    );
  }, [jobs, searchQuery, jobType]);

  useEffect(() => {
    doFilter();
  }, [searchQuery, jobType, doFilter]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  // Apply Now button handler
  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // Open the modal with job details
  const openModal = (job) => {
    setSelectedJob(job); // Set the selected job
  };

  // Close the modal
  const closeModal = () => {
    setSelectedJob(null); // Reset the selected job to close the modal
  };

  // Check if no jobs match the filter/search
  const noJobsFound = filteredJobs.length === 0;

  return (
    <section className="jobs">
      <header>Find A Job</header>

      {/* Search and Filter Controls */}
<div className="filter-controls">
  <div className="search-bar-container">
    <input
      type="text"
      className="search-bar"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search by Job Title"
    />
    {searchQuery && (
      <button className="clear-btn" onClick={clearSearch}>
        X
      </button>
    )}
  </div>
  <select
    className="job-type-dropdown"
    value={jobType}
    onChange={handleJobTypeChange}
  >
    <option value="">Select Job Type</option>
    <option value="Full Time">Full Time</option>
    <option value="Part Time">Part Time</option>
    <option value="Remote">Remote</option>
  </select>
</div>


      {/* Show friendly message if no jobs match search/filter */}
      {noJobsFound && (
        <div className="no-jobs-message">
          <p>No jobs found matching your search/filter criteria.</p>
        </div>
      )}

      {/* Job Listings */}
      <section>
        {!noJobsFound && currentJobs.map(item => {
          const arrTax = [item.role, item.level, ...item.languages, ...item.tools];
          const arrMeta = [item.postedAt, item.contract, item.location];
          const isApplied = appliedJobs.includes(item.id); // Check if the job has been applied to

          return (
            <article 
              key={item.id} 
              className={item.featured ? "JobItem featured" : "JobItem"}
              onClick={() => openModal(item)} // Open modal on job card click
            >
              <section className="JobItem-left">
                <div className="JobItem-left__Avatar">
                  <figure>
                    <img src={item.logo} alt={`${item.company} logo`} />
                  </figure>
                </div>
                <div className="JobItem-left__content">
                  <div className="JobItem-left__content-Text">
                    <div>
                      <span>{item.company}</span>
                      {item.new && <span>{" New!"}</span>}
                      {item.featured && <span>{" Featured"}</span>}
                    </div>
                    <h2>{item.position}</h2>
                  </div>
                  <div className="JobItem-left__content-Meta">
                    {arrMeta.map(meta => (
                      <span key={meta}>{meta + " "}</span>
                    ))}
                  </div>
                </div>
              </section>
              <section className="JobItem-right">
                <div className="JobItem-right__Taxonomy">
                  {arrTax.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
              <div className="apply-button-container">
                <button 
                  className="apply-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening when apply is clicked
                    handleApply(item.id);
                  }}
                >
                  {isApplied ? "Applied!" : "Apply Now"} {/* Show 'Applied!' if job is applied */}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="prev-btn"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="next-btn"
          onClick={nextPage}
          disabled={filteredJobs.length <= currentPage * jobsPerPage}
        >
          Next
        </button>
      </div>

      {/* Display Job Details Modal if a job is selected */}
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={closeModal} />
      )}
    </section>
  );
}
