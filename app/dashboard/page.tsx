"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.scss";

const DashboardPage = () => {
  const [allJobs, setAllJobs] = useState(null);

  useEffect(() => {
    const exploreJobs = async () => {
      const response = await fetch("http://localhost:9000/api/jobs/explore", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const jobs = await response.json();
      setAllJobs(jobs.data);
    };

    exploreJobs();
  }, []);

  const dashboardData = allJobs?.[0] || {};

  const jobs = dashboardData.jobs || [];
  const locations = dashboardData.locations || [];
  const employmentTypes = dashboardData.employmentTypes || [];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Job Dashboard</h1>
          <p>Explore and find your next opportunity.</p>
        </div>

        <div className={styles.jobCount}>{jobs.length} Jobs Available</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span>Total Jobs</span>
          <h2>{jobs.length}</h2>
        </div>

        <div className={styles.statCard}>
          <span>Locations</span>
          <h2>{locations.length}</h2>
        </div>

        <div className={styles.statCard}>
          <span>Employment Types</span>
          <h2>{employmentTypes.length}</h2>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterSection}>
          <h3>Locations</h3>
          <div className={styles.tags}>
            {locations.map((location) => (
              <span key={location._id} className={styles.tag}>
                {location._id}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3>Employment Types</h3>
          <div className={styles.tags}>
            {employmentTypes.map((type) => (
              <span key={type._id} className={styles.tag}>
                {type._id}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.jobsHeader}>
        <h2>Available Jobs</h2>
        <span>{jobs.length} results</span>
      </div>

      <div className={styles.jobsList}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <article
              key={`${job.title}-${job.location}-${index}`}
              className={styles.jobCard}
            >
              <div className={styles.jobTop}>
                <div className={styles.companyLogo}>
                  {job.organisation?.name?.charAt(0).toUpperCase() || "C"}
                </div>

                <div className={styles.jobInfo}>
                  <h3>{job.title}</h3>
                  <p>{job.organisation?.name || "Company not specified"}</p>
                </div>

                <span className={styles.status}>{job.status}</span>
              </div>

              <p className={styles.description}>{job.description}</p>

              <div className={styles.jobMeta}>
                <span>📍 {job.location}</span>
                <span>💼 {job.employmentType}</span>
                <span>🎯 {job.experience}</span>
              </div>

              <div className={styles.salary}>
                ₹{(job.salary?.min / 100000).toFixed(1)} LPA – ₹
                {(job.salary?.max / 100000).toFixed(1)} LPA
              </div>

              <div className={styles.skills}>
                {job.skills?.map((skill) => (
                  <span key={skill} className={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className={styles.jobFooter}>
                <span className={styles.activeLabel}>{job.status}</span>

                <button
                  type="button"
                  className={styles.viewButton}
                  onClick={() => console.log("Selected job:", job)}
                >
                  View Details
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No jobs found</h3>
            <p>Check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
