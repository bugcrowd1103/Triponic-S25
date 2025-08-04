import React, { useState } from "react";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Star,
  RotateCcw,
  Filter,
} from "lucide-react";

const demoFlights = [
  {
    id: 1,
    from: "New York (JFK)",
    to: "London (LHR)",
    departure: "2024-09-15T07:30:00",
    duration: "7h 15m",
    stops: 0,
    price: 650,
    airline: "British Airways",
    rating: 4.5,
  },
  {
    id: 2,
    from: "Los Angeles (LAX)",
    to: "Tokyo (NRT)",
    departure: "2024-09-16T12:00:00",
    duration: "11h 50m",
    stops: 1,
    price: 1200,
    airline: "Japan Airlines",
    rating: 4.8,
  },
  {
    id: 3,
    from: "Dubai (DXB)",
    to: "Sydney (SYD)",
    departure: "2024-09-18T23:00:00",
    duration: "14h 10m",
    stops: 0,
    price: 980,
    airline: "Emirates",
    rating: 4.7,
  },
  {
    id: 4,
    from: "London (LHR)",
    to: "New York (JFK)",
    departure: "2024-09-20T09:45:00",
    duration: "7h 20m",
    stops: 0,
    price: 670,
    airline: "British Airways",
    rating: 4.6,
  },
  {
    id: 5,
    from: "Sydney (SYD)",
    to: "Dubai (DXB)",
    departure: "2024-09-22T15:00:00",
    duration: "13h 50m",
    stops: 1,
    price: 1020,
    airline: "Qantas",
    rating: 4.4,
  },
  {
    id: 6,
    from: "Tokyo (NRT)",
    to: "Los Angeles (LAX)",
    departure: "2024-09-25T07:00:00",
    duration: "11h 45m",
    stops: 0,
    price: 1190,
    airline: "Japan Airlines",
    rating: 4.9,
  },
  {
    id: 7,
    from: "Frankfurt (FRA)",
    to: "Toronto (YYZ)",
    departure: "2024-09-27T14:30:00",
    duration: "8h 30m",
    stops: 1,
    price: 800,
    airline: "Lufthansa",
    rating: 4.3,
  },
  {
    id: 8,
    from: "Toronto (YYZ)",
    to: "Frankfurt (FRA)",
    departure: "2024-09-29T09:00:00",
    duration: "8h 25m",
    stops: 1,
    price: 810,
    airline: "Air Canada",
    rating: 4.2,
  },
  {
    id: 9,
    from: "Madrid (MAD)",
    to: "Buenos Aires (EZE)",
    departure: "2024-10-01T21:15:00",
    duration: "12h 40m",
    stops: 2,
    price: 950,
    airline: "Iberia",
    rating: 4.0,
  },
  {
    id: 10,
    from: "Singapore (SIN)",
    to: "London (LHR)",
    departure: "2024-10-05T22:00:00",
    duration: "13h 30m",
    stops: 0,
    price: 1100,
    airline: "Singapore Airlines",
    rating: 4.8,
  },
];

const airlines = [
  "British Airways",
  "Japan Airlines",
  "Emirates",
  "Qantas",
  "Lufthansa",
  "Air Canada",
  "Iberia",
  "Singapore Airlines",
  "KLM",
  "Air India",
];

