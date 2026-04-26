import { supabase } from '@/lib/supabase';
import TriggerLabClient from './TriggerLabClient';

// Using a mock user ID for now since auth isn't fully implemented
const MOCK_USER_ID = '123e4567-e89b-12d3-a456-426614174000';

export default async function TriggersPage() {
  // Fetch triggers for the current user
  const { data: triggers, error } = await supabase
    .from('triggers')
    .select('*')
    .eq('user_id', MOCK_USER_ID)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching triggers:', error);
  }

  return (
    <div className="p-8 pb-20">
      <TriggerLabClient initialTriggers={triggers || []} />
    </div>
  );
}
