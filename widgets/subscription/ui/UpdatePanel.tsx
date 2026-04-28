import GenericDropDown from "@/shared/ui/GenericDropdown";
import { GenericInput } from "@/shared/ui/GenericInput";
import { AddIcon, CrossIcon } from "@/shared/index";
import React from "react";
import GenericButton from "@/shared/ui/GenericButton";

const benifitsData = [
  {
    title: "One Official Memorial Notice",
  },
  {
    title: "Charity Integration",
  },
  {
    title: "Verified Professional Seal",
  },
  { title: "Stripe Secure Processing" },
];

const UpdatePanel = () => {
  return (
    <div className=" bg-white p-3 sm:p-6 border-2 rounded-xl border-[#DFE1E7]">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 flex justify-between items-center gap-2 p-4 border border-grayBlack50 rounded-xl bg-secondaryBg">
          <GenericInput
            type="radio"
            name="subscription"
            value="monthly"
            label="Monthly"
            className="flex-1"
            labelClassName="text-headingColor font-semibold text-2xl"
          />
          <p className="text-sm sm:text-base text-grayBlack2 leading-[132%]">
            Billed every month
          </p>
        </div>
        <div className="flex-1 flex justify-between items-center gap-2 p-4 border border-grayBlack50 rounded-lg bg-secondaryBg">
          <GenericInput
            type="radio"
            name="subscription"
            value="yearly"
            label="Yearly"
            className="flex-1"
          />
          <p className="text-sm sm:text-base text-grayBlack2 leading-[132%]">
            Single payment
          </p>
        </div>
      </div>

      <div className="my-4 border-b border-grayBlack50"></div>

      <div className="">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1">
            <GenericInput
              type="text"
              title="Price"
              size="lg"
              placeholder="$0.00"
              variant="outlined"
              label="Price"
              fullWidth
              labelClassName="text-[#161721] font-semibold text-base leading-[128%]"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor=""
              className="text-[#161721] font-semibold text-base leading-[128%] mb-1.5"
            >
              Billing Period
            </label>
            <GenericDropDown
              options={[
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
              placeholder="Monthly"
              size="xlg"
            />
          </div>
        </div>

        <div>
          <h3 className="text-grayBlack2 font-normal leading-[140%] text-base mb-3 mt-4">
            Benefits
          </h3>
          <div className="space-y-4">
            {benifitsData.map((benefit, index) => (
              <div
                key={index}
                className="flex   gap-2 items-center justify-between border border-[#D2D2D5] rounded-lg px-4 py-3"
              >
                <p className="text-grayBlack text-base leading-[150%] font-medium">
                  {benefit.title}
                </p>
                <div className="w-6 h-6 rounded-full bg-grayBlack50 flex items-center justify-center">
                  <CrossIcon />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 mt-4">
            <AddIcon />
            <span className="bg-primary text-grayBlack rounded-lg font-medium leading-[150%]">
              Add Benefit
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
           
            <GenericButton
              onClick={() => {}}
              title="Dismiss"
              variant="cream"
              className="flex-1 w-full"
              size="large"
              align="center"
            />
           
              <GenericButton
                onClick={() => {}}
                title="Save changes"
                variant="brown"
                className="flex-1 w-full"
                size="large"
                align="center"
              />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePanel;
