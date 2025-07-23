



import GithubSignIn from "@/components/molecules/GithubSignIn";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "@/lib/auth";
import {redirect } from "next/navigation";

export default function Login() {
  return (
    <div>
      Login Page

      <GithubSignIn />

      <form action={async (formdata) => {
        "use server"

        try {
          const formDataObj = Object.fromEntries(formdata.entries());
          const response = await signIn("credentials", {
            ...formDataObj,
            redirect: false,
            callbackUrl: "/",
          })
          if (response?.ok) {
            redirect("/")
          }

        } catch (error) {
          console.log(error, "I am here")
        }



      }}>
        <input type="email" name="email"></input>
        <input name="password"></input>

        <Button type="submit">Login</Button>
      </form>



      <form action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
      }}>
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
