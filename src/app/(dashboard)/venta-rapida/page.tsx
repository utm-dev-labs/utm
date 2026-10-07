"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Minus, Plus, Trash2, CreditCard, Banknote, ArrowRightLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "Docena rosas", price: 350, emoji: "🌹" },
  { id: 2, name: "Ramo mixto", price: 280, emoji: "💐" },
  { id: 3, name: "Arreglo frutal", price: 450, emoji: "🍓" },
  { id: 4, name: "Centro de mesa", price: 500, emoji: "🏵️" },
  { id: 5, name: "Bouquet tulipanes", price: 320, emoji: "🌷" },
  { id: 6, name: "Corona fúnebre", price: 600, emoji: "🕊️" },
];

const paymentMethods = [
  { id: "efectivo", label: "Efectivo", icon: Banknote },
  { id: "transferencia", label: "Transferencia", icon: ArrowRightLeft },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard },
];

const VentaRapidaPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCobrar = () => {
    if (cart.length === 0) return;
    alert(
      `Venta cobrada: $${total.toLocaleString("es-MX")} — Método: ${paymentMethod}`
    );
    setCart([]);
  };

  return (
    <div className="flex flex-col h-full gap-6 p-6" style={{ backgroundColor: "#FAFAF8" }}>
      {/* Barra de búsqueda */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={18}
          style={{ color: "#78716C" }}
        />
        <Input
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          style={{ borderColor: "#D4A373" }}
        />
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Columna izquierda — Productos */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer transition-all hover:shadow-md active:scale-[0.98]"
                style={{ borderColor: "#D4A373" }}
                onClick={() => addToCart(product)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                  <span className="text-4xl">{product.emoji}</span>
                  <span
                    className="font-medium text-center text-sm"
                    style={{ color: "#1C1917" }}
                  >
                    {product.name}
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#2D6A4F" }}
                  >
                    ${product.price}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Columna derecha — Carrito */}
        <div
          className="w-[380px] flex flex-col rounded-xl border p-4 gap-4"
          style={{
            borderColor: "#D4A373",
            backgroundColor: "#FFFFFF",
          }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: "#1C1917" }}
          >
            Carrito
          </h2>
          <Separator style={{ backgroundColor: "#D4A373" }} />

          {/* Items */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.length === 0 && (
              <p
                className="text-sm text-center py-8"
                style={{ color: "#78716C" }}
              >
                Agrega productos para comenzar
              </p>
            )}
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "#1C1917" }}
                  >
                    {item.product.emoji} {item.product.name}
                  </p>
                  <p className="text-xs" style={{ color: "#78716C" }}>
                    ${item.product.price} c/u
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, -1)}
                  >
                    <Minus size={14} />
                  </Button>
                  <span
                    className="w-8 text-center text-sm font-medium"
                    style={{ color: "#1C1917" }}
                  >
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.product.id, 1)}
                  >
                    <Plus size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <span
                  className="text-sm font-semibold w-16 text-right"
                  style={{ color: "#2D6A4F" }}
                >
                  ${(item.product.price * item.quantity).toLocaleString("es-MX")}
                </span>
              </div>
            ))}
          </div>

          <Separator style={{ backgroundColor: "#D4A373" }} />

          {/* Método de pago */}
          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: "#78716C" }}>
              Método de pago
            </p>
            <div className="flex gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isActive = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className="flex-1 flex flex-col items-center gap-1 rounded-lg border p-2 text-xs font-medium transition-colors"
                    style={{
                      borderColor: isActive ? "#2D6A4F" : "#D4A373",
                      backgroundColor: isActive ? "#2D6A4F" : "transparent",
                      color: isActive ? "#FFFFFF" : "#1C1917",
                    }}
                  >
                    <Icon size={16} />
                    {method.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total y botón Cobrar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span
                className="text-sm font-medium"
                style={{ color: "#78716C" }}
              >
                Total
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: "#2D6A4F" }}
              >
                ${total.toLocaleString("es-MX")}
              </span>
            </div>
            <Button
              className="w-full h-12 text-base font-semibold text-white"
              style={{ backgroundColor: "#2D6A4F" }}
              disabled={cart.length === 0}
              onClick={handleCobrar}
            >
              Cobrar ${total.toLocaleString("es-MX")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentaRapidaPage;
