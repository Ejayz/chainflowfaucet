"use client";

import Link from "next/link";
import { FormInput } from "../UI/FormBased";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState } from "react";
export default function LoginForm() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/\d/, "Password must contain at least one digit.")
      .matches(
        /[@!#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]/,
        "Password must contain at least one special character."
      )
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Passwords must match and not be empty."
    ),
  });
  const ref = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<HCaptcha | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onCaptchaChange = (token: string) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Start claiming satoshi now by registering with your faucetpay email
            address. No faucetpay account? No problem! You can create one in{" "}
            <Link
              className="link underline text-primary"
              href="https://faucetpay.io/?r=chainflow"
              target="_blank"
            >
              here
            </Link>
            .
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
    
            }}
          >
            {({ errors, touched }) => (
              <Form className="card-body">
                <div className="flex flex-col">
                  <FormInput
                    errors={errors.email}
                    touched={touched.email?.toString()}
                    tooltip="Your faucetpay email address"
                    name="email"
                    placeholder="Email"
                    label="Email"
                    type="email"
                  />
                  <FormInput
                    errors={errors.password}
                    touched={touched.password?.toString()}
                    tooltip="Your password"
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                  />
                  <FormInput
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword?.toString()}
                    tooltip="Confirm your password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    type="password"
                  />
                  <HCaptcha
                    sitekey={"10000000-ffff-ffff-ffff-000000000001"}
                    onVerify={onCaptchaChange}
                    ref={captchaRef}
                    onExpire={onCaptchaExpire}
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
