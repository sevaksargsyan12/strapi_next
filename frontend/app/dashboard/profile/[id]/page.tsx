import ProfileForm from "@/app/ui/profile/profile-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { notFound } from "next/navigation";
import { fetchUser } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const myProfile = await fetchUser(id);
    if (!myProfile) { notFound() }
    return (
        <main className="p-8">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    {
                        label: "Edit Profile",
                        href: `/dashboard/profile/${id}`,
                        active: true,
                    },
                ]}
            />
            {myProfile && <ProfileForm user={myProfile} />}
        </main>
    );
}
