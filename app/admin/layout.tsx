import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <ProtectedRoute>
      {children}
      <FloatingWhatsApp />
    </ProtectedRoute>
  );
}