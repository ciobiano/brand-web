import Navigation from "@/soul/sections/nav/Navigation";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest work and creative solutions for brands around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Cards */}
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div 
                key={project}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 group-hover:scale-105 transition-transform duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                <p className="text-gray-600">Brand Identity & Web Design</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
