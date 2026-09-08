import SocialAccountsClient from "@/components/marketing/SocialAccountsClient";

export const metadata = {
  title: "Social Accounts | Lappy Care ERP",
};

export default function SocialAccountsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">

      <main className="flex-1 overflow-y-auto p-8">
        <SocialAccountsClient />
      </main>
    </div>
  );
}
