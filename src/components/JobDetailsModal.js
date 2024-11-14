import React from "react";
import "./JobDetailsModal.css"; // Include CSS for modal styles

const JobDetailsModal = ({ job, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>×</button>
        <h2>{job.position} - {job.company}</h2>
        <p><strong>Contract:</strong> {job.contract}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Languages:</strong> {job.languages.join(", ")}</p>
        <p><strong>Tools:</strong> {job.tools.length > 0 ? job.tools.join(", ") : "N/A"}</p>
        <h3>Description:</h3>
        <p>{job.description}</p>
        <h3>Requirements:</h3>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetailsModal;
