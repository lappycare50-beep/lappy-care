import MarketingSidebar from "@/components/marketing/MarketingSidebar";

export const metadata = {
  title: "Social Accounts | Lappy Care ERP",
};

const accounts = [
  {
    name: "Google Business Profile",
    description:
      "Connect your Google Business Profile for AI-powered posting.",
    status: "Not Connected",
    color: "text-red-400",
    connectHref: "/api/auth/google",
    available: true,
  },
  {
    name: "Facebook Page",
    description:
      "Connect your Facebook Business Page to publish campaigns.",
    status: "Not Connected",
    color: "text-red-400",
    available: false,
  },
  {
    name: "Instagram Business",
    description:
      "Publish AI generated posts directly to Instagram.",
    status: "Not Connected",
    color: "text-red-400",
    available: false,
  },
  {
    name: "LinkedIn Company",
    description:
      "Share business updates to your LinkedIn company page.",
    status: "Not Connected",
    color: "text-red-400",
    available: false,
  },
  {
    name: "X (Twitter)",
    description:
      "Publish quick updates and announcements.",
    status: "Not Connected",
    color: "text-red-400",
    available: false,
  },
];

export default function SocialAccountsPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <MarketingSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Social Accounts
          </h1>

          <p className="mt-2 text-zinc-400">
            Connect your business accounts to publish
            AI generated posts automatically.
          </p>
        </div>

        {/* Accounts */}

        <div className="space-y-6">
          {accounts.map((account) => (
            <div
              key={account.name}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-6
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
                {/* Account Information */}

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {account.name}
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    {account.description}
                  </p>

                  <p
                    className={`mt-4 font-semibold ${account.color}`}
                  >
                    {account.status}
                  </p>
                </div>

                {/* Connect */}

                {account.available ? (
                  <a
                    href={account.connectHref}
                    className="
                      inline-flex
                      min-w-[110px]
                      items-center
                      justify-center
                      rounded-xl
                      bg-yellow-500
                      px-6
                      py-3
                      font-semibold
                      text-black
                      transition
                      hover:bg-yellow-400
                      active:scale-95
                    "
                  >
                    Connect
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="
                      min-w-[110px]
                      cursor-not-allowed
                      rounded-xl
                      bg-zinc-800
                      px-6
                      py-3
                      font-semibold
                      text-zinc-500
                    "
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}