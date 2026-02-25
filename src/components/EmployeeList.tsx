import { Employee } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
}

const roleBadgeClass: Record<string, string> = {
  Supervisor: 'bg-primary/15 text-primary border-primary/30',
  Receptionist: 'bg-accent/15 text-accent border-accent/30',
  Nurse: 'bg-secondary text-secondary-foreground',
};

export default function EmployeeList({ employees, onDelete }: Props) {
  if (employees.length === 0) {
    return <p className="text-muted-foreground text-sm py-4 text-center">No employees added yet.</p>;
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">Shifts</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(emp => (
            <TableRow key={emp.id}>
              <TableCell className="font-mono text-sm">{emp.id}</TableCell>
              <TableCell className="font-medium">{emp.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={roleBadgeClass[emp.role]}>{emp.role}</Badge>
              </TableCell>
              <TableCell className="text-center">{emp.shiftCount}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onDelete(emp.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
