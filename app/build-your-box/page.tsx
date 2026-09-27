"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BOX_OPTIONS,
  CUSTOM_FOOD_ITEMS,
  GREETING_CARDS,
  CustomBoxOption,
  CustomFoodItem,
  GreetingCardOption,
} from "@/data/customBoxItems";
import { useCart } from "@/lib/cartContext";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";
import {
  Sparkles,
  Plus,
  Minus,
  Check,
  ShoppingBag,
} from "lucide-react";

export default function BuildYourBoxPage() {
  const { addItem } = useCart();

  // Selections
  const [selectedBox, setSelectedBox] = useState<CustomBoxOption>(BOX_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState<{ item: CustomFoodItem; quantity: number }[]>([
    { item: CUSTOM_FOOD_ITEMS[0], quantity: 1 },
    { item: CUSTOM_FOOD_ITEMS[1], quantity: 1 },
  ]);
  const [selectedCard, setSelectedCard] = useState<GreetingCardOption>(GREETING_CARDS[0]);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);
  const [flyingItem, setFlyingItem] = useState<{ image: string; name: string } | null>(null);

  // Maximum items for current box
  const maxCapacity = 6;
  const currentItemCount = selectedItems.reduce((sum, i) => sum + i.quantity, 0);

  // Handle adding an item with signature realistic food fly animation
  const handleAddItem = (item: CustomFoodItem) => {
    if (currentItemCount >= maxCapacity) {
      alert(`Hộp này tối đa chứa được ${maxCapacity} món! Hãy đổi loại hộp lớn hơn nếu muốn thêm nhé.`);
      return;
    }

    // Trigger visual fly animation
    setFlyingItem({ image: item.image, name: item.name });
    setTimeout(() => setFlyingItem(null), 850);

    setSelectedItems((prev) => {
      const idx = prev.findIndex((i) => i.item.id === item.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Handle removing an item
  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const idx = prev.findIndex((i) => i.item.id === itemId);
      if (idx === -1) return prev;
      if (prev[idx].quantity > 1) {
        const updated = [...prev];
        updated[idx].quantity -= 1;
        return updated;
      }
      return prev.filter((i) => i.item.id !== itemId);
    });
  };

  // Calculate total price
  const itemsTotal = selectedItems.reduce(
    (sum, i) => sum + i.item.price * i.quantity,
    0
  );
  const grandTotal = selectedBox.price + itemsTotal;

  // Add custom box to cart
  const handleAddCustomBoxToCart = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 món ăn cho hộp quà của bạn!");
      return;
    }

    const customProduct: Product = {
      id: `custom-box-${Date.now()}`,
      slug: `custom-box-${Date.now()}`,
      name: `Box Quà Tự Tạo (${selectedBox.name})`,
      subName: `Bao gồm ${currentItemCount} món đặc sản tự chọn`,
      shortDescription: `Hộp quà tùy biến: ${selectedItems.map((i) => `${i.item.name} (x${i.quantity})`).join(", ")}.`,
      description: `Chiếc hộp quà độc bản do chính bạn tuyển chọn, gửi gắm trọn vẹn tình cảm tới ${recipient || "người nhận"}.`,
      story: "Mỗi món ăn là một hương vị được tuyển chọn riêng biệt, đóng gói chu đáo tại Vùng Quê.",
      price: grandTotal,
      region: "da-lat",
      regionName: "Việt Nam",
      category: "qua-tang",
      badge: "Box Tự Tạo",
      boxOpenAsset: selectedBox.boxOpenAsset,
      theme: {
        boxColor: selectedBox.color,
        lidColor: selectedBox.lidColor,
        ribbonColor: "#B9955A",
        accentColor: "#C97955",
        atmosphereColor: "#2F3B2C",
        bgGradient: "radial-gradient(ellipse at center, rgba(185,149,90,0.3) 0%, rgba(38,55,43,0.95) 100%)",
        textColor: "#FFFDF8",
      },
      items3D: selectedItems.map((si, idx) => ({
        id: `custom-item-${idx}`,
        name: si.item.name,
        entryDirection: "top",
        position: [(idx % 2 === 0 ? -0.4 : 0.4), 0.3, (idx > 1 ? -0.2 : 0.2)],
        rotation: [0, 0, 0],
        scale: 0.75,
        shape: si.item.shape,
        color: si.item.color,
        shortNote: si.item.shortNote,
        imageAsset: si.item.imageAsset,
      })),
      ingredients: selectedItems.map((si) => `${si.item.name} (${si.quantity} phần)`),
      weight: "1.2 kg",
      shelfLife: "3 - 6 tháng tùy từng món",
      dimensions: "28cm x 22cm x 10cm",
      stock: 99,
      rating: 5,
      reviewCount: 1,
      heroImage: selectedBox.image,
      gallery: [selectedBox.image],
    };

    addItem(
      customProduct,
      1,
      recipient || message
        ? {
            recipient: recipient || "Người thương",
            message: message || "Gửi trọn hương vị Việt tới bạn!",
            cardStyle: selectedCard.name,
          }
        : undefined,
      true
    );

    setAddedToCartSuccess(true);
    setTimeout(() => setAddedToCartSuccess(false), 2500);
  };

  return (
    <div className="pt-24 pb-20 bg-cream min-h-screen relative overflow-hidden">
      {/* Signature Animated Flying Food Item Indicator */}
      {flyingItem && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-bounce">
          <div className="flex flex-col items-center bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-gold shadow-gold text-warmWhite">
            {/* Realistic Food Image Flying */}
            <div className="relative w-24 h-24">
              <Image
                src={flyingItem.image}
                alt={flyingItem.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <span className="text-xs font-serif font-bold text-gold mt-2">
              ✦ Đang bay vào hộp: {flyingItem.name}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-900/5 text-xs font-serif uppercase tracking-widest text-forest-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Configurator Độc Quyền</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900">
            Tự tay tạo chiếc box của bạn
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-dark-muted">
            Chọn kiểu hộp, gắp từng món ăn chụp thật, chọn mẫu thiệp và gửi gắm lời nhắn riêng.
          </p>
        </div>

        {/* 2-Column Layout: Left Live Box Preview | Right Customizer Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Box Visualizer & Price Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            {/* Box Visualizer Card */}
            <div
              className="rounded-3xl p-6 sm:p-8 text-warmWhite shadow-floating border border-gold/30 flex flex-col justify-between min-h-[420px] relative overflow-hidden"
              style={{
                backgroundColor: selectedBox.color,
                boxShadow: "0 20px 40px -10px rgba(38, 55, 43, 0.4)",
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif uppercase tracking-widest text-gold font-bold">
                    HỘP BẠN ĐANG TẠO
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20">
                    {currentItemCount}/{maxCapacity} món
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold mt-2">
                  {selectedBox.name}
                </h3>
                <p className="text-xs text-warmWhite/70 mt-1">
                  Chất liệu: {selectedBox.material}
                </p>
              </div>

              {/* Realistic Box Stage with Food Images Inside */}
              <div className="my-5 p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-gold font-bold block mb-2">
                  Bên trong chiếc hộp:
                </span>
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-warmWhite/50 italic py-6 text-center">
                    Chưa có món nào. Bấm dấu (+) ở danh sách bên phải để gắp món vào nhé!
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {selectedItems.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 border border-white/10 relative group hover:scale-105 transition-transform"
                      >
                        {/* Real transparent food asset */}
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain drop-shadow-md"
                          />
                        </div>
                        <span className="text-[10px] text-warmWhite font-medium text-center line-clamp-1 mt-1">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-bold text-gold">x{quantity}</span>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Bớt món"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card & Recipient preview */}
              {recipient && (
                <div className="text-xs text-warmWhite/80 bg-white/10 p-2.5 rounded-xl border border-white/10 mb-4">
                  💌 Gửi: <span className="font-bold text-warmWhite">{recipient}</span>
                  {message && <p className="italic text-[11px] text-gold mt-0.5 line-clamp-1">&ldquo;{message}&rdquo;</p>}
                </div>
              )}

              {/* Price Calculation and Add to Cart Button */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-warmWhite/60 block">Tổng tiền chiếc box</span>
                  <span className="text-2xl font-serif font-bold text-gold">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handleAddCustomBoxToCart}
                  className="px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-400 text-forest-900 font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center space-x-2 active:scale-95"
                >
                  {addedToCartSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-forest-900" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-forest-900" />
                      <span>Thêm Box Vào Giỏ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Steps to customize */}
          <div className="lg:col-span-7 space-y-8">
            {/* STEP 1: CHỌN MẪU HỘP */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-forest-900 text-gold flex items-center justify-center font-serif font-bold text-sm">
                  1
                </span>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900">
                    Chọn chất liệu và mẫu hộp
                  </h3>
                  <p className="text-xs text-dark-muted">
                    Mỗi chất liệu mang một vẻ đẹp và cá tính riêng biệt.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {BOX_OPTIONS.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-gold bg-cream-50 shadow-md"
                          : "border-forest-900/10 hover:border-forest-900/30 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="w-4 h-4 rounded-full border border-forest-900/20"
                            style={{ backgroundColor: box.color }}
                          />
                          {isSelected && (
                            <span className="text-[10px] font-bold text-gold bg-forest-900 px-2 py-0.5 rounded-full">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-forest-900">
                          {box.name}
                        </h4>
                        <p className="text-[11px] text-dark-muted mt-1 leading-snug">
                          {box.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-forest-900/5 flex items-center justify-between text-xs">
                        <span className="font-bold text-terracotta">
                          {formatCurrency(box.price)}
                        </span>
                        <span className="text-[10px] text-dark-muted">{box.capacity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: CHỌN MÓN ĐẶC SẢN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-forest-900 text-gold flex items-center justify-center font-serif font-bold text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900">
                    Gắp món đặc sản vào hộp ({currentItemCount}/{maxCapacity})
                  </h3>
                  <p className="text-xs text-dark-muted">
                    Bấm (+) để xem món ăn bay vào hộp, hoặc (-) để bớt món.
                  </p>
                </div>
              </div>

              {/* Items Grid with Realistic Food Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {CUSTOM_FOOD_ITEMS.map((item) => {
                  const inBox = selectedItems.find((i) => i.item.id === item.id);
                  const qty = inBox?.quantity || 0;

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        qty > 0
                          ? "border-gold/60 bg-cream-100 shadow-sm"
                          : "border-forest-900/10 hover:border-forest-900/20 bg-white"
                      }`}
                    >
                      {/* Realistic transparent Food Image Thumbnail */}
                      <div className="w-14 h-14 rounded-xl bg-white/70 border border-forest-900/5 flex items-center justify-center p-1 mr-3 flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="object-contain drop-shadow-sm"
                        />
                      </div>

                      <div className="flex-1 mr-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] font-bold text-dark-muted uppercase">
                            {item.region}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-forest-900 line-clamp-1 mt-0.5">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-terracotta block mt-0.5">
                          {formatCurrency(item.price)}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-1.5 flex-shrink-0">
                        {qty > 0 && (
                          <>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="w-7 h-7 rounded-lg border border-forest-900/20 bg-white flex items-center justify-center text-dark-muted hover:text-dark"
                              aria-label={`Bớt ${item.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-xs w-4 text-center">
                              {qty}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => handleAddItem(item)}
                          className="w-7 h-7 rounded-lg bg-forest-900 text-warmWhite hover:bg-forest-800 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                          aria-label={`Thêm ${item.name}`}
                        >
                          <Plus className="w-3.5 h-3.5 text-gold" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: CHỌN THIỆP & LỜI NHẮN */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-forest-900/10 shadow-subtle space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-forest-900 text-gold flex items-center justify-center font-serif font-bold text-sm">
                  3
                </span>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900">
                    Chọn thiệp viết tay & lời chúc
                  </h3>
                  <p className="text-xs text-dark-muted">
                    Vùng Quê miễn phí nắn nót viết tay từng tấm thiệp gửi kèm món quà.
                  </p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {GREETING_CARDS.map((card) => {
                  const isSelected = selectedCard.id === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center flex flex-col justify-between ${
                        isSelected
                          ? "border-gold bg-cream-100 shadow-sm"
                          : "border-forest-900/10 hover:border-forest-900/30 bg-white"
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded-lg mb-2 flex items-center justify-center text-xs font-serif"
                        style={{ backgroundColor: card.color, color: card.textColor }}
                      >
                        Thiệp Quà
                      </div>
                      <span className="text-[11px] font-bold text-forest-900 block line-clamp-1">
                        {card.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Recipient & Message Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Tên người nhận (được in trên phong bì thiệp):
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Chị Lan Anh, Mẹ yêu, Anh Tuấn..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white text-dark focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Lời nhắn gửi trao (tối đa 250 ký tự):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Chúc mẹ luôn an yên, nhiều sức khỏe và mãi tươi vui bên con cháu..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={250}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-forest-900/20 bg-white text-dark focus:outline-none focus:border-gold"
                  />
                  <span className="text-[10px] text-dark-muted text-right block mt-1">
                    {message.length}/250 ký tự
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
