import { motion } from "framer-motion";

const LeadMagnet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Lead Magnet Creator</h2>
      <p className="mb-4">
        Create compelling lead magnets to attract and convert potential
        customers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-50 p-4 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">E-book Generator</h3>
          <p className="mb-4">
            Create professional e-books with our AI-powered tool.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create E-book
          </motion.button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-50 p-4 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">Webinar Setup</h3>
          <p className="mb-4">
            Set up engaging webinars to showcase your expertise.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Schedule Webinar
          </motion.button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-50 p-4 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">Email Course Creator</h3>
          <p className="mb-4">
            Design a multi-day email course to nurture leads.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Create Email Course
          </motion.button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-50 p-4 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">Free Trial Setup</h3>
          <p className="mb-4">
            Configure a free trial of your product or service.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Set Up Free Trial
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeadMagnet;
