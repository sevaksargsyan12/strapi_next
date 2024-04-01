import LoginForm from "@/app/ui/login/login-form";
import Logo from "@/app/ui/dashboard/header/logo";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 shadow-blue-400 shadow">
        <div className="flex h-10 w-full items-end rounded-lg bg-blue-100 p-3 md:h-24 ">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
