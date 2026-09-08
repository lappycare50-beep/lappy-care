export const metadata = {
  title: "Data Deletion | Lappy Care",
  description:
    "Request deletion of your personal data from Lappy Care Marketing Hub.",
};

export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-200">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Data Deletion
        </h1>

        <p className="mb-10 text-sm text-zinc-400">
          Last updated: August 21, 2026
        </p>

        <div className="space-y-8 leading-7">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Request Data Deletion
            </h2>

            <p>
              Lappy Care respects your right to control your personal
              information. If you have connected your Facebook account or
              Facebook Page with Lappy Care Marketing Hub and want your
              associated data deleted, you can request deletion at any
              time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              How to Request Deletion
            </h2>

            <p className="mb-4">
              To request deletion of your data, contact us using the
              following email address:
            </p>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-lg font-semibold text-white">
                lappycare50@gmail.com
              </p>
            </div>

            <p className="mt-4">
              Please include the email address or Facebook account
              associated with your connection and mention that you want
              your Lappy Care Marketing Hub data deleted.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              What Data May Be Deleted
            </h2>

            <ul className="list-disc space-y-2 pl-6">
              <li>Facebook account connection information</li>
              <li>Connected Facebook Page information</li>
              <li>Stored social media access information</li>
              <li>Marketing Hub social account connection records</li>
              <li>Other personal information associated with the connection</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Processing Your Request
            </h2>

            <p>
              After receiving a valid deletion request, Lappy Care will
              review the request and take reasonable steps to delete the
              applicable personal information from its systems, subject
              to legal, security, accounting, or other legitimate
              retention requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Facebook / Meta Connection
            </h2>

            <p>
              You can also remove Lappy Care Marketing Hub's access from
              your Facebook account or Page settings. Removing the
              connection prevents future access through the authorization
              granted to the application.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Contact
            </h2>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <p>
                <strong className="text-white">Lappy Care</strong>
              </p>

              <p className="mt-1">
                Website: lappycarepune.in
              </p>

              <p className="mt-1">
                Email: lappycare50@gmail.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}