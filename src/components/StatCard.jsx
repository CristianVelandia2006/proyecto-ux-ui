import React from 'react';

const StatCard = ({ label, value, subText, customStyle }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value" style={customStyle}>{value}</div>
    <div className="stat-sub">{subText}</div>
  </div>
);

export default StatCard;