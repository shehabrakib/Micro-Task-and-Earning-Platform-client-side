export type HeroSlide = {
  id: string
  heading: string
  subtitle: string
  primaryActionLabel: string
  primaryActionPath: string
  secondaryActionLabel: string
  secondaryActionPath: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  imageUrl: string
  quote: string
}

export type ProcessStep = {
  id: string
  title: string
  description: string
}

export type HomeFeature = {
  id: string
  title: string
  description: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    heading: 'Post real micro tasks and finish work faster',
    subtitle:
      'Buyers can create clear tasks with budgets, while workers pick opportunities that match their skills.',
    primaryActionLabel: 'Create Account',
    primaryActionPath: '/register',
    secondaryActionLabel: 'Login',
    secondaryActionPath: '/login',
  },
  {
    id: 'hero-2',
    heading: 'Workers earn coins by completing clear instructions',
    subtitle:
      'Every approved submission rewards coins, and workers can track earnings before requesting withdrawal.',
    primaryActionLabel: 'Start as Worker',
    primaryActionPath: '/register',
    secondaryActionLabel: 'View Dashboard Route',
    secondaryActionPath: '/dashboard',
  },
  {
    id: 'hero-3',
    heading: 'One platform for workers, buyers, and admins',
    subtitle:
      'TaskEarn keeps each role organized with dedicated dashboards, notifications, and transparent coin flow.',
    primaryActionLabel: 'Join TaskEarn',
    primaryActionPath: '/register',
    secondaryActionLabel: 'Explore Home',
    secondaryActionPath: '/',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Ayesha Rahman',
    role: 'Worker',
    imageUrl: 'https://i.pravatar.cc/120?img=5',
    quote:
      'TaskEarn makes instructions clear. I can complete tasks quickly and track my earning progress without confusion.',
  },
  {
    id: 'testimonial-2',
    name: 'Sadia Karim',
    role: 'Buyer',
    imageUrl: 'https://i.pravatar.cc/120?img=24',
    quote:
      'Posting tasks is straightforward, and submission review gives me confidence that I only pay for quality work.',
  },
  {
    id: 'testimonial-3',
    name: 'Nabil Hasan',
    role: 'Worker',
    imageUrl: 'https://i.pravatar.cc/120?img=12',
    quote:
      'The platform feels fair because approvals, rejections, and coin updates are visible and easy to understand.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    title: 'Buyers create tasks',
    description:
      'Buyers define task details, number of workers needed, and coin reward per worker.',
  },
  {
    id: 'step-2',
    title: 'Workers submit proof',
    description:
      'Workers choose open tasks, follow instructions carefully, then submit task proof in one place.',
  },
  {
    id: 'step-3',
    title: 'Rewards are settled',
    description:
      'Approved submissions add coins to workers, while admins oversee platform health and withdrawals.',
  },
]

export const whyTaskEarnFeatures: HomeFeature[] = [
  {
    id: 'feature-1',
    title: 'Role-based workspace',
    description:
      'Workers, buyers, and admins each get a focused workflow that reduces clutter and mistakes.',
  },
  {
    id: 'feature-2',
    title: 'Simple coin economy',
    description:
      'Coins make reward calculations clear for task posting, earnings, and withdrawals.',
  },
  {
    id: 'feature-3',
    title: 'Notification driven flow',
    description:
      'Approval, rejection, and payout updates keep users informed at the right moment.',
  },
]
