import { DayPlan, Itinerary, Activity } from './mockApi';

const DEFAULT_ACTIVITIES_BY_INTEREST: Record<string, Omit<Activity, 'cost'>[]> = {
  Adventure: [
    { time: 'Morning', activityName: 'Hiking & Ziplining Adventure', description: 'Explore scenic canopy trails and glide across valleys on high-speed ziplines.', location: 'Mountain Adventure Park' },
    { time: 'Afternoon', activityName: 'Whitewater Rafting', description: 'Navigate thrilling class III-IV rapids with an experienced guide.', location: 'River Gorge' },
    { time: 'Evening', activityName: 'Sunset Off-Road ATV Tour', description: 'Drive double-rider ATVs through rugged forest terrains at golden hour.', location: 'Valley Trails' },
    { time: 'Night', activityName: 'Campfire Gathering', description: 'Relax by the fire with drinks and storytelling under the stars.', location: 'Basecamp lounge' }
  ],
  Culture: [
    { time: 'Morning', activityName: 'Guided Historical Walking Tour', description: 'Walk through ancient streets, shrines, and architectural landmarks with a local historian.', location: 'Historic Medina / Old Town' },
    { time: 'Afternoon', activityName: 'Traditional Craft & Cooking Workshop', description: 'Learn local cooking styles or artisan methods from master craftsmen.', location: 'Cultural Arts Center' },
    { time: 'Evening', activityName: 'Traditional Musical & Dance Performance', description: 'Enjoy an authentic show displaying the rich folklore of the region.', location: 'Grand Theatre' },
    { time: 'Night', activityName: 'Midnight Food Street Tour', description: 'Sample ancestral street food delicacies at the night markets.', location: 'Central Food Alley' }
  ],
  Nature: [
    { time: 'Morning', activityName: 'Wildlife Safari & Birdwatching', description: 'Walk early through conservation paths to spot endemic species and photograph wildlife.', location: 'National Reserve Park' },
    { time: 'Afternoon', activityName: 'Kayaking & Waterfall Visit', description: 'Paddle serene waterways leading to magnificent cascading falls.', location: 'Green Canyon & River' },
    { time: 'Evening', activityName: 'Botanical Gardens Stroll', description: 'Explore glasshouses containing rare tropical flowers and calming water lilies.', location: 'Royal Gardens' },
    { time: 'Night', activityName: 'Stargazing at the Observatory', description: 'Peer through telescopes to see planets and constellations away from light pollution.', location: 'Highland Peak' }
  ],
  Relaxation: [
    { time: 'Morning', activityName: 'Spa & Wellness Session', description: 'Indulge in volcanic hot spring baths and deep tissue aromatherapy massages.', location: 'Premium Thermal Spa' },
    { time: 'Afternoon', activityName: 'Private Yacht Harbor Cruise', description: 'Sail gently around the coast, enjoying light music, sunbathing, and drinks.', location: 'Marina Pier' },
    { time: 'Evening', activityName: 'Sandy Beach Sunset Lounge', description: 'Sit on cushioned beach loungers enjoying cocktails and ambient music.', location: 'Sunset Cove' },
    { time: 'Night', activityName: 'Gourmet Seaside Dining', description: 'Taste five-star local seafood dishes in a private candlelit cabana.', location: 'Ocean Grill Restaurant' }
  ],
  Shopping: [
    { time: 'Morning', activityName: 'Bustling Local Artisanal Market', description: 'Bargain for custom leather goods, spices, and handmade jewelry.', location: 'City Souk & Bazaars' },
    { time: 'Afternoon', activityName: 'Modern Designer Mall Outlets', description: 'Shop duty-free international brands and futuristic gadgets.', location: 'Plaza Galleria' },
    { time: 'Evening', activityName: 'Vintage Boutique Exploration', description: 'Find unique retro garments, art pieces, and antique collectibles.', location: 'Bohemian Quarter' },
    { time: 'Night', activityName: 'Rooftop Bar Drinks & Skyline View', description: 'Celebrate purchases with cocktails overlooking the neon cityscape.', location: 'Altitude Lounge' }
  ],
  Food: [
    { time: 'Morning', activityName: 'Local Bakery & Gourmet Coffee Cupping', description: 'Taste freshly roasted single-origin coffees paired with artisanal pastries.', location: 'Artsy Cafe District' },
    { time: 'Afternoon', activityName: 'Market Street Food Crawl', description: 'Bite into sizzling local dishes, pastries, and famous regional desserts.', location: 'Downtown Food Market' },
    { time: 'Evening', activityName: 'Winery/Brewery Tour & Tasting', description: 'Tour fermentation cellars and sample award-winning local pairings.', location: 'Country Vineyards' },
    { time: 'Night', activityName: 'Fine Dining Chef Tasting Menu', description: 'Indulge in a multi-course culinary experience celebrating seasonal ingredients.', location: 'Michelin Star Bistro' }
  ]
};

