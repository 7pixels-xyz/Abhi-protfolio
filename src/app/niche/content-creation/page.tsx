import { Metadata } from 'next';
import ContentCreationClient from './ContentCreationClient';

export const metadata: Metadata = {
  title: 'Abhi - Content Creator',
  description: 'Premium Content Creation Portfolio',
};

export default function ContentCreationPage() {
  return <ContentCreationClient />;
}
