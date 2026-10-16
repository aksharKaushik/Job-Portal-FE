"use client";
import { useState, useEffect } from "react";
import styles from "./profile.module.scss";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const userData = await response.json();
        setUserData(userData.data);
      } catch (error) {
        setError(Boolean(error));
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);
  if (loading) {
    return <main className="profile-page">Loading profile...</main>;
  }
  console.log("userData", userData);
  if (error) {
    return (
      <main className="profile-page">
        <p className="error-message">{error}</p>
      </main>
    );
  }

  if (!userData) {
    return <main className="profile-page">No profile data found.</main>;
  }

  const {
    name,
    email,
    role,
    authProvider,
    skills = [],
    prefferedLocation = [],
    createdAt,
    updatedAt,
  } = userData;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not available";

  return (
    <main className={styles["profile-page"]}>
      <header className="profile-header">
        <div>
          <p className="eyebrow">ACCOUNT</p>
          <h1>My Profile</h1>
          <p className="subtitle">
            Manage your personal information and job preferences.
          </p>
        </div>
      </header>

      <section className={styles["profile-card"]}>
        <div className="profile-avatar">
          {name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className={styles["profile-identity"]}>
          <div>
            <h2>{name}</h2>
            <p>{email}</p>
            <span className="account-status">● Account active</span>
          </div>
          <span className="role-badge">{role}</span>
        </div>
      </section>

      <section className={styles["profile-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <h2>Personal Information</h2>
            <p>Your basic account details.</p>
          </div>
        </div>

        <div className={styles["details-grid"]}>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-label"]}>Full Name</span>
            <p>{name || "Not provided"}</p>
          </div>

          <div className={styles["detail-item"]}>
            <span className={styles["detail-label"]}>Email Address</span>
            <p>{email || "Not provided"}</p>
          </div>

          <div className={styles["detail-item"]}>
            <span className={styles["detail-label"]}>Account Role</span>
            <p>{role || "Not provided"}</p>
          </div>

          <div className="detail-item">
            <span className={styles["detail-label"]}>Login Provider</span>
            <p>{authProvider || "Not provided"}</p>
          </div>
        </div>
      </section>

      <section className={styles["profile-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <h2>Technical Skills</h2>
            <p>Skills associated with your job-seeker profile.</p>
          </div>
          <span className={styles["count-badge"]}>{skills.length} skills</span>
        </div>

        <div className={styles["tag-list"]}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <span className="tag" key={skill}>
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </section>

      <section className={styles["profile-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <h2>Preferred Locations</h2>
            <p>Locations where you would like to find a job.</p>
          </div>
          <span className={styles["count-badge"]}>
            {prefferedLocation.length} locations
          </span>
        </div>

        <div className="tag-list">
          {prefferedLocation.length > 0 ? (
            prefferedLocation.map((location) => (
              <span className="tag location-tag" key={location}>
                📍 {location}
              </span>
            ))
          ) : (
            <p>No preferred locations added yet.</p>
          )}
        </div>
      </section>

      <section className={styles["profile-section"]}>
        <div className={styles["section-heading"]}>
          <div>
            <h2>Account Information</h2>
            <p>Account creation and latest update details.</p>
          </div>
        </div>

        <div className={styles["details-grid"]}>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-label"]}>Member Since</span>
            <p>{formatDate(createdAt)}</p>
          </div>

          <div className={styles["detail-item"]}>
            <span className={styles["detail-label"]}>Last Updated</span>
            <p>{formatDate(updatedAt)}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
