import Subscription from "@/views/Subscription";
import React, { Suspense } from "react";

const SubpscriptionPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-headingColor">Loading...</div>}>
      <Subscription />
    </Suspense>
  );
};

export default SubpscriptionPage;
