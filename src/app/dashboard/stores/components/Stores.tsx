"use client";
import { FramerDiv } from "@/components/framer";
import { IStoreResponse } from "@/types/store.types";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useGetUserStores } from "../../../../hooks/useStores";
import NoStore from "./NoStore";
import SotresList from "./SotresList";

const CreateStoreForm = dynamic(() => import("./CreateStoreForm/Form"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const Stores = () => {
  const { data: stores } = useGetUserStores();
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [editingStore, setEditingStore] = useState<IStoreResponse | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleEditStore = (store: IStoreResponse) => {
    setEditingStore(store);
    setShowStoreForm(true);
    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCreateStore = () => {
    setEditingStore(null);
    setShowStoreForm(true);
    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCloseForm = () => {
    setShowStoreForm(false);
    setEditingStore(null);
  };

  return (
    <FramerDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {stores?.meta.total === 0 && !showStoreForm ? (
        <NoStore setShowCreateStoreForm={handleCreateStore} />
      ) : (
        <SotresList
          stores={stores?.data || []}
          setShowCreateStoreForm={handleCreateStore}
          onEditStore={handleEditStore}
        />
      )}
      <AnimatePresence>
        {showStoreForm && (
          <CreateStoreForm
            key={formKey}
            setShowCreateStoreForm={handleCloseForm}
            editingStore={editingStore}
          />
        )}
      </AnimatePresence>
    </FramerDiv>
  );
};

export default Stores;
