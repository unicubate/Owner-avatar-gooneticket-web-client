import { PrivateComponent } from "@/components/util/session/private-component";
import {
  AppstoreOutlined,
  CopyOutlined,
  DashOutlined,
  MailOutlined,
  PauseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Input, Menu, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextAreaInput, TextInput } from "@/components/util/form";
import { PublicComponent } from "@/components/util/session/public-component";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .optional(),
  password: yup.string().optional(),
  description: yup.string().optional(),
});

const ProfilePublic = () => {
  const router = useRouter();
  const { query } = useRouter();
  const userId = String(query?.userId);
  const [showModal, setShowModal] = useState(false);

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleCancel = () => {
    setModal2Open(false);
  };

  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };

  return (
    <>
  
    </>
  );
};

export default ProfilePublic;
