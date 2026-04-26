'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createCommentTrigger(formData: FormData) {
  const userId = formData.get('user_id') as string;
  const keyword = formData.get('keyword') as string;
  const responseType = formData.get('response_type') as string; // 'link' or 'AI'
  const payloadString = formData.get('payload') as string;

  if (!userId || !keyword || !responseType || !payloadString) {
    return { error: 'Missing required fields' };
  }

  let payload;
  try {
    payload = JSON.parse(payloadString);
  } catch (error) {
    return { error: 'Invalid JSON payload' };
  }

  const { data, error } = await supabase
    .from('triggers')
    .insert([
      {
        user_id: userId,
        keyword,
        response_type: responseType,
        payload,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting trigger:', error);
    return { error: error.message };
  }

  // Revalidate the dashboard or relevant path to reflect the new trigger
  revalidatePath('/dashboard');

  return { success: true, data };
}

export async function deleteCommentTrigger(triggerId: string) {
  const { error } = await supabase
    .from('triggers')
    .delete()
    .eq('id', triggerId);

  if (error) {
    console.error('Error deleting trigger:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/triggers');
  return { success: true };
}
