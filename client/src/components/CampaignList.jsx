// src/components/CampaignList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAll, setShowAll] = useState(false);

  // Fetch campaigns from the API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/campaigns");
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch campaigns. Please try again later.");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCampaigns = showAll
    ? campaigns
    : campaigns.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewAll = () => {
    setShowAll(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Campaigns
      </h2>
      <Link to="/create-campaign" style={{ textDecoration: "none" }}>
        {/* <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          Create New Campaign
        </button> */}
      </Link>
      <button
        onClick={handleViewAll}
        style={{
          padding: "10px 20px",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
          fontSize: "16px",
          marginLeft: "10px",
        }}
      >
        View All Campaigns
      </button>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : campaigns.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {displayedCampaigns.map((campaign) => (
              <li
                key={campaign.id}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  {campaign.name}
                </h3>
                <p style={{ margin: "8px 0", color: "#374151" }}>
                  {campaign.subject}
                </p>
                <p style={{ margin: "8px 0", color: "#6b7280" }}>
                  {campaign.body}
                </p>
                <small style={{ color: "#9ca3af" }}>
                  Recipients: {campaign.recipients.join(", ")}
                </small>
              </li>
            ))}
          </ul>
          {!showAll && (
            <div style={{ marginTop: "20px" }}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    padding: "8px 12px",
                    margin: "0 5px",
                    backgroundColor: index + 1 === currentPage ? "#4f46e5" : "#e5e7eb",
                    color: index + 1 === currentPage ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>No campaigns found. Start by creating a new campaign!</p>
      )}
    </div>
  );
};

export default CampaignList;
