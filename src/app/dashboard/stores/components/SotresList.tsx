import { FramerButton, FramerDiv } from "@/components/framer";
import { routes } from "@/config/routes";
import { IStoreResponse } from "@/types/sotre.types";
import { Edit, PlusCircle } from "lucide-react";

const SotresList = ({
  stores,
  setShowCreateStoreForm,
  onEditStore,
}: {
  stores: IStoreResponse[];
  setShowCreateStoreForm: (show: boolean) => void;
  onEditStore: (store: IStoreResponse) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stores?.map((store, index) => (
        <FramerDiv
          key={store.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <FramerButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEditStore(store)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </FramerButton>
          </div>
          <p className="text-gray-600 mb-2">
            {store.description.slice(0, 70)}
            {store.description.length > 70 ? "..." : ""}
          </p>
          <a
            href={`${routes.stores}/${store.slug}`}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit store
          </a>
        </FramerDiv>
      ))}
      <FramerButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50"
        onClick={() => setShowCreateStoreForm(true)}
      >
        <PlusCircle className="w-8 h-8 text-gray-400" />
      </FramerButton>
    </div>
  );
};

export default SotresList;
