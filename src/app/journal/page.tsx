import Navigation from "@/soul/sections/nav/Navigation";

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Journal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, thoughts, and stories from our creative journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Journal Articles */}
            {[
              {
                title: "The Future of Design",
                excerpt: "Exploring emerging trends and technologies that are shaping the creative industry.",
                date: "March 15, 2024",
                category: "Design Trends"
              },
              {
                title: "Brand Identity Essentials",
                excerpt: "Key principles for creating memorable and effective brand identities.",
                date: "March 10, 2024",
                category: "Branding"
              },
              {
                title: "Creative Process Insights",
                excerpt: "Behind the scenes look at our creative process and methodology.",
                date: "March 5, 2024",
                category: "Process"
              },
              {
                title: "Digital Innovation",
                excerpt: "How technology is transforming the way we approach design challenges.",
                date: "February 28, 2024",
                category: "Technology"
              },
              {
                title: "Client Success Stories",
                excerpt: "Real stories from our clients and the impact of great design on their business.",
                date: "February 20, 2024",
                category: "Case Studies"
              },
              {
                title: "Sustainable Design",
                excerpt: "Our commitment to environmentally conscious design practices.",
                date: "February 15, 2024",
                category: "Sustainability"
              }
            ].map((article, index) => (
              <article 
                key={index}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {article.excerpt}
                  </p>
                  
                  <div className="pt-2">
                    <span className="text-purple-600 text-sm font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="space-x-4">
              <a 
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                About Us
              </a>
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
