import LoginForm from "@/components/molecules/LoginForm";
import { auth} from "@/lib/auth";
import { redirect } from "next/navigation";





export default async function Login() {

  const session = await auth()



  if (session) {
    redirect("/properties")
  }



  return (

    <>

      <LoginForm />
    </>
  );
}

