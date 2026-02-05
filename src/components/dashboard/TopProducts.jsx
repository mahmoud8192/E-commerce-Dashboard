import { formatCurrency } from "../../utils/formatters";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Top Products Component
 */
const TopProducts = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-card">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.sales} sales</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(product.revenue)}
                </p>
                <div className="flex items-center justify-end gap-1">
                  {product.trend === "up" ? (
                    <TrendingUp size={14} className="text-green-500" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
