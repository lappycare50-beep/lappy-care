import MarketingSidebar from "@/components/marketing/MarketingSidebar";
import BusinessProfileForm from "@/components/marketing/business-profile/BusinessProfileForm";

export default function BusinessProfilePage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Business Profile
          </h1>

          <p className="mt-2 text-zinc-400">
            Configure your business information for AI-generated marketing content.
          </p>
        </div>

        <BusinessProfileForm />
      </main>
    </div>
  );
}