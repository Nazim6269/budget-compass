import React from "react";

const LogoutIcon = ({className}: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none" 
      className={className}
    >
      <path
        d="M5.83336 2.5C5.05838 2.5 4.67089 2.5 4.35298 2.58518C3.49025 2.81635 2.81639 3.49022 2.58521 4.35295C2.50003 4.67087 2.50003 5.05836 2.50003 5.83333V14.1667C2.50003 14.9417 2.50003 15.3292 2.58521 15.6471C2.81638 16.5098 3.49025 17.1837 4.35298 17.4148C4.67089 17.5 5.05838 17.5 5.83336 17.5"
        stroke="#FF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7475 13.75C13.7475 13.75 17.4974 10.9882 17.4974 10C17.4974 9.01175 13.7474 6.25 13.7474 6.25M16.664 10H6.66406"
        stroke="#FF0000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
