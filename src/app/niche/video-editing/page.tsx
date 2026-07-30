import { Metadata } from 'next';
import VideoEditorClient from './VideoEditorClient';

export const metadata: Metadata = {
  title: 'Abhi - Video Editor',
  description: 'Premium Video Editing Portfolio',
};

export default function VideoEditingPage() {
  return <VideoEditorClient />;
}
