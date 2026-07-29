export interface Destination {
  id: string;
  title: string;
  location: string;
  country: string;
  category: 'Beach' | 'Adventure' | 'Culture' | 'City' | 'Nature';
  shortDescription: string;
  fullDescription: string;
  priceLevel: 'Budget' | 'Moderate' | 'Luxury';
  averageCost: number;
  bestSeason: string;
  duration: number;
  imageUrl: string;
  rating: number;
  createdBy: string; // 'admin' or userId
  reviews: Review[];
  createdAt: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Activity {
  time: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  activityName: string;
  description: string;
  cost: number;
  location: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  version: number;
  isActive: boolean;
  changeLog: string;
  days: DayPlan[];
  totalEstimatedCost: number;
  createdAt: string;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  durationDays: number;
  budget: number;
  travelers: 'Solo' | 'Couple' | 'Family' | 'Friends';
  interests: string[];
  activeItineraryId: string | null;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  tripId: string;
  role: 'user' | 'model';
  content: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// --- SSR-safe localStorage wrapper ---
// Next.js renders on the server first, where `window`/`localStorage` don't exist.
// Every read/write goes through this helper so nothing crashes during SSR.
const isBrowser = () => typeof window !== "undefined";

const storage = {
  get(key: string): string | null {
    if (!isBrowser()) return null;
    return localStorage.getItem(key);
  },

  set(key: string, value: string): void {
    if (!isBrowser()) return;
    localStorage.setItem(key, value);
  }
};

// Small helper to avoid repeating `JSON.parse(storage.get(key) || fallback)` everywhere
const readJson = <T>(key: string, fallback: T): T => {
  const raw = storage.get(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

// Initial seed data for destinations
const SEED_DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    title: "Ancient Temples & Bamboo Groves",
    location: "Kyoto",
    country: "Japan",
    category: "Culture",
    shortDescription: "Immerse yourself in traditional Japan with scenic wooden temples, serene gardens, and vibrant tea ceremonies.",
    fullDescription: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its thousands of classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
    priceLevel: "Moderate",
    averageCost: 1200,
    bestSeason: "Spring (Cherry Blossom) & Autumn",
    duration: 5,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    createdBy: "admin",
    reviews: [
      { userName: "Emily Watson", rating: 5, comment: "Kyoto is absolutely magical. The temples and gardens are breathtaking.", createdAt: "2026-06-15T10:00:00Z" },
      { userName: "Kenji Sato", rating: 4, comment: "Beautiful city, though very crowded during spring.", createdAt: "2026-07-02T14:30:00Z" }
    ],
    createdAt: "2026-05-01T12:00:00Z"
  },
  {
    id: "dest-2",
    title: "Sun-Drenched Cliffs & Blue Domes",
    location: "Santorini",
    country: "Greece",
    category: "Beach",
    shortDescription: "Experience iconic whitewashed villages perched high above the sparkling blue Aegean Sea.",
    fullDescription: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The giant, water-filled caldera is overlooked by whitewashed houses clinging to vertical cliffs, offering legendary sunset views over the submerged crater.",
    priceLevel: "Luxury",
    averageCost: 2500,
    bestSeason: "Summer (June to September)",
    duration: 4,
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    createdBy: "admin",
    reviews: [
      { userName: "Sophia Loren", rating: 5, comment: "Unbelievable sunsets. A romantic paradise!", createdAt: "2026-06-20T18:22:00Z" }
    ],
    createdAt: "2026-05-02T12:00:00Z"
  },
  {
    id: "dest-3",
    title: "Turquoise Lakes & Majestic peaks",
    location: "Banff National Park",
    country: "Canada",
    category: "Nature",
    shortDescription: "Discover Canada's oldest national park nestled in the heart of the snowcapped Rocky Mountains.",
    fullDescription: "Banff National Park is Canada's oldest national park, established in 1885. Located in the Rocky Mountains, it encompasses mountainous terrain, with numerous glaciers and ice fields, dense coniferous forest, and alpine landscapes. The Icefields Parkway extends from Lake Louise, connecting to Jasper National Park in the north.",
    priceLevel: "Moderate",
    averageCost: 1500,
    bestSeason: "Winter (Skiing) & Summer (Hiking)",
    duration: 6,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    createdBy: "admin",
    reviews: [
      { userName: "Liam Neeson", rating: 5, comment: "Lake Louise is stunning. Highly recommended for nature enthusiasts.", createdAt: "2026-07-05T09:12:00Z" }
    ],
    createdAt: "2026-05-03T12:00:00Z"
  },
  {
    id: "dest-4",
    title: "Vibrant Souks & Ancient Palaces",
    location: "Marrakech",
    country: "Morocco",
    category: "Culture",
    shortDescription: "Immerse yourself in a sensory kaleidoscope of spices, bustling markets, and stunning Islamic architecture.",
    fullDescription: "Marrakech, a former imperial city in western Morocco, is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with mazelike alleys where thriving souks (marketplaces) sell traditional textiles, pottery and jewelry.",
    priceLevel: "Budget",
    averageCost: 800,
    bestSeason: "Spring (March to May) & Autumn",
    duration: 3,
    imageUrl: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    createdBy: "admin",
    reviews: [
      { userName: "Omar Sy", rating: 4, comment: "The colors, the smells, the energy! An incredible experience.", createdAt: "2026-06-30T11:45:00Z" }
    ],
    createdAt: "2026-05-04T12:00:00Z"
  },
  {
    id: "dest-5",
    title: "Fjord Adventures & Alpine Thrills",
    location: "Queenstown",
    country: "New Zealand",
    category: "Adventure",
    shortDescription: "The adventure capital of the world, offering bungee jumping, jet boating, and spectacular alpine trails.",
    fullDescription: "Queenstown, New Zealand, sits on the shores of the South Island's Lake Wakatipu, set against the dramatic Southern Alps. Renowned for adventure sports, it's also a base for exploring the region's historic gold-mining towns and vineyards of Central Otago. There is bungee jumping off Kawarau Gorge Suspension Bridge and jet-boating on the Shotover and Dart rivers.",
    priceLevel: "Luxury",
    averageCost: 2800,
    bestSeason: "December to February (Summer) & July-August (Ski)",
    duration: 7,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    createdBy: "admin",
    reviews: [
      { userName: "Chris Hemsworth", rating: 5, comment: "Skydiving over Lake Wakatipu is something I will never forget. A must visit!", createdAt: "2026-07-10T15:20:00Z" }
    ],
    createdAt: "2026-05-05T12:00:00Z"
  },
  {
    id: "dest-6",
    title: "Lush Rainforests & Volcanic Wonders",
    location: "Arenal Volcano",
    country: "Costa Rica",
    category: "Nature",
    shortDescription: "Hike through active volcanic fields, soak in natural hot springs, and zip-line through cloud forests.",
    fullDescription: "Arenal Volcano National Park is located in the fertile northern lowlands of Costa Rica. The park's main attraction is the active Arenal Volcano, which regularly spews columns of ash and lava. Surrounding the volcano are rich rainforests teeming with exotic wildlife, beautiful waterfalls, and thermal hot springs.",
    priceLevel: "Moderate",
    averageCost: 1400,
    bestSeason: "Dry Season (December to April)",
    duration: 5,
    imageUrl: "https://images.unsplash.com/photo-1538681105587-85640e61201e?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    createdBy: "admin",
    reviews: [
      { userName: "Elena Rostova", rating: 5, comment: "Soaking in the Tabacon hot springs with views of the volcano is unreal.", createdAt: "2026-07-14T20:05:00Z" }
    ],
    createdAt: "2026-05-06T12:00:00Z"
  },
  {
    id: "dest-7",
    title: "Historic Romance & High Fashion",
    location: "Paris",
    country: "France",
    category: "City",
    shortDescription: "Indulge in art, world-class gastronomy, and iconic architecture along the River Seine.",
    fullDescription: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    priceLevel: "Luxury",
    averageCost: 2200,
    bestSeason: "Spring (April to June) & Autumn",
    duration: 4,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    createdBy: "admin",
    reviews: [
      { userName: "Marc Jacobs", rating: 4, comment: "Timeless city, always inspiring. Amazing croissants!", createdAt: "2026-06-25T08:15:00Z" }
    ],
    createdAt: "2026-05-07T12:00:00Z"
  },
  {
    id: "dest-8",
    title: "Private Overwater Bungalows & Reefs",
    location: "Maldives",
    country: "Maldives",
    category: "Beach",
    shortDescription: "Relax on powder-white beaches, swim with manta rays, and sleep over crystal-clear lagoons.",
    fullDescription: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons and extensive reefs. The capital, Malé, has a busy fish market, restaurants and shops on the main road, Majeedhee Magu.",
    priceLevel: "Luxury",
    averageCost: 3200,
    bestSeason: "November to April",
    duration: 5,
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    createdBy: "admin",
    reviews: [
      { userName: "Jessica Alba", rating: 5, comment: "Pure heaven. The water clarity is unmatched.", createdAt: "2026-07-16T17:40:00Z" }
    ],
    createdAt: "2026-05-08T12:00:00Z"
  }
];

// Helper to initialize localStorage collections (browser-only)
const initializeDatabase = () => {
  if (!isBrowser()) return;

  if (!storage.get("tg_destinations")) {
    storage.set("tg_destinations", JSON.stringify(SEED_DESTINATIONS));
  }
  if (!storage.get("tg_trips")) {
    storage.set("tg_trips", JSON.stringify([]));
  }
  if (!storage.get("tg_itineraries")) {
    storage.set("tg_itineraries", JSON.stringify([]));
  }
  if (!storage.get("tg_messages")) {
    storage.set("tg_messages", JSON.stringify([]));
  }
  if (!storage.get("tg_contacts")) {
    storage.set("tg_contacts", JSON.stringify([]));
  }
};

// Only run on the client — this file may be imported during server rendering
if (isBrowser()) {
  initializeDatabase();
}

// --- API Helpers ---

export const mockApi = {
  // Destinations
  getDestinations: (): Destination[] => {
    if (!isBrowser()) return [];
    initializeDatabase();
    return readJson<Destination[]>("tg_destinations", []);
  },

  getDestinationById: (id: string): Destination | undefined => {
    const list = mockApi.getDestinations();
    return list.find(d => d.id === id);
  },

  addDestination: (dest: Omit<Destination, 'id' | 'reviews' | 'createdAt' | 'rating'>): Destination | undefined => {
    if (!isBrowser()) return undefined;
    const list = mockApi.getDestinations();
    const newDest: Destination = {
      ...dest,
      id: "dest-" + Date.now(),
      rating: 4.5 + Math.random() * 0.5, // assign random high rating
      reviews: [],
      createdAt: new Date().toISOString()
    };
    list.unshift(newDest);
    storage.set("tg_destinations", JSON.stringify(list));
    return newDest;
  },

  deleteDestination: (id: string): boolean => {
    if (!isBrowser()) return false;
    const list = mockApi.getDestinations();
    const filtered = list.filter(d => d.id !== id);
    if (filtered.length === list.length) return false;
    storage.set("tg_destinations", JSON.stringify(filtered));
    return true;
  },

  addReview: (destId: string, review: Review): Destination | undefined => {
    if (!isBrowser()) return undefined;
    const list = mockApi.getDestinations();
    const destIndex = list.findIndex(d => d.id === destId);
    if (destIndex === -1) return undefined;

    list[destIndex].reviews.push(review);

    // Recalculate average rating
    const totalRating = list[destIndex].reviews.reduce((acc, r) => acc + r.rating, 0);
    list[destIndex].rating = parseFloat((totalRating / list[destIndex].reviews.length).toFixed(1));

    storage.set("tg_destinations", JSON.stringify(list));
    return list[destIndex];
  },

  // Trips & Itineraries
  getTrips: (userId: string): Trip[] => {
    if (!isBrowser()) return [];
    const list = readJson<Trip[]>("tg_trips", []);
    return list.filter(t => t.userId === userId);
  },

  getTripById: (id: string): Trip | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<Trip[]>("tg_trips", []);
    return list.find(t => t.id === id);
  },

  createTrip: (trip: Omit<Trip, 'id' | 'activeItineraryId' | 'createdAt'>): Trip | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<Trip[]>("tg_trips", []);
    const newTrip: Trip = {
      ...trip,
      id: "trip-" + Date.now(),
      activeItineraryId: null,
      createdAt: new Date().toISOString()
    };
    list.unshift(newTrip);
    storage.set("tg_trips", JSON.stringify(list));
    return newTrip;
  },

  deleteTrip: (id: string): boolean => {
    if (!isBrowser()) return false;
    const list = readJson<Trip[]>("tg_trips", []);
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length === list.length) return false;
    storage.set("tg_trips", JSON.stringify(filtered));

    // Clean up itineraries and messages for this trip
    const itineraries = readJson<Itinerary[]>("tg_itineraries", []);
    const filteredItin = itineraries.filter(i => i.tripId !== id);
    storage.set("tg_itineraries", JSON.stringify(filteredItin));

    const messages = readJson<ChatMessage[]>("tg_messages", []);
    const filteredMsg = messages.filter(m => m.tripId !== id);
    storage.set("tg_messages", JSON.stringify(filteredMsg));

    return true;
  },

  getItineraries: (tripId: string): Itinerary[] => {
    if (!isBrowser()) return [];
    const list = readJson<Itinerary[]>("tg_itineraries", []);
    return list.filter(i => i.tripId === tripId).sort((a, b) => b.version - a.version);
  },

  getItineraryById: (id: string): Itinerary | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<Itinerary[]>("tg_itineraries", []);
    return list.find(i => i.id === id);
  },

  saveItinerary: (itinerary: Omit<Itinerary, 'id' | 'createdAt'>): Itinerary | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<Itinerary[]>("tg_itineraries", []);

    // If setting active, deactivate others of this trip
    if (itinerary.isActive) {
      list.forEach(i => {
        if (i.tripId === itinerary.tripId) {
          i.isActive = false;
        }
      });
    }

    const newItinerary: Itinerary = {
      ...itinerary,
      id: "itinerary-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString()
    };
    list.unshift(newItinerary);
    storage.set("tg_itineraries", JSON.stringify(list));

    // Update trip's activeItineraryId if active
    if (newItinerary.isActive) {
      const trips = readJson<Trip[]>("tg_trips", []);
      const tripIndex = trips.findIndex(t => t.id === newItinerary.tripId);
      if (tripIndex !== -1) {
        trips[tripIndex].activeItineraryId = newItinerary.id;
        storage.set("tg_trips", JSON.stringify(trips));
      }
    }

    return newItinerary;
  },

  setActiveItinerary: (tripId: string, itineraryId: string): boolean => {
    if (!isBrowser()) return false;
    const list = readJson<Itinerary[]>("tg_itineraries", []);
    const itineraries = list.filter(i => i.tripId === tripId);
    let found = false;
    itineraries.forEach(i => {
      if (i.id === itineraryId) {
        i.isActive = true;
        found = true;
      } else {
        i.isActive = false;
      }
    });

    if (!found) return false;
    storage.set("tg_itineraries", JSON.stringify(list));

    const trips = readJson<Trip[]>("tg_trips", []);
    const tripIndex = trips.findIndex(t => t.id === tripId);
    if (tripIndex !== -1) {
      trips[tripIndex].activeItineraryId = itineraryId;
      storage.set("tg_trips", JSON.stringify(trips));
    }
    return true;
  },

  // Chat Messages
  getChatMessages: (tripId: string): ChatMessage[] => {
    if (!isBrowser()) return [];
    const list = readJson<ChatMessage[]>("tg_messages", []);
    return list
      .filter(m => m.tripId === tripId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  addChatMessage: (tripId: string, role: 'user' | 'model', content: string): ChatMessage | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<ChatMessage[]>("tg_messages", []);
    const newMsg: ChatMessage = {
      id: "msg-" + Date.now() + "-" + Math.floor(Math.random() * 100),
      tripId,
      role,
      content,
      createdAt: new Date().toISOString()
    };
    list.push(newMsg);
    storage.set("tg_messages", JSON.stringify(list));
    return newMsg;
  },

  // Contacts
  saveContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage | undefined => {
    if (!isBrowser()) return undefined;
    const list = readJson<ContactMessage[]>("tg_contacts", []);
    const newMsg: ContactMessage = {
      ...msg,
      id: "contact-" + Date.now(),
      createdAt: new Date().toISOString()
    };
    list.unshift(newMsg);
    storage.set("tg_contacts", JSON.stringify(list));
    return newMsg;
  }
};