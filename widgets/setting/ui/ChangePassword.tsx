import GenericButton from "@/shared/ui/GenericButton";
import { GenericInput } from "@/shared/ui/GenericInput";
import React from "react";

const ChangePassword = () => {
  return (
    <div>
      <h1 className="text-center sm:text-left text-xl text-textPrimary font-bold leading-[120%] tracking-[0.006rem]">
        Change Password
      </h1>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* Row 1*/}
        <div className="sm:col-span-2">
          <GenericInput
            type="password"
            placeholder="Password"
            label="Current Password"
            fullWidth
            size="xmd"
            labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
          />
        </div>

        {/* Row 2*/}
        <GenericInput
          type="password"
          placeholder="New Password"
          label="New Password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
        />

        <GenericInput
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          fullWidth
          size="xmd"
          labelClassName="text-grayBlack2 font-normal text-sm leading-[100%] mb-2"
        />
      </div>

      <div className="flex justify-end mt-3 sm:mt-8">
        <GenericButton
          title="Update Password"
          onClick={() => {}}
          size="mlarge"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
