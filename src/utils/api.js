export async function fetchTripPlan(searchQuery, searchBudget) {
  if (!searchQuery.trim()) return { error: "Search query is empty" };
  
  try {
    const locations = searchQuery
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
      
    const response = await fetch("https://api.466marys.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locations, budget: searchBudget }),
    });
    
    const data = await response.json();
    
    if (data && data.data) {
      return { data: data.data };
    } else {
      return { error: "Invalid data format received from API." };
    }
  } catch (error) {
    console.error("Search failed:", error);
    return { error: error.message || "Failed to fetch data. Please try again." };
  }
}
