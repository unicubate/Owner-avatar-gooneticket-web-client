import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/templates/button-input";
import { useState, useEffect } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { Image } from "antd";
import { arrayMemberships } from "@/components/mock";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NumberInput, TextAreaInput, TextInput } from "@/components/util/form";
import { InputNumber } from "antd";
import { CreateOrUpdateFormDonation } from "@/components/membership/create-or-update-membership";

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
  const [membershipsArrays] = useState(arrayMemberships);
  const [showModal, setShowModal] = useState(false);
  const {
    watch,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchTitle = watch("title", "");
  const watchDescription = watch("description", "");
  const watchPricePerMonthly = watch("pricePerMonthly", "");

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { priceYearly, pricePerMonthly } = data;
    const pricePerYearly =
      priceYearly === 0 ? pricePerMonthly * 10 : priceYearly;
    const payload = { ...data, pricePerYearly };

    console.log("data =======>", data);
    console.log("pricePerMonthly =======>", pricePerYearly);
    console.log("payload =======>", payload);
  };

  return (
    <>
     <LayoutDashboard title={"Membership create"}>
        <div className="flex-1">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
              
                <CreateOrUpdateFormDonation />
                
              </div>

            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevelCreate);
