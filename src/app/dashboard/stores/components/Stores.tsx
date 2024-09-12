"use client";
import { FramerDiv } from "@/components/framer";
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
  const { data: stores, mutate } = useGetUserStores();

  const [showCreateStoreForm, setShowCreateStoreForm] = useState(false);

  return (
    <FramerDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {stores?.meta.total === 0 && !showCreateStoreForm ? (
        <NoStore setShowCreateStoreForm={setShowCreateStoreForm} />
      ) : (
        <SotresList
          stores={stores?.data || []}
          setShowCreateStoreForm={setShowCreateStoreForm}
        />
      )}
      <AnimatePresence>
        {showCreateStoreForm && (
          <CreateStoreForm setShowCreateStoreForm={setShowCreateStoreForm} />
        )}
      </AnimatePresence>
    </FramerDiv>
  );
};

export default Stores;
