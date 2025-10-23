import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, Gift, Recycle } from "lucide-react";

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showVideos, setShowVideos] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setShowVideos(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here (e.g., Firebase Auth)
    alert("Login successful (demo)");
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-green-700">EcoSaver</h1>
        <div className="space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Rewards</Button>
          <Button onClick={handleGetStarted} variant="default" className="bg-green-600 text-white hover:bg-green-700">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Login Section */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] md:w-[400px] text-center relative">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Sign In to EcoSaver</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" required className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-green-600" />
              <input type="password" placeholder="Password" required className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-green-600" />
              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 mb-3">Login</Button>
            </form>
            <p className="text-sm text-gray-600">Don't have an account? <span className="text-green-600 cursor-pointer">Sign Up</span></p>
            <Button onClick={() => setShowLogin(false)} variant="ghost" className="absolute top-2 right-2 text-gray-500">✕</Button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold text-green-700 leading-tight mb-4">
            Scan. Learn. Recycle. Earn Rewards.
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Scan any recyclable item and discover how to dispose, reuse, or recreate it into something beautiful. Earn rewards and vouchers for your eco-creations!
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <label className="inline-block cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2">
                <Camera className="w-5 h-5" /> Scan Item
              </Button>
            </label>
            <Button size="lg" onClick={handleGetStarted} className="bg-green-500 text-white hover:bg-green-600">
              Get Started
            </Button>
          </div>
        </motion.div>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
          alt="Recycle Illustration"
          className="w-80 mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Upload Preview & Video Section */}
      {uploadedImage && (
        <section className="bg-white py-12 px-8 text-center shadow-inner">
          <h3 className="text-3xl font-bold text-green-700 mb-6">Your Uploaded Item</h3>
          <img
            src={uploadedImage}
            alt="Uploaded Recyclable"
            className="mx-auto w-60 h-60 object-cover rounded-xl shadow-md mb-8"
          />
          {showVideos && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[1, 2, 3].map((num) => (
                <Card key={num} className="overflow-hidden hover:shadow-lg transition">
                  <CardContent className="p-0">
                    <video controls className="w-full h-48 object-cover">
                      <source src={`https://samplelib.com/lib/preview/mp4/sample-5s.mp4`} type="video/mp4" />
                    </video>
                    <div className="p-4">
                      <h4 className="font-semibold text-green-700 mb-1">Recycling Tip {num}</h4>
                      <p className="text-sm text-gray-600">Learn how to reuse or recycle this item effectively.</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 px-10 bg-white">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
            icon: <Camera className="w-12 h-12 text-green-600" />, title: "Scan Item", desc: "Scan any recyclable item to get details and recycling ideas."
          }, {
            icon: <Recycle className="w-12 h-12 text-green-600" />, title: "Watch & Learn", desc: "Get personalized videos showing how to recycle or upcycle it."
          }, {
            icon: <Upload className="w-12 h-12 text-green-600" />, title: "Upload & Earn", desc: "Share your recycled creation and earn points or vouchers."
          }].map((step, i) => (
            <Card key={i} className="p-6 text-center shadow-md hover:shadow-lg transition">
              <CardContent>
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-green-700">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 px-10 bg-green-50 text-center">
        <h3 className="text-3xl font-bold text-green-700 mb-6">Earn Exciting Rewards</h3>
        <p className="max-w-2xl mx-auto text-gray-700 mb-10">
          Every eco-action counts! Upload your recycled creations and earn points, vouchers, and exclusive rewards from our partner companies.
        </p>
        <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 mx-auto">
          <Gift className="w-5 h-5" /> View Rewards
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} EcoSaver. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
