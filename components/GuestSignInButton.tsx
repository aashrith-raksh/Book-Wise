import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { signInWithCredentials } from "@/lib/actions/auth";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const GuestSignInButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onClickHandler = async () => {
    setLoading(true);
    const result = await signInWithCredentials({
      email: "admin1@gmail.com",
      password: "12345678",
    });

    if (result.success) {
      router.push("/");

      toast({
        title: "Success",
        description: "You have successfully signed in.",
      });
    } else {
      toast({
        title: "Error signing in",
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Button
      className="form-btn mb-4"
      onClick={onClickHandler}
      disabled={loading}
    >
      Sign in as a test administrator
      <ArrowRight />
    </Button>
  );
};
