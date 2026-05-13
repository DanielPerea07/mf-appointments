import { AppointmentsIframe } from "../../components/AppointmentsIframe/AppointmentsIframe";
import { useAppointments } from "../../hooks/useAppointments";
import type {
  AppointmentTenantConfig,
  AppointmentUser
} from "../../types/appointments.types";
import styles from "./AppointmentsPage.module.css";

interface AppointmentsPageProps {
  user: AppointmentUser;
  config: AppointmentTenantConfig;
}

export const AppointmentsPage = ({ user, config }: AppointmentsPageProps) => {

  return (
    <div className={styles.container}>
      <AppointmentsIframe
        user={user}
        config={config}
      />
    </div>
  );
};
