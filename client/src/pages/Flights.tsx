import React from 'react';
import { motion } from 'framer-motion';

const widgetHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: #f4f4fa;
      font-family: 'Inter', sans-serif;
    }
    section {
      padding: 60px 24px;
      margin: 48px auto;
      background: #ffffff;
      max-width: 1140px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    h2 {
      font-size: 24px;
      margin-bottom: 24px;
      color: #111827;
      font-weight: 600;
      text-align: center;
    }
  </style>
</head>
<body>

  <section>
    <h2>🧳 Smart Fare Deals</h2>
    <script async src="https://tp.media/content?trs=414043&shmarker=628844&locale=en_us&Checkbox_9=false&powered_by=true&primary=%230C131D&dark=%230C131D&light=%23FFFFFF&secondary=%23F1EDFC&promo_id=7293&campaign_id=200" charset="utf-8"></script>
  </section>

  <section>
    <h2>✨ Featured Deal: London → Bangkok</h2>
    <script async src="https://tp.media/content?trs=414043&shmarker=628844&locale=en&powered_by=true&origin=LON&destination=BKK&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=7281&campaign_id=200" charset="utf-8"></script>
  </section>

  <section>
    <h2>🗺 Explore Route Map</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&lat=&lng=&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%23FFFFFF&light=%23FFFFFF&width=1140&height=500&zoom=2&promo_id=4054&campaign_id=100" charset="utf-8"></script>
  </section>

  <section>
    <h2>📈 Best Time to Fly</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&locale=en_us&powered_by=true&one_way=false&only_direct=false&period=year&range=7%2C14&primary=%23B9A0FD&color_background=%23ffffff&dark=%23000000&light=%23FFFFFF&achieve=%23BAA2FB&promo_id=7264&campaign_id=200" charset="utf-8"></script>
  </section>

  <section>
    <h2>🎒 Popular Local Tours</h2>
    <script async src="https://c150.travelpayouts.com/content?trs=414043&shmarker=628844&locale=en&tours=12&powered_by=true&promo_id=4489" charset="utf-8"></script>
  </section>

</body>
</html>`;

const Flights = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 min-h-screen text-white">
      <header className="text-center pt-28 pb-10 px-4">
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Triponic Flight Explorer
        </motion.h1>
        <motion.p
          className="text-lg text-indigo-100 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover curated flight deals, global routes, and the best time to travel — all in one scroll ✈️
        </motion.p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <iframe
          title="Triponic Flight Deals"
          srcDoc={widgetHTML}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          className="w-full rounded-3xl border-0 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          style={{
            background: '#f4f4fa',
            minHeight: '3000px',
            transition: 'all 0.3s ease-in-out'
          }}
        />
      </main>

      <div className="fixed bottom-6 right-6">
        <a
          href="https://triponic.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          🚀 Get Early Access to Triponic
        </a>
      </div>
    </div>
  );
};

export default Flights;
