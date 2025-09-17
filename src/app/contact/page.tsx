import Navigation from "@/soul/sections/nav/Navigation";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? Let's create something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p className="text-gray-600">
                    Kainé Agency<br />
                    123 Creative Street<br />
                    Design District, DC 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-600">hello@kaine.agency</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Follow us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">Instagram</a>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</a>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
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
