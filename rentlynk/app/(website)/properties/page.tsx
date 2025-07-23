import { appUrls } from "@/app/utils/constant"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"


async function Properties() {

  const session = await auth()
  if (!session) {
    redirect(`${appUrls.login.landing}`)
  }

  return (


    <div> Properties

      <p>{session?.user?.email}</p>
    </div>
  )
}

export default Properties