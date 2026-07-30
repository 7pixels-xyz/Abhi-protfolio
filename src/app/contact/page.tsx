import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Abhi - Contact',
  description: 'Get in touch for specialized creative services.',
};

export default function ContactPage() {
  return <ContactClient />;
}
