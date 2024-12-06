import React from "react";
import { MenuFormData } from "../../types/workerApi";
import { ImageUpload } from "../products/ImageUpload";
import api, { deleteMenuItem } from "../../types/workerApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface ProductFormProps {
  initialData?: Partial<MenuFormData>;
  storeId: number;
  onSubmit: (data: MenuFormData) => void;
}

export function ProductForm({
  initialData,
  storeId,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = React.useState<MenuFormData>({
    id: initialData?.id || 0,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    isAvailable: initialData?.isAvailable || true,
    isVegan: initialData?.isVegan || false,
    hasGluten: initialData?.hasGluten || false,
    hasLactose: initialData?.hasLactose || false,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!storeId) {
      console.error("Erro: storeId não está definido.");
      alert("Erro: storeId não está definido corretamente.");
    }
  }, [storeId]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!storeId) {
      console.error("Erro: storeId inválido.");
      alert("Erro: storeId não está definido corretamente.");
      setIsSubmitting(false);
      return;
    }
    const { id, ...productData } = formData;
    const dataWithStoreId = { ...productData, storeId };
    console.log(
      "Dados a serem enviados:",
      JSON.stringify(dataWithStoreId, null, 2)
    );
    try {
      let response;
      if (id && id !== 0) {
        response = await api.patch(`/menu-items/${id}`, dataWithStoreId);
      } else {
        response = await api.post(
          `/menu-items?storeId=${storeId}`,
          dataWithStoreId
        );
      }
      console.log("Resposta do servidor:", response);
      onSubmit(dataWithStoreId);
      setFormData({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
        isAvailable: true,
        isVegan: false,
        hasGluten: false,
        hasLactose: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Erro ao salvar produto:", error.response?.data);
        alert(`Erro: ${error.response?.data.message || "Erro desconhecido"}`);
      } else {
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const handleDelete = (id: number) => {
    deleteMenuItem(id)
      .then((response) => {
        console.log("Produto excluído com sucesso:", response);
        navigate("/home"); // Navega de volta para a home após exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir produto:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#F2E2C4] p-8 rounded-lg shadow-md"
    >
      <div className="mb-6">
        <ImageUpload
          currentImage={formData.imageUrl}
          onImageUpload={handleImageUpload}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-1">
          Nome do item:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary-light/30 border-b-2 border-primary rounded-md 
                   focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-1">
          Preço:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          className="w-full px-3 py-2 bg-primary-light/30 border-b-2 border-primary rounded-md 
                   focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-1">
          Quantidade disponível:
        </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary-light/30 border-b-2 border-primary rounded-md 
                   focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-1">
          Descrição:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 bg-primary-light/30 border-b-2 border-primary rounded-md 
                   focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-primary-dark mb-2">
          Opções:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVegan"
              checked={formData.isVegan}
              onChange={handleChange}
              className="rounded border-primary text-primary focus:ring-primary"
            />
            <span className="text-sm text-primary-dark">Vegetariano</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasGluten"
              checked={formData.hasGluten}
              onChange={handleChange}
              className="rounded border-primary text-primary focus:ring-primary"
            />
            <span className="text-sm text-primary-dark">Contém Glúten</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasLactose"
              checked={formData.hasLactose}
              onChange={handleChange}
              className="rounded border-primary text-primary focus:ring-primary"
            />
            <span className="text-sm text-primary-dark">Laticínios</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-full
                 hover:shadow-lg hover:scale-105 transform transition-all duration-200"
      >
        Add/Edit Item
      </button>
      {initialData?.id && (
        <button
          type="button"
          onClick={() => {
            if (initialData?.id) {
              handleDelete(initialData.id);
              navigate("/home");
            }
          }}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-full mt-4 hover:shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Deletar Produto
        </button>
      )}
    </form>
  );
}
