'use client';

import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";
import {useEffect, useState} from "react";
import {getProducts} from "@/lib/data/data-products";
import ProductForm from "@/components/forms/product-form";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getProducts();
            if (result.ok) {
                const fetchedAdresses = result.data;
                setData(fetchedAdresses);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getProducts();
        if (result.ok) {
            const updatedAdresses = result.data;
            setData(updatedAdresses);
        }
    };

    const openEditModal = (product: never | null) => {
        setSelectedProduct(product ?? null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Catalogue de produits</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau produit</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="product"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <ProductForm
                            onSubmit={closeModal}
                            data={selectedProduct}
                            isEditMode={!!selectedProduct}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}