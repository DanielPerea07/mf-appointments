import { Tenant } from "../constants/tenant.constants";

export const resolveTenant = (tenantProp?: string): Tenant => {
  if (tenantProp && Object.values(Tenant).includes(tenantProp as Tenant)) {
    return tenantProp as Tenant;
  }
  return Tenant.EPS;
};
