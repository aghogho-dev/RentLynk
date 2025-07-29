// File: app/(user)/userprofile/page.tsx

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function UserProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  // Fetch user data from DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

      <div className="space-y-4">
        <ProfileItem label="Name" value={user.name} />
        <ProfileItem label="Email" value={user.email} />
      </div>

      <form action={updateProfile} className="mt-8">
        <Button type="submit">Edit & Save</Button>
      </form>
    </div>
  );
}

interface ProfileItemProps {
  label: string;
  value?: string | null;
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div>
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="ml-2 text-gray-500">{value ?? "Not set"}</span>
    </div>
  );
}

async function updateProfile(formData: FormData) {
  "use server";
  // Implement the logic to handle updates, e.g., opening a form or redirecting to an edit page
  redirect('/userprofile/edit');
}
