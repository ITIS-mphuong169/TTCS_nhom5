
import React from "react";

interface StatusLegendProps {
  showRecommendations: boolean;
}

const StatusLegend = ({ showRecommendations }: StatusLegendProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-selected mr-2 border border-green-400"></div>
        <span>Được chọn</span>
      </div>
      
      {showRecommendations && (
        <>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-selected-recommended mr-2 border border-red-600"></div>
            <span>Được chọn + Được đề xuất</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-recommended mr-2 border border-purple-500"></div>
            <span>Được đề xuất</span>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusLegend;
