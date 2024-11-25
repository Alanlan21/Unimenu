import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import Header from "../components/Navbar";
import StoresCarousel from "../components/StoresCarousel";

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const mockStores = [
    { id: 1, name: "Mini Kalzone", logoUrl: "/kalzone.png", isOpen: true },
    {
      id: 2,
      name: "Top's",
      logoUrl: "https://source.unsplash.com/800x600/?cafe,food",
      isOpen: true,
    },
    { id: 3, name: "Bebelu", logoUrl: "/bebelu.png", isOpen: true },
    {
      id: 4,
      name: "Nostra Gula",
      logoUrl: "nostragula.png",
      isOpen: false,
    },
    {
      id: 5,
      name: "Casa do Pão de Queijo",
      logoUrl: "/casadopaodequeijo.png",
      isOpen: true,
    },
    {
      id: 6,
      name: "Hand full",
      logoUrl: "https://source.unsplash.com/800x600/?sandwich",
      isOpen: true,
    },
    { id: 7, name: "Go Coffee", logoUrl: "/gocofee.png", isOpen: false },
  ];

  const openStores = mockStores.filter((store) => store.isOpen);
  const closedStores = mockStores.filter((store) => !store.isOpen);

  return (
    <div className=" w-full bg-[#FFF5E6]">
      <Header />

      <main className="w-full px-4 py-8">
        <div className="bg-orange-100 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-orange-600 text-center">
            Faça seu pedido agora sem pegar filas!
          </h1>
        </div>

        <div className="w-full">
          <StoresCarousel
            stores={openStores}
            title="Estabelecimentos Abertos"
          />
          <StoresCarousel
            stores={closedStores}
            title="Estabelecimentos Fechados"
          />
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-orange-500 h-2" />

      <button className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
