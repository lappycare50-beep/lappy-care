import ProtectedRoute from "@/components/auth/ProtectedRoute";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}