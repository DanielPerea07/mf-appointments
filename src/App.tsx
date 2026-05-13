import { TENANT_CONFIG } from "./constants/tenant.config";
import { AppointmentsPage } from "./pages/AppointmentsPage/AppointmentsPage";
import styles from "./styles/layout.module.css";
import type { AppointmentUser } from "./types/appointments.types";
import { resolveTenant } from "./utils/tenant.util";

interface AppProps {
  documentType: string;
  documentNumber: string;
  fullName?: string;
  tenant?: string;
}

export function App({
  documentType,
  documentNumber,
  fullName,
  tenant
}: AppProps) {
  const resolvedTenant = resolveTenant(tenant);
  const config = TENANT_CONFIG[resolvedTenant];

  const user: AppointmentUser = {
    documentType,
    documentNumber,
    ...(fullName ? { fullName } : {})
  };

  return (
    <div className={styles.root}>
      <AppointmentsPage user={user} config={config} />
    </div>
  );
}
