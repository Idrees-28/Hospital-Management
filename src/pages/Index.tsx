import { useState } from 'react';
import { useShiftManager } from '@/hooks/useShiftManager';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import EmployeeList from '@/components/EmployeeList';
import ShiftSchedule from '@/components/ShiftSchedule';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CalendarCheck, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { employees, schedule, addEmployee, deleteEmployee, searchEmployees, autoAssignShifts } = useShiftManager();
  const [search, setSearch] = useState('');

  const filtered = searchEmployees(search);

  const handleAutoAssign = () => {
    const err = autoAssignShifts();
    if (err) {
      toast.error(err);
    } else {
      toast.success('Weekly shifts assigned successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Activity className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Hospital Shift Manager</h1>
            <p className="text-sm text-muted-foreground">Day Shift Management System</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-5xl">
        {/* Add Employee */}
        <Card>
          <CardContent className="pt-6">
            <AddEmployeeForm onAdd={addEmployee} />
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg">Employees ({employees.length})</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EmployeeList employees={filtered} onDelete={deleteEmployee} />
          </CardContent>
        </Card>

        {/* Shift Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" /> Weekly Schedule
              </CardTitle>
              <Button onClick={handleAutoAssign} disabled={employees.length === 0}>
                Auto-Assign Shifts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ShiftSchedule schedule={schedule} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
