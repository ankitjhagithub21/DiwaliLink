import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wish/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setGeneratedUrl(data.url);
        } else {
          console.error('API response indicated failure');
        }
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error making API request:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `🪔 Happy Diwali! Check out this personalized Diwali wish: ${generatedUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = "🪔 Happy Diwali Wishes!";
    const body = `Happy Diwali! I've created a personalized Diwali wish for you. Check it out: ${generatedUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaTwitter = () => {
    const message = `🪔 Happy Diwali! Check out this personalized Diwali wish: ${generatedUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
  };

  const resetForm = () => {
    setName("");
    setGeneratedUrl("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-orange-600 mb-4">
            🪔 Happy Diwali!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Create personalized Diwali wishes and share the joy of the festival of lights with your loved ones
          </p>
        </div>

        <div className="flex justify-center items-center min-h-[400px]">
          {!generatedUrl ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full">
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                Create Your Personalized Wish
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    placeholder="Your beautiful name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 text-xl border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 px-8 text-xl font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? "✨ Creating Magic..." : "🎆 Generate My Wish Link"}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                  Your Wish Link is Ready!
                </h2>
                <p className="text-gray-600">Share the festive joy with everyone</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6 border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Your personalized link:</p>
                <div className="break-all text-base font-mono text-gray-800">
                  {generatedUrl}
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  {copied ? "✅ Copied to Clipboard!" : "📋 Copy Link"}
                </button>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={shareViaWhatsApp}
                    className="py-3 px-4 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    📱 WhatsApp
                  </button>
                  <button
                    onClick={shareViaEmail}
                    className="py-3 px-4 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ✉️ Email
                  </button>
                  <button
                    onClick={shareViaTwitter}
                    className="py-3 px-4 text-sm font-medium bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    🐦 Twitter
                  </button>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => window.open(generatedUrl, '_blank')}
                    className="flex-1 py-3 px-6 text-lg font-medium border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    👀 Preview
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 py-3 px-6 text-lg font-medium bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all"
                  >
                    ✨ Create Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Spread joy, light, and happiness this Diwali season! 🌟</p>
        </div>
      </div>
    </div>
  );
}
