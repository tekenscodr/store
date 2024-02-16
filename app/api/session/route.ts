import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function sessionHandler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    // If session exists, return session data
    res.status(200).json({ user: session.user });
  } else {
    // If no session, return 401 Unauthorized
    res.status(401).json({ error: 'Unauthorized' });
  }
}