
import React from "react";

interface StatusTimerProps {
  remainingTime: number | null;
  showRecommendations: boolean;
}

const StatusTimer = ({ remainingTime, showRecommendations }: StatusTimerProps) => {
  if (showRecommendations) {
    return <div className="text-center mb-4">Tải đề xuất thành công!</div>;
  }
  
  if (remainingTime === null) {
    return <div className="text-center mb-4">Đang tải sản phẩm...</div>;
  }
  
  return (
    <div className="text-center mb-4">
      Phân tích khuyến nghị trong: {remainingTime}giây
      <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-1000 ease-linear"
          style={{ width: `${(remainingTime / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusTimer;
