import { FramerButton, FramerDiv } from "@/components/framer";
import { Lock, Mail, Video, Zap } from "lucide-react";

const Upgrade = () => {
  return (
    <FramerDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white"
    >
      <h2 className="text-3xl font-bold mb-6">Upgrade to Pro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <FramerDiv
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
        >
          <Zap className="w-12 h-12 mb-4 text-yellow-300" />
          <h3 className="text-xl font-semibold mb-2">AI Marketing</h3>
          <p>
            Leverage cutting-edge AI to optimize your marketing strategies and
            boost conversions.
          </p>
        </FramerDiv>
        <FramerDiv
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
        >
          <Mail className="w-12 h-12 mb-4 text-green-300" />
          <h3 className="text-xl font-semibold mb-2">Email Marketing</h3>
          <p>
            Create targeted email campaigns to engage your audience and drive
            sales.
          </p>
        </FramerDiv>
        <FramerDiv
          whileHover={{ scale: 1.05 }}
          className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
        >
          <Video className="w-12 h-12 mb-4 text-red-300" />
          <h3 className="text-xl font-semibold mb-2">Promotional Videos</h3>
          <p>
            Generate professional videos to showcase your products and captivate
            customers.
          </p>
        </FramerDiv>
      </div>

      <FramerDiv
        whileHover={{ scale: 1.02 }}
        className="bg-white bg-opacity-10 rounded-lg p-6 mb-4"
      >
        <h3 className="text-2xl font-semibold mb-4">
          Premium eBook Bundle 📚💰
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li>5 bestselling marketing eBooks 📈</li>
          <li>3 exclusive video courses 🎥</li>
          <li>1-year access to our pro webinar series 🌟</li>
          <li>Personal consultation with a marketing expert 🤝</li>
        </ul>
        <p className="text-lg font-semibold">
          Total value: $999 - Your price: $499 🔥
        </p>
      </FramerDiv>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Choose your payment method
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FramerButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-300"
          >
            Credit Card
          </FramerButton>
          <FramerButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors duration-300"
          >
            PayPal
          </FramerButton>
        </div>
      </div>

      <div className="text-center">
        <FramerButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center mx-auto"
        >
          <Lock className="w-6 h-6 mr-2" />
          Unlock AI Marketing and Automation Engine
        </FramerButton>
      </div>
    </FramerDiv>
  );
};

export default Upgrade;
