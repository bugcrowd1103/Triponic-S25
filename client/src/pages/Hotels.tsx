const widgetHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background: #f4f4fa;
    }
    section {
      padding: 60px 20px;
      background: #fff;
      margin: 0 auto 80px auto;
      max-width: 1440px;
      border-radius: 24px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.05);
    }
    h2 {
      font-size: 22px;
      color: #3b0764;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

  <section id="mainWidget">
    <h2>Hotel Search</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&show_hotels=true&powered_by=true&locale=en&searchUrl=search.hotellook.com&primary_override=%23FF8E01&color_button=%23FF8E01&color_icons=%23FF8E01&secondary=%23FFFFFF&dark=%23262626&light=%23FFFFFF&special=%23C4C4C4&color_focused=%23FF8E01&border_radius=5&no_labels=&plain=true&promo_id=7873&campaign_id=101" charset="utf-8"></script>
  </section>

  <section id="compactDealsWidget">
    <h2>Compact Deals</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&type=compact&host=&locale=en&limit=10&powered_by=true&nobooking=&primary=%23ff8e00&special=%23e0e0e0&promo_id=4026&campaign_id=101" charset="utf-8"></script>
  </section>

  <section id="wideSearchWidget">
    <h2>Wide Search</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&host=search.hotellook.com&locale=en&nobooking=&powered_by=true&width=940&primary=%23ff8e00&special=%23e0e0e0&promo_id=4063&campaign_id=101" charset="utf-8"></script>
  </section>

  <section id="mapWidget">
    <h2>Map View (Patong Beach)</h2>
    <script async src="https://tp.media/content?currency=usd&trs=414043&shmarker=628844&search_host=search.hotellook.com&locale=en&powered_by=true&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%2307AF61&contrast_color=%23ffffff&width=1000&height=500&lat=7.893587&lng=98.29682&zoom=14&radius=60&stars=0&rating_from=0&rating_to=10&promo_id=4285&campaign_id=101" charset="utf-8"></script>
  </section>

  <section id="aiRecommender">
    <h2>🧠 AI Hotel Recommender</h2>
    <p style="font-size: 16px; color: #555;">
      Coming soon: Smart hotel picks tailored to your preferences, location, budget, and travel style — powered by Triponic AI.
    </p>
  </section>

</body>
</html>
`;

const Hotels = () => {
  return (
    <div className="relative bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 text-white min-h-screen overflow-x-hidden">
      {/* 💎 Hero Header */}
      <div className="text-center pt-28 pb-8 px-4">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Triponic Hotel Finder
        </h1>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
          Discover the best hotel deals, map views, and soon — personalized AI picks.
        </p>
      </div>

      {/* 📦 Iframe: Widgets + AI Recommender */}
      <iframe
        title="Triponic Hotel Widgets"
        srcDoc={widgetHTML}
        className="w-full min-h-[3600px] border-none relative z-0"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default Hotels;
