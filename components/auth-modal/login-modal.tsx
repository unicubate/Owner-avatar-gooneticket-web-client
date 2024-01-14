import { TextInput, TextInputPassword } from "../ui";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { AlertDangerNotification } from "@/utils";
import { ButtonInput } from "../ui";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { UserLoginFormModel } from "@/types/user.type";
import { loginGoogleUserAPI, loginUserAPI } from "@/api-site/user";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  password: yup.string().min(8, "Minimum 8 symbols").required(),
});

const LoginModal: React.FC<{
  showModal: boolean;
  setShowModal: any;
}> = ({ showModal, setShowModal }) => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const onSubmit: SubmitHandler<UserLoginFormModel> = async (
    payload: UserLoginFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    const { email, password } = payload;

    try {
      const { data: user } = await loginUserAPI({ email, password });
      localStorage.setItem(
        String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
        JSON.stringify(user?.accessToken)
      );
      setHasErrors(false);
      setLoading(false);
      location.reload();
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: "An error has occurred.",
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      {showModal ? (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-sm p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white dark:bg-[#121212]">
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal(false)}
            >
              <span className="dark:text-white opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                <CloseOutlined />
              </span>
            </button>

            <div className="flex justify-center mx-auto">
              <h6 className="mt-3 text-xl text-center font-bold">
                {`Log in`}
              </h6>
            </div>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              {hasErrors && (
                <div className="relative mb-4 block w-full rounded-lg dark:bg-red-500 p-4 text-base leading-5 dark:text-white opacity-100">
                  {hasErrors}
                </div>
              )}

              <div className="mb-4">
                <TextInput
                  control={control}
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  errors={errors}
                />
              </div>

              <div className="mb-4">
                <TextInputPassword
                  control={control}
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  errors={errors}
                />
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 dark:dark:text-white"
                  ></label>
                  <Link
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <ButtonInput
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color={"indigo"}
                >
                  Log In
                </ButtonInput>
              </div>
            </form>
            <div className="flex items-center justify-between mt-4 mb-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
              <p className="text-xs text-center dark:text-gray-500 uppercase dark:dark:text-gray-400">
                or login with Social Media
              </p>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <GoogleOAuthProvider
              clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
            >
              <GoogleLogin
                size="large"
                width={350}
                useOneTap
                onSuccess={async (credentialResponse) => {
                  try {
                    const { data: user } = await loginGoogleUserAPI({
                      token: String(credentialResponse.credential),
                    });
                    localStorage.setItem(
                      String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN),
                      JSON.stringify(user?.accessToken)
                    );
                    setHasErrors(false);
                    location.reload();
                  } catch (error: any) {
                    setHasErrors(true);
                    setHasErrors(error.response.data.message);
                    AlertDangerNotification({
                      text: "An error has occurred.",
                      gravity: "top",
                      className: "info",
                      position: "center",
                    });
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>

            <Link href="/register">
              <p className="mt-8 text-xs font-bold text-center text-gray-600 hover:underline cursor-pointer dark:hover:text-blue-600">
                {" "}
                New to {process.env.NEXT_PUBLIC_NAME_SITE}? Sign up here
              </p>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { LoginModal };
