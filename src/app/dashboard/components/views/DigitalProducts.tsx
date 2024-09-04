import { motion } from "framer-motion";

const DigitalProducts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Digital Products</h2>
      <p className="mb-4">Manage your digital products here.</p>
      {/* Add content for managing digital products */}
    </motion.div>
  );
};

export default DigitalProducts;
