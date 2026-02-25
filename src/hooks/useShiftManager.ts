import { useState, useCallback } from 'react';
import { Employee, Role, ShiftDay, DAYS, ROLE_CONFIG, MAX_SHIFTS } from '@/types';

export function useShiftManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedule, setSchedule] = useState<ShiftDay[]>([]);

  const addEmployee = useCallback((id: string, name: string, role: Role): string | null => {
    if (employees.some(e => e.id === id)) return 'Employee ID already exists';
    if (!id.trim() || !name.trim()) return 'ID and Name are required';
    setEmployees(prev => [...prev, { id, name, role, shiftCount: 0 }]);
    return null;
  }, [employees]);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setSchedule(prev => prev.map(day => ({
      ...day,
      assignments: day.assignments.filter(e => e.id !== id),
    })));
  }, []);

  const searchEmployees = useCallback((query: string) => {
    if (!query.trim()) return employees;
    const q = query.toLowerCase();
    return employees.filter(e => e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q));
  }, [employees]);

  const autoAssignShifts = useCallback((): string | null => {
    const roles: Role[] = ['Supervisor', 'Receptionist', 'Nurse'];
    
    for (const role of roles) {
      const count = employees.filter(e => e.role === role).length;
      if (count < ROLE_CONFIG[role].perShift) {
        return `Not enough ${role}s. Need at least ${ROLE_CONFIG[role].perShift}, have ${count}.`;
      }
    }

    // Reset shift counts
    const pool = employees.map(e => ({ ...e, shiftCount: 0 }));
    const newSchedule: ShiftDay[] = [];

    for (const day of DAYS) {
      const dayAssignments: Employee[] = [];

      for (const role of roles) {
        const needed = ROLE_CONFIG[role].perShift;
        const available = pool
          .filter(e => e.role === role && e.shiftCount < MAX_SHIFTS)
          .filter(e => !dayAssignments.some(a => a.id === e.id))
          .sort((a, b) => a.shiftCount - b.shiftCount);

        if (available.length < needed) {
          return `Cannot assign ${role}s for ${day}. Not enough available employees.`;
        }

        for (let i = 0; i < needed; i++) {
          available[i].shiftCount++;
          dayAssignments.push({ ...available[i] });
        }
      }

      newSchedule.push({ date: day, dayName: day, assignments: dayAssignments });
    }

    setEmployees(pool);
    setSchedule(newSchedule);
    return null;
  }, [employees]);

  return { employees, schedule, addEmployee, deleteEmployee, searchEmployees, autoAssignShifts };
}
