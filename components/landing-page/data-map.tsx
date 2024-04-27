import { cn } from '@/lib/utils';
import {
  CalendarClockIcon,
  GlobeIcon,
  HeartIcon,
  ImageIcon,
  LockKeyholeIcon,
  MailPlusIcon,
  MenuSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StoreIcon,
  WalletIcon
} from 'lucide-react';
const className = 'size-12';
export const featuresLandingPage = [
  {
    icon: <ImageIcon className={cn('text-sky-600', className)} />,
    title: 'Gallery',
    description:
      'Create a portfolio of your best work and share your creative process',
  },
  {
    icon: <MenuSquareIcon className={cn('text-pink-600', className)} />,
    title: 'Posts',
    description: `Share your creative journey with blog posts, videos and audio clips.`,
  },
  {
    icon: <StoreIcon className={cn('text-green-600', className)} />,
    title: 'Shop',
    description: `Sell digital and physical products with just a link.`,
  },
  {
    icon: <LockKeyholeIcon className={cn('text-yellow-400', className)} />,
    title: 'Supporter-Only Content',
    description: `Make exclusive content available to supporters or members.`,
  },
  {
    icon: <WalletIcon className={cn('text-yellow-400', className)} />,
    title: 'Get Paid Directly',
    description: `0% platform fees. Donations go directly to your PayPal or Stripe account.`,
  },
  {
    icon: <SparklesIcon className={cn('text-rose-600', className)} />,
    title: 'Rewards',
    description: `Let supporters unlock exclusive posts, Discord roles, Member-only products and more.`,
  },
  {
    icon: <MailPlusIcon className={cn('text-blue-600', className)} />,
    title: 'Messages of Support',
    description: `Receive messages of encouragement from your supporters.`,
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
    icon: <ShieldCheckIcon className={cn('text-gray-600', className)} />,
    title: 'Your privacy comes first',
    description: `Receive fan support safely without disclosing your identity or address. We’ll do the heavy-lifting.`,
  },
  {
    icon: <MailPlusIcon className={cn('text-gray-600', className)} />,
    title: 'Email marketing',
    description: `Instead of paying separately for email marketing tools like Mailchimp, send unlimited emails to your fans for free.`,
  },
  {
    icon: <CalendarClockIcon className={cn('text-gray-600', className)} />,
    title: 'Not just a membership',
    description: `Creators who previously only used Patreon noticed a massive increase in earnings after accepting one-off payments.`,
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
