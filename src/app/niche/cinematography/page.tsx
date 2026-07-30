import { Metadata } from 'next';
import CinematographyClient from './CinematographyClient';

export const metadata: Metadata = {
  title: 'Abhi - Cinematographer',
  description: 'Premium Cinematography Portfolio',
};

export default function CinematographyPage() {
  return <CinematographyClient />;
}