// Local generator fallback
export const generateLocalItinerary = (
  destination: string,
  durationDays: number,
  budget: number,
  travelers: 'Solo' | 'Couple' | 'Family' | 'Friends',
  interests: string[]
): Omit<Itinerary, 'id' | 'createdAt'> => {
  const selectedInterests = interests.length > 0 ? interests : ['Relaxation', 'Nature'];
  const days: DayPlan[] = [];
  
  // Calculate average daily budget for activities
  // Save 40% for accommodation/logistics, leaving 60% for daily activities
  const activityBudgetPool = budget * 0.6;
  const costPerActivity = Math.round(activityBudgetPool / (durationDays * 4)); // 4 activities per day

  const morningTitles = ["Sunrise Exploration", "Scenic Start", "Historic Walk", "First Discoveries", "Fresh Beginnings"];
  const afternoonTitles = ["Midday Adventure", "Local Discovery", "Peak Action", "Core Experience", "Cultural Immersion"];
  const eveningTitles = ["Golden Hour Views", "Sunset Relaxation", "Leisure Stroll", "Unwinding Time", "Scenic Retreat"];

  for (let d = 1; d <= durationDays; d++) {
    const dayActivities: Activity[] = [];
    
    // Choose interest for this day
    const interest = selectedInterests[(d - 1) % selectedInterests.length];
    const templates = DEFAULT_ACTIVITIES_BY_INTEREST[interest] || DEFAULT_ACTIVITIES_BY_INTEREST['Relaxation'];

    const times: ('Morning' | 'Afternoon' | 'Evening' | 'Night')[] = ['Morning', 'Afternoon', 'Evening', 'Night'];

    times.forEach((time, index) => {
      const template = templates[index % templates.length];
      
      // Calculate a randomized cost that fits the general budget level
      let cost = Math.max(10, Math.round(costPerActivity * (0.6 + Math.random() * 0.8)));
      // Shopping/Relaxation might cost slightly more
      if (interest === 'Shopping' || interest === 'Relaxation') {
        cost = Math.round(cost * 1.3);
      }
      
      dayActivities.push({
        time,
        activityName: template.activityName,
        description: template.description,
        cost,
        location: `${template.location}, ${destination}`
      });
    });

    const dayTitle = `${morningTitles[(d - 1) % morningTitles.length]} & ${afternoonTitles[(d - 1) % afternoonTitles.length]}`;

    days.push({
      dayNumber: d,
      title: dayTitle,
      activities: dayActivities
    });
  }

  // Calculate actual total cost
  const totalEstimatedCost = days.reduce((sum, day) => 
    sum + day.activities.reduce((dSum, act) => dSum + act.cost, 0), 0
  );

  return {
    tripId: '',
    version: 1,
    isActive: true,
    changeLog: 'Initial creation by local TravelGenie Engine.',
    days,
    totalEstimatedCost
  };
};

// AI Generator calling Gemini
export const generateAIItinerary = async (
  destination: string,
  durationDays: number,
  budget: number,
  travelers: 'Solo' | 'Couple' | 'Family' | 'Friends',
  interests: string[],
  apiKey: string
): Promise<Omit<Itinerary, 'id' | 'createdAt'>> => {
  const prompt = `
You are an expert AI Travel Planner. Generate a detailed, realistic travel itinerary for a trip to "${destination}" for ${durationDays} days. 
- Total Budget: $${budget} USD (The sum of all activity costs MUST fit this budget).
- Travelers: ${travelers}.
- Interests: ${interests.join(', ')}.

You must output a single valid JSON object exactly matching this TypeScript structure:
{
  "changeLog": "Brief summary of the plan details",
  "days": [
    {
      "dayNumber": number,
      "title": "Title of the day",
      "activities": [
        {
          "time": "Morning" | "Afternoon" | "Evening" | "Night",
          "activityName": "Name of activity",
          "description": "Short, vivid description of what to do (1-2 sentences)",
          "cost": number (Estimated cost in USD),
          "location": "Specific venue or landmark in the destination"
        }
      ]
    }
  ],
  "totalEstimatedCost": number (Sum of all activities' costs)
}

Rules:
1. Provide exactly ${durationDays} days, with exactly 3 to 4 activities per day (covering Morning, Afternoon, Evening, Night).
2. The "totalEstimatedCost" must equal the sum of all "cost" properties in the activities.
3. Return ONLY valid JSON. No markdown blocks, no prefix like " \`\`\`json ", no suffix.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error("Empty response from Gemini API");
    }

    // Clean JSON response from potential markdown wrapping
    let cleanedJson = textResponse.trim();
    if (cleanedJson.startsWith("```json")) {
      cleanedJson = cleanedJson.substring(7);
    }
    if (cleanedJson.startsWith("```")) {
      cleanedJson = cleanedJson.substring(3);
    }
    if (cleanedJson.endsWith("```")) {
      cleanedJson = cleanedJson.substring(0, cleanedJson.length - 3);
    }
    cleanedJson = cleanedJson.trim();

    const parsed = JSON.parse(cleanedJson);
    
    // Ensure totalEstimatedCost is recalculating on client side to be safe
    let computedSum = 0;
    parsed.days.forEach((day: DayPlan) => {
      day.activities.forEach((act: Activity) => {
        computedSum += act.cost;
      });
    });

    return {
      tripId: '',
      version: 1,
      isActive: true,
      changeLog: parsed.changeLog || `AI-Generated plan for ${destination}`,
      days: parsed.days,
      totalEstimatedCost: computedSum
    };
  } catch (error) {
    console.error("AI Generation failed, falling back to local engine:", error);
    // Fall back to local generator
    return generateLocalItinerary(destination, durationDays, budget, travelers, interests);
  }
};

