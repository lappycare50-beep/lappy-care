import { notFound } from "next/navigation";

import TrackingContact from "@/components/tracking/TrackingContact";
import TrackingFooter from "@/components/tracking/TrackingFooter";
import TrackingHeader from "@/components/tracking/TrackingHeader";
import TrackingInfo from "@/components/tracking/TrackingInfo";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";

import { getRepairByRepairId } from "@/services/repairService";

type Props = {
  params: Promise<{
    repairId: string;
  }>;
};

export default async function TrackingPage({
  params,
}: Props) {

  const { repairId } = await params;

  const repair =
    await getRepairByRepairId(
      repairId
    );

  if (!repair) {
    notFound();
  }

  return (

    <main className="min-h-screen bg-gray-100 py-10">

      <div className="mx-auto max-w-6xl space-y-8 px-4">

        {/* ==========================
            Header
        ========================== */}

        <TrackingHeader
          repair={repair}
        />

        {/* ==========================
            Repair Information
        ========================== */}

        <TrackingInfo
          repair={repair}
        />

        {/* ==========================
            Repair Timeline
        ========================== */}

        <TrackingTimeline
          status={repair.status}
        />

        {/* ==========================
            Contact
        ========================== */}

        <TrackingContact />

        {/* ==========================
            Footer
        ========================== */}

        <TrackingFooter />

      </div>

    </main>

  );

}