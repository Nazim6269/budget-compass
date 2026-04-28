import GenericButton from "@/shared/ui/GenericButton";
import TickIcon from "@/shared/ui/icons/TickIcon";
import React from "react";

const plans = [
  {
    plan: "Monthly",
    billing: "Billed every month",
    price: 3.99,
    currency: "$",
    per: "month",
    features: [
      "Unlimited Safe to Spend calculations",
      "Bills, goals & debt tracking",
      "Real-time recalculation",
    ],
    cta: "Select plan",
  },
  {
    plan: "Yearly",
    billing: "Billed every year",
    price: 39.99,
    currency: "$",
    per: "year",
    features: [
      "Unlimited Safe to Spend calculations",
      "Bills, goals & debt tracking",
      "Real-time recalculation",
    ],
    cta: "Select plan",
  },
];

const SubiscriptionPanel = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
      {plans.map((item) => (
        <div
          key={item.plan}
          className="bg-white p-4 border-2 border-[#DFE1E7] rounded-xl"
        >
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-2xl text-headingColor font-semibold leading-6">
                {item?.plan}
              </span>
              <span className="text-textPrimary text-[2rem] font-semibold leading-6">
                {item?.currency}
                {item?.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base leading-[132% ] text-grayBlack2">
                {item?.billing}
              </span>
              <span className="text-base text-grayBlack2">/{item?.per}</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            {item?.features?.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-headingColor text-base leading-[124%]"
              >
                <TickIcon />
                {feature}
              </li>
            ))}
          </ul>
          <GenericButton
            title={item?.cta}
            onClick={() => {}}
            variant="brown"
            className="w-full flex justify-center"
          />
        </div>
      ))}
    </div>
  );
};

export default SubiscriptionPanel;