// AI Chat Itinerary Editor
export const editItineraryWithAI = async (
  currentItinerary: Itinerary,
  userMessage: string,
  apiKey: string
): Promise<Omit<Itinerary, 'id' | 'createdAt'>> => {
  const prompt = `
You are an expert AI Travel Planner. You need to modify an existing travel itinerary based on the user's request.
User request: "${userMessage}"

Here is the current itinerary in JSON format:
${JSON.stringify(currentItinerary, null, 2)}

Modify the itinerary accordingly. You can swap activities, adjust costs, add/remove items, or rearrange locations.
You must output a single valid JSON object exactly matching this TypeScript structure:
{
  "changeLog": "A brief description of what changes were made (e.g. 'Reduced Day 2 budget and added a beach walk')",
  "days": [
    {
      "dayNumber": number,
      "title": "Title of the day",
      "activities": [
        {
          "time": "Morning" | "Afternoon" | "Evening" | "Night",
          "activityName": "Name of activity",
          "description": "Short description of what to do",
          "cost": number (Estimated cost in USD),
          "location": "Specific venue or landmark in the destination"
        }
      ]
    }
  ],
  "totalEstimatedCost": number (Sum of all activities' costs)
}

Rules:
1. Retain the same number of days unless the user asks to change the trip length.
2. The "totalEstimatedCost" must equal the sum of all "cost" properties in the activities.
3. Return ONLY valid JSON. No markdown blocks, no prefix, no suffix.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error("Empty response from Gemini API");
    }

    let cleanedJson = textResponse.trim();
    if (cleanedJson.startsWith("```json")) {
      cleanedJson = cleanedJson.substring(7);
    }
    if (cleanedJson.endsWith("```")) {
      cleanedJson = cleanedJson.substring(0, cleanedJson.length - 3);
    }
    cleanedJson = cleanedJson.trim();

    const parsed = JSON.parse(cleanedJson);
    
    let computedSum = 0;
    parsed.days.forEach((day: DayPlan) => {
      day.activities.forEach((act: Activity) => {
        computedSum += act.cost;
      });
    });

    return {
      tripId: currentItinerary.tripId,
      version: currentItinerary.version + 1,
      isActive: true,
      changeLog: parsed.changeLog || `Modified plan based on chat request.`,
      days: parsed.days,
      totalEstimatedCost: computedSum
    };
  } catch (error) {
    console.error("AI Editing failed:", error);
    throw error;
  }
};

// AI General Chat Companion (Without modifying Itinerary, just replying)
export const getAIChatResponse = async (
  currentItinerary: Itinerary | null,
  chatHistory: { role: 'user' | 'model'; content: string }[],
  userMessage: string,
  apiKey: string
): Promise<string> => {
  const conversation = chatHistory.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
  const itineraryContext = currentItinerary 
    ? `Active Itinerary Context:\n${JSON.stringify(currentItinerary.days.map(d => ({
        day: d.dayNumber,
        title: d.title,
        activities: d.activities.map(a => `${a.time}: ${a.activityName} ($${a.cost}) at ${a.location}`)
      })), null, 2)}`
    : 'No active itinerary selected yet.';

  const prompt = `
You are TravelGenie, a friendly and experienced AI Travel Companion. 
Your goal is to answer the user's travel questions, assist with navigation/planning, and suggest changes to their itinerary.

${itineraryContext}

Previous Chat History:
${conversation}

User: ${userMessage}
Assistant (please provide a helpful, concise, and engaging reply in markdown. If the user asks you to modify the itinerary, inform them that you are updating it and will make the changes in the schedule on the left):
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I am having trouble connecting right now, but I will help you as soon as I can!";
  } catch (error) {
    console.error("AI Chat failed:", error);
    return "I couldn't reach the AI engine right now. If you're using local mode, please verify your Gemini API key in the settings, or ask me something simpler!";
  }
};
