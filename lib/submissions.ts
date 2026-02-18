// Simple file-based storage for wallet submissions
// In production, this would use Vercel KV or a database

import { promises as fs } from 'fs';
import { join } from 'path';

const SUBMISSIONS_FILE = join(process.cwd(), 'data', 'submissions.json');

interface Submission {
  address: string;
  label: string;
  category: string;
  description?: string;
  twitter?: string;
  telegram?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  portfolioValue?: number;
  totalTrades?: number;
  winRate?: number;
}

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function addSubmission(submission: Submission): Promise<void> {
  const submissions = await getSubmissions();
  
  // Check for duplicate
  const exists = submissions.find(s => 
    s.address.toLowerCase() === submission.address.toLowerCase()
  );
  
  if (exists) {
    throw new Error('Wallet already submitted');
  }
  
  submissions.push(submission);
  await fs.mkdir(join(process.cwd(), 'data'), { recursive: true });
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

export async function isWalletSubmitted(address: string): Promise<boolean> {
  const submissions = await getSubmissions();
  return submissions.some(s => 
    s.address.toLowerCase() === address.toLowerCase()
  );
}
