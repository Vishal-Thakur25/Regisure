'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { LoginSchema } from '@/lib/validation';
import { signAdminToken, setAdminSessionCookie, clearAdminSessionCookie, getAdminSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function loginAdminAction(formData: FormData) {
  try {
    const rawEmail = formData.get('email') as string;
    const rawPassword = formData.get('password') as string;

    const rateCheck = checkRateLimit(`login_${rawEmail}`, 5, 60 * 1000);
    if (!rateCheck.success) {
      return { success: false, error: 'Too many login attempts. Please try again in 1 minute.' };
    }

    const validated = LoginSchema.safeParse({ email: rawEmail, password: rawPassword });
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const { email, password } = validated.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return { success: false, error: 'Invalid email or password' };
    }

    const token = await signAdminToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setAdminSessionCookie(token);

    return { success: true };
  } catch (error) {
    console.error('Login action error:', error);
    return { success: false, error: 'An unexpected server error occurred. Please try again.' };
  }
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();
  return { success: true };
}

export async function getCurrentAdmin() {
  return getAdminSession();
}
