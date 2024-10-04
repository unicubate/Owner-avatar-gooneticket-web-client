import { cn } from '@/lib/utils';
import {
  BellIcon,
  GlobeIcon,
  HeartIcon,
  ImageIcon,
  LockKeyholeIcon,
  MailPlusIcon,
  MenuSquareIcon,
  ScanQrCodeIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StoreIcon,
  WalletIcon,
} from 'lucide-react';
const className = 'size-12';
export const featuresLandingPage = [
  {
    icon: <ScanQrCodeIcon className={cn('text-gray-600', className)} />,
    title: 'Ticket validation',
    description: `Responsive design for smooth use on mobile for validating tickets and scanning QR codes`,
  },
  {
    icon: <BellIcon className={cn('text-gray-600', className)} />,
    title: 'Event reminder',
    description:
      'Reminder of upcoming events for which the user has reserved tickets, with practical information (time, location, etc.)',
  },
  {
    icon: <ShoppingCartIcon className={cn('text-gray-600', className)} />,
    title: 'Purchase history',
    description: `Access to the history of events booked, tickets purchased, and associated details with the possibility of re-downloading tickets and QR codes`,
  },
  {
    icon: <MailPlusIcon className={cn('text-gray-600', className)} />,
    title: 'Messages of Support',
    description: `Receive messages of encouragement from your clients.`,
  },
];

export const featuresAboutPage = [
  {
    icon: <ImageIcon className={cn('text-sky-600', className)} />,
    title: 'Gallery',
    description: 'Show your best work',
  },
  {
    icon: <MenuSquareIcon className={cn('text-pink-600', className)} />,
    title: 'Posts',
    description: `Share your work and process`,
  },
  {
    icon: <StoreIcon className={cn('text-green-600', className)} />,
    title: 'Shop',
    description: `Sell digital and physical products`,
  },
  {
    icon: <LockKeyholeIcon className={cn('text-yellow-400', className)} />,
    title: 'Supporter-Only Content',
    description: `Offer exclusive content`,
  },
  {
    icon: <WalletIcon className={cn('text-yellow-400', className)} />,
    title: 'Get Paid Directly',
    description: `Instant donations with Stripe or PayPal.`,
  },
  {
    icon: <SparklesIcon className={cn('text-rose-600', className)} />,
    title: 'Rewards',
    description: `Give something back to supporters`,
  },
  {
    icon: <MailPlusIcon className={cn('text-blue-600', className)} />,
    title: 'Messages of Support',
    description: `Engage with your supporters`,
  },
];

export const comparedLandingPage = [
  {
    icon: <MailPlusIcon className={cn('text-gray-600', className)} />,
    title: 'Email marketing',
    description: `Instead of paying separately for email marketing tools like Mailchimp, send unlimited emails to your fans for free.`,
  },
  {
    icon: <HeartIcon className={cn('text-gray-600', className)} />,
    title: 'Being friendly converts',
    description: `We make it simple and fun for your supporters. While you cannot put a number on feelings, it tends to show on the results.`,
  },
  {
    icon: <GlobeIcon className={cn('text-gray-600', className)} />,
    title: '2 new languages',
    description: `We now support French, Italian it easier for your global audience to support you.`,
  },
];
