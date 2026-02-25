import { ShiftDay } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface Props {
  schedule: ShiftDay[];
}

export default function ShiftSchedule({ schedule }: Props) {
  if (schedule.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p>No schedule generated yet. Add employees and click "Auto-Assign Shifts".</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Day</TableHead>
            <TableHead>Supervisors</TableHead>
            <TableHead>Receptionist</TableHead>
            <TableHead>Nurse</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map(day => (
            <TableRow key={day.dayName}>
              <TableCell className="font-semibold">{day.dayName}</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {day.assignments.filter(e => e.role === 'Supervisor').map(e => (
                    <Badge key={e.id} variant="outline" className="bg-primary/10 text-primary border-primary/30">{e.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {day.assignments.filter(e => e.role === 'Receptionist').map(e => (
                    <Badge key={e.id} variant="outline" className="bg-accent/10 text-accent border-accent/30">{e.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {day.assignments.filter(e => e.role === 'Nurse').map(e => (
                    <Badge key={e.id} variant="outline" className="bg-secondary text-secondary-foreground">{e.name}</Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
