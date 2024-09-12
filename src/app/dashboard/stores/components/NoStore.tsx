import { FramerButton, FramerDiv } from "@/components/framer";

const NoStore = ({
  setShowCreateStoreForm,
}: {
  setShowCreateStoreForm: (show: boolean) => void;
}) => {
  return (
    <FramerDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-xl mb-4">You don&apos;t have a store yet</p>
      <FramerButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => setShowCreateStoreForm(true)}
      >
        Create your store
      </FramerButton>
    </FramerDiv>
  );
};

export default NoStore;
