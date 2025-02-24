"use client"
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const defaultValues = {
  fullName: "",
  email:"",
  password:"",
  universityCard:"",
  universityNumber:0,
}

const Signup = () => {
  return (
    <div>
      <AuthForm
        type={"SIGN_UP"}
        onSubmit={signUp}
        formSchema={signUpSchema}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default Signup;
