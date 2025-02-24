"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const defaultValues = {
  email: "",
  password: "",
};

const Signin = () => {
  return (
    <div>
      <AuthForm
        type={"SIGN_IN"}
        onSubmit={signInWithCredentials}
        formSchema={signInSchema}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default Signin;
