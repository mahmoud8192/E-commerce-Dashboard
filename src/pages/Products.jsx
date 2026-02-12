import { useEffect, useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import SearchInput from "../components/common/SearchInput";
import Select from "../components/common/Select";
import Pagination from "../components/common/Pagination";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { useDebounce } from "../hooks/useDebounce";
import { formatCurrency } from "../utils/formatters";
import { Plus, Edit, Trash2, Package } from "lucide-react";

/**
 * Products Page Component
 */
const Products = () => {
  const {
    products,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  } = useDashboard();

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
    stock: "",
    description: "",
    image: ""
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter and pagination
  const { filteredData, filters, updateFilter } = useFilter(products, {
    category: "all",
    search: ""
  });

  const {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPreviousPage
  } = usePagination(filteredData, 12);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    updateFilter("search", debouncedSearch);
  }, [debouncedSearch]);

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Accessories", label: "Accessories" },
    { value: "Home", label: "Home" },
    { value: "Sports", label: "Sports" }
  ];

  const getStatusVariant = (status) => {
    const variants = {
      active: "success",
      "low-stock": "warning",
      "out-of-stock": "danger"
    };
    return variants[status] || "default";
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost.toString(),
        stock: product.stock.toString(),
        description: product.description,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        sku: "",
        category: "Electronics",
        price: "",
        cost: "",
        stock: "",
        description: "",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      sku: "",
      category: "",
      price: "",
      cost: "",
      stock: "",
      description: "",
      image: ""
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.sku.trim()) errors.sku = "SKU is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      errors.price = "Valid price is required";
    if (!formData.cost || parseFloat(formData.cost) <= 0)
      errors.cost = "Valid cost is required";
    if (!formData.stock || parseInt(formData.stock) < 0)
      errors.stock = "Valid stock is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const productData = {
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      stock: parseInt(formData.stock),
      description: formData.description,
      image: formData.image,
      status:
        parseInt(formData.stock) === 0
          ? "out-of-stock"
          : parseInt(formData.stock) < 50
            ? "low-stock"
            : "active"
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await createProduct(productData);
    }

    handleCloseModal();
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => handleOpenModal()}
        >
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search by name or SKU..."
            />
          </div>

          <Select
            options={categoryOptions}
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            placeholder="Filter by category"
          />
        </div>
      </Card>

      {/* Products Grid */}
      <div>
        {currentData.length === 0 ? (
          <Card>
            <EmptyState
              icon={<Package size={48} />}
              title="No products found"
              message="No products match your current filters. Try adjusting your search criteria."
              action={
                <Button onClick={() => handleOpenModal()}>
                  Add First Product
                </Button>
              }
            />
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentData.map((product) => (
                <Card
                  key={product.id}
                  padding={false}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={getStatusVariant(product.status)}
                        size="sm"
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{product.sku}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>
                      <Badge variant="default" size="sm">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<Edit size={14} />}
                        onClick={() => handleOpenModal(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Card className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            </Card>
          </>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              placeholder="Wireless Headphones"
              required
            />

            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              error={formErrors.sku}
              placeholder="WHP-001"
              required
            />
          </div>

          <Select
            label="Category"
            name="category"
            options={categoryOptions.filter((opt) => opt.value !== "all")}
            value={formData.category}
            onChange={handleChange}
            error={formErrors.category}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              error={formErrors.price}
              placeholder="99.99"
              required
            />

            <Input
              label="Cost"
              name="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              error={formErrors.cost}
              placeholder="45.00"
              required
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              error={formErrors.stock}
              placeholder="100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2"
              placeholder="Product description..."
            />
          </div>

          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </form>
      </Modal>
    </div>
  );
};

export default Products;
