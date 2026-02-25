import { useState } from 'react';
import { Role } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';

interface Props {
  onAdd: (id: string, name: string, role: Role) => string | null;
}

export default function AddEmployeeForm({ onAdd }: Props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('Nurse');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = onAdd(id.trim(), name.trim(), role);
    if (err) {
      setError(err);
    } else {
      setId('');
      setName('');
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-primary" /> Add Employee
      </h3>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input placeholder="Employee ID" value={id} onChange={e => setId(e.target.value)} />
        <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <Select value={role} onValueChange={v => setRole(v as Role)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Supervisor">Supervisor</SelectItem>
            <SelectItem value="Receptionist">Receptionist</SelectItem>
            <SelectItem value="Nurse">Nurse</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full sm:w-auto">Add Employee</Button>
    </form>
  );
}
