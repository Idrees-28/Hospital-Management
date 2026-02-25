export type Role = 'Supervisor' | 'Receptionist' | 'Nurse';

export interface Employee {
  id: string;
  name: string;
  role: Role;
  shiftCount: number;
}

export interface ShiftDay {
  date: string;
  dayName: string;
  assignments: Employee[];
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const ROLE_CONFIG: Record<Role, { perShift: number }> = {
  Supervisor: { perShift: 2 },
  Receptionist: { perShift: 1 },
  Nurse: { perShift: 1 },
};

export const MAX_SHIFTS = 5;
