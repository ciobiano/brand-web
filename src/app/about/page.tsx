import Navigation from "@/soul/sections/nav/Navigation";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              About Kainé
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a creative agency focused on meaningful design and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with the vision to create impactful designs that resonate with audiences, 
                Kainé has been at the forefront of creative innovation.
              </p>
              <p className="text-gray-600 mb-4">
                We believe in the power of thoughtful design to transform businesses and 
                connect brands with their communities.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Creative</h3>
              <p className="text-gray-600">Innovative design solutions that capture attention and inspire action.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Strategic</h3>
              <p className="text-gray-600">Data-driven approaches that align with your business objectives.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Collaborative</h3>
              <p className="text-gray-600">Working closely with clients to bring visions to life.</p>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors mr-4"
            >
              View Projects
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
    </main>
  );
}
