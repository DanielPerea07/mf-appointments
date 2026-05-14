import { useTranslation } from "react-i18next";
import styles from "./AppointmentsIframe.module.css";
import type { AppointmentTenantConfig, AppointmentUser } from "../../types/appointments.types";
import { useAppointments } from "../../hooks/useAppointments";

interface AppointmentsIframeProps {
 user: AppointmentUser;
 config: AppointmentTenantConfig;
}

export const AppointmentsIframe = ({
 user,
 config
}: AppointmentsIframeProps) => {
  const { t } = useTranslation();

  const {iframeUrl, isLoading, error} = useAppointments(user, config); 

  if (isLoading) {
    return <p className={styles.message}>{t("appointment.loading")} </p>;
  }

  if (error) {
    return <p className={styles.error}>{t(error)}</p>;
  }

  if (!iframeUrl) {
    return <p className={styles.message}>{t("appointment.empty")}</p>;
  }

  return (
    <div className={styles.wrapper}>
    <iframe
      className={styles.iframe}
      src={iframeUrl}
      title={t("appointment.scheduled")}
    />
    </div>
    
  );
};
