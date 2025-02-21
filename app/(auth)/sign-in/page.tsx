"use client";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  universityCard: "",
  universityNumber: 0,
};

const Signin = () => {
  return (
    <div>
      <AuthForm
        type={"SIGN_IN"}
        onSubmit={(defaultValues) => {
          return new Promise((resolve) => {
            resolve({ success: true, data: defaultValues });
          });
        }}
        formSchema={signUpSchema}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default Signin;