const renderStars = (rating: number) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="w-4 h-4 fill-yellow-400 text-yellow-400"
      />
    );
  }
  if (half) {
    stars.push(
      <div key="half" className="relative">
        <Star className="w-4 h-4 text-gray-200" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    );
  }
  while (stars.length < 5) {
    stars.push(
      <Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-200" />
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const Flights: React.FC = () => {
  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  });
  const [filters, setFilters] = useState({
    stops: null as number | null,
    maxPrice: 1500,
    airline: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState(demoFlights);

  const resetAll = () => {
    setFilters({ stops: null, maxPrice: 1500, airline: "" });
    setSearch({ from: "", to: "", date: "", passengers: "1" });
    setFilteredFlights(demoFlights);
  };

  const onSearchClick = () => {
    let result = demoFlights.filter((f) => {
      if (filters.stops !== null && f.stops !== filters.stops) return false;
      if (filters.airline && f.airline !== filters.airline) return false;
      if (f.price > filters.maxPrice) return false;
      if (
        search.from &&
        !f.from.toLowerCase().includes(search.from.toLowerCase())
      )
        return false;
      if (search.to && !f.to.toLowerCase().includes(search.to.toLowerCase()))
        return false;
      if (search.date) {
        const depDate = new Date(f.departure).toISOString().slice(0, 10);
        if (depDate !== search.date) return false;
      }
      return true;
    });
    setFilteredFlights(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-purple-900 font-sans">
      {/* Banner with big image */}
      <header className="relative">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Airplane flying"
          className="w-full h-72 md:h-96 object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3">
            ✈️ Find Your Next Flight
          </h1>
          <p className="text-purple-200 max-w-xl mb-8">
            Discover the best flights matching your schedule and budget.
          </p>

          {/* Search bar */}
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-5 flex flex-col md:flex-row md:items-center gap-4 max-w-5xl w-full">
            {/* From */}
            <div className="relative flex-1">
              <PlaneTakeoff className="absolute top-1/2 left-3 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="From"
                value={search.from}
                onChange={(e) =>
                  setSearch((prev) => ({ ...prev, from: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-300 focus:border-purple-600 focus:outline-none"
              />
            </div>

            {/* To */}
            <div className="relative flex-1">
              <PlaneLanding className="absolute top-1/2 left-3 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="To"
                value={search.to}
                onChange={(e) =>
                  setSearch((prev) => ({ ...prev, to: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-300 focus:border-purple-600 focus:outline-none"
              />
            </div>

            {/* Date */}
            <div className="relative flex-1">
              <Calendar className="absolute top-1/2 left-3 -translate-y-1/2 text-purple-400" />
              <input
                type="date"
                value={search.date}
                onChange={(e) =>
                  setSearch((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-300 focus:border-purple-600 focus:outline-none"
              />
            </div>

            {/* Passengers */}
            <div className="relative w-24">
              <Users className="absolute top-1/2 left-3 -translate-y-1/2 text-purple-400" />
              <input
                type="number"
                min={1}
                max={10}
                value={search.passengers}
                onChange={(e) =>
                  setSearch((prev) => ({
                    ...prev,
                    passengers: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-purple-300 focus:border-purple-600 focus:outline-none"
                title="Passengers"
              />
            </div>

            <button
              onClick={onSearchClick}
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-8 py-3 transition"
            >
              Search
            </button>
          </div>

          {/* Toggle advanced filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 inline-flex items-center gap-2 text-purple-100 hover:text-white font-semibold tracking-wide"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Advanced Filters panel */}
          {showFilters && (
            <div className="mt-6 bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-purple-900">
              {/* Stops */}
              <div>
                <label
                  htmlFor="stops"
                  className="block font-semibold mb-2 select-none"
                >
                  Stops
                </label>
                <select
                  id="stops"
                  value={filters.stops ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      stops: e.target.value === "" ? null : Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-purple-300 py-2 px-3 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Any</option>
                  <option value={0}>Non‑stop</option>
                  <option value={1}>1 Stop</option>
                  <option value={2}>2 Stops</option>
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label
                  htmlFor="maxPrice"
                  className="block font-semibold mb-2 select-none"
                >
                  Max Price: ${filters.maxPrice}
                </label>
                <input
                  id="maxPrice"
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-purple-600"
                />
              </div>

              {/* Airline */}
              <div>
                <label
                  htmlFor="airline"
                  className="block font-semibold mb-2 select-none"
                >
                  Airline
                </label>
                <select
                  id="airline"
                  value={filters.airline}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, airline: e.target.value }))
                  }
                  className="w-full rounded-md border border-purple-300 py-2 px-3 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Any</option>
                  {airlines.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Reset filters */}
              <div className="md:col-span-3 flex justify-end pt-2">
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-5 h-5" /> Reset All
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Flight results */}
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 gap-8 max-w-6xl">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-purple-700">
          {filteredFlights.length} Flight
          {filteredFlights.length !== 1 ? "s" : ""} Found
        </h2>

        {filteredFlights.length === 0 ? (
          <p className="text-center text-purple-400 italic">
            No flights match your criteria.
          </p>
        ) : (
          filteredFlights.map((f) => (
            <article
              key={f.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3 text-xl font-bold text-purple-700">
                  <PlaneTakeoff className="w-6 h-6" />
                  <span>{f.from}</span>
                  <span className="text-purple-400">→</span>
                  <span>{f.to}</span>
                  <PlaneLanding className="w-6 h-6" />
                </div>
                <div className="text-purple-600 text-sm flex flex-wrap gap-8">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(f.departure).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏳</span>
                    <span>{f.duration}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      f.stops === 0
                        ? "bg-green-100 text-green-700"
                        : f.stops === 1
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.stops === 0
                      ? "Non‑stop"
                      : `${f.stops} Stop${f.stops > 1 ? "s" : ""}`}
                  </div>
                </div>
                <div className="text-purple-700 font-medium">{f.airline}</div>
              </div>

              <div className="flex flex-col items-center justify-center gap-6 min-w-[140px]">
                <div className="text-3xl font-extrabold text-purple-700">
                  ${f.price}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {renderStars(f.rating)}
                </div>
                <button className="bg-primary px-5 py-2 rounded-lg text-white font-semibold hover:bg-primary/90 transition">
                  Book Now
                </button>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default Flights;
