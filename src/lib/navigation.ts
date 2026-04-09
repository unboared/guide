export type NavItem = {
  slug: string;
  titleFr: string;
  titleEn: string;
};

export type NavSection = {
  key: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    key: "discover",
    items: [
      {
        slug: "how-it-works",
        titleFr: "Comment ça marche",
        titleEn: "How It Works",
      },
      {
        slug: "equipment",
        titleFr: "Ce dont vous avez besoin",
        titleEn: "What You Need",
      },
    ],
  },
  {
    key: "getting-started",
    items: [
      {
        slug: "create-account",
        titleFr: "Créer votre compte",
        titleEn: "Create Your Account",
      },
      {
        slug: "install",
        titleFr: "Installer Unboared",
        titleEn: "Install Unboared",
      },
      {
        slug: "first-game",
        titleFr: "Lancer votre première partie",
        titleEn: "Launch Your First Game",
      },
      {
        slug: "invite-team",
        titleFr: "Inviter votre équipe",
        titleEn: "Invite Your Team",
      },
    ],
  },
  {
    key: "games",
    items: [
      {
        slug: "games-overview",
        titleFr: "Vue d'ensemble",
        titleEn: "Overview",
      },
      { slug: "petit-bac", titleFr: "P'tit Bac", titleEn: "P'tit Bac" },
      { slug: "geoloc", titleFr: "GeoLoc", titleEn: "GeoLoc" },
      {
        slug: "unblind-test",
        titleFr: "Unblind Test",
        titleEn: "Unblind Test",
      },
      { slug: "unquizz", titleFr: "UnQuizz", titleEn: "UnQuizz" },
      {
        slug: "bomber-kitten",
        titleFr: "Bomber Kitten",
        titleEn: "Bomber Kitten",
      },
      { slug: "gloofy-pop", titleFr: "Gloofy Pop", titleEn: "Gloofy Pop" },
    ],
  },
  {
    key: "animate",
    items: [
      {
        slug: "prepare-event",
        titleFr: "Préparer votre soirée",
        titleEn: "Prepare Your Event",
      },
      {
        slug: "during-event",
        titleFr: "Pendant l'animation",
        titleEn: "During the Event",
      },
      {
        slug: "screen-controls",
        titleFr: "Les contrôles de l'écran",
        titleEn: "Screen Controls",
      },
      {
        slug: "communication-tips",
        titleFr: "Bonnes pratiques de communication",
        titleEn: "Communication Tips",
      },
    ],
  },
  {
    key: "event-ideas",
    items: [
      {
        slug: "blind-test-night",
        titleFr: "Soirée Blind Test",
        titleEn: "Blind Test Night",
      },
      {
        slug: "quiz-night",
        titleFr: "Soirée Quiz",
        titleEn: "Quiz Night",
      },
      {
        slug: "multi-game-night",
        titleFr: "Soirée Multi-jeux",
        titleEn: "Multi-Game Night",
      },
      {
        slug: "arcade-night",
        titleFr: "Soirée Arcade",
        titleEn: "Arcade Night",
      },
    ],
  },
  {
    key: "dashboard",
    items: [
      {
        slug: "dashboard-overview",
        titleFr: "Vue d'ensemble",
        titleEn: "Overview",
      },
      {
        slug: "statistics",
        titleFr: "Comprendre vos statistiques",
        titleEn: "Understanding Your Statistics",
      },
      {
        slug: "manage-team",
        titleFr: "Gérer votre équipe",
        titleEn: "Manage Your Team",
      },
      {
        slug: "collect-data",
        titleFr: "Collecter des données",
        titleEn: "Collect User Data",
      },
    ],
  },
  {
    key: "account",
    items: [
      {
        slug: "manage-subscription",
        titleFr: "Gérer mon abonnement",
        titleEn: "Manage My Subscription",
      },
      {
        slug: "profile-settings",
        titleFr: "Modifier mon profil",
        titleEn: "Profile Settings",
      },
    ],
  },
  {
    key: "help",
    items: [
      { slug: "faq", titleFr: "FAQ", titleEn: "FAQ" },
      {
        slug: "connection-issues",
        titleFr: "Problèmes de connexion",
        titleEn: "Connection Issues",
      },
      {
        slug: "sound-display-issues",
        titleFr: "Son et affichage",
        titleEn: "Sound & Display",
      },
      {
        slug: "contact-support",
        titleFr: "Contacter le support",
        titleEn: "Contact Support",
      },
    ],
  },
  {
    key: "resources",
    items: [
      {
        slug: "resources",
        titleFr: "Ressources & liens utiles",
        titleEn: "Resources & Useful Links",
      },
    ],
  },
];

export function getAllSlugs(): string[] {
  return navigation.flatMap((section) => section.items.map((item) => item.slug));
}

export function getNavItem(slug: string): NavItem | undefined {
  for (const section of navigation) {
    const item = section.items.find((i) => i.slug === slug);
    if (item) return item;
  }
  return undefined;
}

export function getAdjacentPages(slug: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const allItems = navigation.flatMap((s) => s.items);
  const index = allItems.findIndex((i) => i.slug === slug);
  return {
    prev: index > 0 ? allItems[index - 1] : null,
    next: index < allItems.length - 1 ? allItems[index + 1] : null,
  };
}
