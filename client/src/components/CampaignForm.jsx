import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CampaignForm = () => {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailList = recipients.split(",").map((email) => email.trim());

    if (!validateEmails(emailList)) {
      setMessage("Please provide valid email addresses.");
      return;
    }

    const campaignData = {
      name: campaignName,
      subject,
      body: description,
      recipients: emailList,
    };

    try {
      const response = await axios.post(
        "http://localhost:2000/api/campaigns/create",
        campaignData
      );
      setMessage("Campaign created successfully!");
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      console.error("Error creating campaign:", error);
      setMessage("Failed to create campaign. Please try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#1f2937",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "medium",
      marginBottom: "8px",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      fontSize: "14px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      marginBottom: "16px",
      outline: "none",
      transition: "box-shadow 0.2s ease",
    },
    button: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Campaign</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={styles.label}>Campaign Name:</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>
              Recipients (comma-separated emails):
            </label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {message && (
            <p
              style={{
                color: message.includes("success") ? "green" : "red",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}
          <button type="submit" style={styles.button}>
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
