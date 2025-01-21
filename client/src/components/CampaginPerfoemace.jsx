import React, { useState, useEffect } from "react";
import axios from "axios";

const CampaignPerformance = ({ campaignId }) => {
  const [performanceData, setPerformanceData] = useState({
    emailsSent: 0,
    deliveryStatus: { success: 0, failed: 0 },
    openRate: 0,
    clickRate: 0,
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get(`https://emailcamp.vercel.app/api/campaigns/${campaignId}`);
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching performance data", error);
      }
    };

    fetchPerformanceData();
  }, [campaignId]);

  return (
    <div>
      <h2>Campaign Performance</h2>
      <div>
        <strong>Total Emails Sent: </strong>{performanceData.emailsSent}
      </div>
      <div>
        <strong>Delivery Status:</strong>
        <div>Success: {performanceData.deliveryStatus.success}</div>
        <div>Failed: {performanceData.deliveryStatus.failed}</div>
      </div>
      <div>
        <strong>Open Rate: </strong>{performanceData.openRate}%
      </div>
      <div>
        <strong>Click Rate: </strong>{performanceData.clickRate}%
      </div>
    </div>
  );
};

export default CampaignPerformance;
