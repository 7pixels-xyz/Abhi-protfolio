import { Metadata } from 'next';
import WebDesignClient from './WebDesignClient';

export const metadata: Metadata = {
  title: 'Abhi - Web Designer',
  description: 'Premium Web Design Portfolio',
};

export default function WebDesignPage() {
  return <WebDesignClient />;
}
