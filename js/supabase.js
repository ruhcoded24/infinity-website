/**
 * INFINITY — THE TECH SOCIETY, SGGSCC
 * Supabase Data API Client Module (Publishable Key + RLS Protected)
 */

export const SUPABASE_URL = 'https://fxnuxpcaohosggmgnxkb.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_vK8B9K1IWPMmDRPfJCR_bg_b9N86EyA';

async function supabaseRest(path, { method = 'GET', body = null, headers = {} } = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    let payload = null;
    try {
      payload = await response.json();
    } catch (e) {
      payload = null;
    }
    const error = new Error(payload?.message || `Supabase request failed (${response.status})`);
    error.status = response.status;
    error.code = payload?.code || '';
    error.details = payload?.details || '';
    throw error;
  }

  const contentType = response.headers.get('content-type') || '';
  if (response.status === 204 || !contentType.includes('application/json')) {
    return null;
  }
  return response.json();
}

export async function submitContactInquiry({ name, email, subject, message }) {
  return supabaseRest('contact_inquiries', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: {
      name,
      email,
      subject,
      message,
      status: 'new'
    }
  });
}

export async function submitRecruitmentApplication(app) {
  return supabaseRest('recruitment_applications', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: {
      receipt_code: app.id,
      full_name: app.name,
      email: app.email,
      course: app.course,
      academic_year: app.year,
      phone: app.phone,
      preferred_domain: app.domain,
      skills: app.skills || '',
      motivation: app.why,
      portfolio_url: app.portfolio || '',
      status: 'submitted'
    }
  });
}

export async function submitEventRegistration(reg) {
  return supabaseRest('event_registrations', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: {
      pass_token: reg.passToken,
      event_id: reg.eventId,
      event_title: reg.title,
      event_date: reg.date,
      venue: reg.venue || 'SGGSCC Campus',
      category: reg.category || '',
      student_name: reg.studentName,
      student_email: reg.email,
      ticket_code: reg.ticketCode,
      pass_ref: reg.passRef,
      status: 'Confirmed'
    }
  });
}

export async function cancelEventRegistrationInDb({ passToken, ticketCode }) {
  if (!passToken || !ticketCode) return null;
  const query = `event_registrations?pass_token=eq.${encodeURIComponent(passToken)}&ticket_code=eq.${encodeURIComponent(ticketCode)}&status=eq.Confirmed`;
  return supabaseRest(query, {
    method: 'PATCH',
    headers: {
      'x-pass-token': passToken,
      Prefer: 'return=minimal'
    },
    body: {
      status: 'Cancelled',
      cancelled_at: new Date().toISOString()
    }
  });
}

export async function saveStudentProfileToDb({ profileToken, user }) {
  if (!profileToken || !user) return null;
  const payload = {
    full_name: user.name,
    college_email: user.collegeEmail,
    course: user.course,
    academic_year: user.year || '2nd Year',
    roll_no: user.rollNo || '',
    tier: user.tier || 'Member',
    bio: user.bio || '',
    updated_at: new Date().toISOString()
  };

  const updated = await supabaseRest(
    `student_profiles?profile_token=eq.${encodeURIComponent(profileToken)}`,
    {
      method: 'PATCH',
      headers: {
        'x-profile-token': profileToken,
        Prefer: 'return=representation'
      },
      body: payload
    }
  );

  if (Array.isArray(updated) && updated.length > 0) {
    return updated[0];
  }

  return supabaseRest('student_profiles', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: {
      profile_token: profileToken,
      ...payload
    }
  });
}
