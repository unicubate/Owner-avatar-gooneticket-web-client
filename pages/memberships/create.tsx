import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { useState } from "react";
import { arrayMemberships } from "@/components/mock";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateOrUpdateFormMembership } from "@/components/membership/create-or-update-form-membership";

const schema = yup.object({
  title: yup
    .string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  pricePerMonthly: yup.number().required(),
  priceYearly: yup.number().optional(),
  description: yup.string().optional(),
  messageWelcome: yup.string().required(),
});

const MembershipsLevelCreate = () => {
  return (
    <>
      <LayoutDashboard title={"Membership create"}>
        <div className="flex-1">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <CreateOrUpdateFormMembership />
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevelCreate);
