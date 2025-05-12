
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black via-slate-900 to-slate-900 text-blue-100 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Motley UFO
              </h3>
            </div>
            <p className="text-slate-400">
              Analyzing advanced technologies through the lens of extraterrestrial possibilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                  Ancient Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                  UFO Sightings
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                  Research Database
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                  Contact Species
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 tracking-wide">Join the Invasion</h4>
            <p className="text-slate-400 mb-4">
              Subscribe to receive transmissions about alien technology.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800/50 text-slate-300 px-4 py-2 rounded-md border border-cyan-500/30 focus:outline-none focus:border-cyan-500 flex-grow"
              />
              <button className="px-4 py-2 bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition-colors duration-200">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm">
              © {currentYear} Motley UFO. All planetary rights reserved.
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer