import disney from "./../assets/Images/disney.png"; // use your logo or relevant image

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <img src={disney} alt="Logo" className="w-32 mb-3" />
          <p className="text-sm text-gray-400">
            Explore magical content from Disney, Pixar, Marvel, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shows</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">Originals</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#"><i className="fab fa-facebook-f"></i> Facebook</a>
            <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
            <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
