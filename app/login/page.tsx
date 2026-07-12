import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>

    </main>
  );
}