import { Button } from "./ui/button";
import Image from "next/image";
import { signInWithGoogle } from "@/lib/actions/auth";

const GoogleSignInButton = () => {
  return (
    <form
      action={signInWithGoogle}
    >
      <Button type="submit" className="form-btn">
        <Image
          src={"/icons/google-brands-solid.svg"}
          alt="Google Logo"
          height={20}
          width={20}
        />
        {"Sign in with Google"}
      </Button>
    </form>
  );
};

export default GoogleSignInButton