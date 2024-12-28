import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('history_undergrad_early')
      .select('*')
      .order('id');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: data 
    });

  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch history data' },
      { status: 500 }
    );
  }
}
