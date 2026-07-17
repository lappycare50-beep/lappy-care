"use client";

export default function RepairLoading() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {Array.from({ length: 9 }).map((_, index) => (
              <th
                key={index}
                className="px-4 py-4"
              >
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, row) => (
            <tr
              key={row}
              className="border-b border-white/10"
            >
              {Array.from({ length: 9 }).map((_, col) => (
                <td
                  key={col}
                  className="px-4 py-4"
                >
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}