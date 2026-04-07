import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = ({ size = 24, color = "text-blue-600" }) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`animate-spin ${color}`} size={size} />
    </div>
  );
};

export default Spinner;
