"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Filter,
  Star,
  ChevronDown,
  ChevronUp,
  Search,
  ShoppingBasket,
  Apple,
  Milk,
  CupSoda,
  Cookie,
  Shirt,
  Sparkles,
  Smartphone,
  Home,
  Wine,
  MoreHorizontal,
  LayoutGrid,
  ArrowLeft,
  AlignJustify,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const categoryIcons: Record<string, React.ElementType> = {
  ShoppingBasket,
  Apple,
  Milk,
  CupSoda,
  Cookie,
  Shirt,
  Sparkles,
  Smartphone,
  Home,
  Wine,
  MoreHorizontal,
};

export default function ShopPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const prices = PRODUCTS.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  });

  const [modelOpen, setModelOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(true);
  const [gradeOpen, setGradeOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [openCategoryGroups, setOpenCategoryGroups] = useState<string[]>([
    "Food & Grocery",
    "Beverages & Liquor",
    "Beauty & Fashion",
    "Home & Electronics"
  ]);

  const sortOptions = [
    { value: "popular", label: "Popularity" },
    { value: "rating", label: "Relevance" },
    { value: "price-low", label: "Price Low to High" },
    { value: "price-high", label: "Price High to Low" },
    { value: "newest", label: "Newest First" },
  ];

  const sortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Sort by";

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const gradeCounts = useMemo(() => {
    return [4, 3, 2, 1].map((grade) => ({
      grade,
      count: PRODUCTS.filter((p) => p.rating >= grade).length,
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (activeCategory && product.category !== activeCategory) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.category)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (selectedGrades.length > 0) {
        const minGrade = Math.min(...selectedGrades);
        if (product.rating < minGrade) return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    return result;
  }, [selectedTypes, selectedGrades, selectedBrands, sortBy, searchQuery, activeCategory, priceRange]);

  const priceFilterActive = priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max;
  const activeFiltersCount =
    selectedTypes.length + selectedGrades.length + selectedBrands.length + (priceFilterActive ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedGrades([]);
    setSelectedBrands([]);
    setActiveCategory(null);
    setPriceRange([priceBounds.min, priceBounds.max]);
  };

  const removeFilter = (type: "type" | "grade" | "brand", value: string | number) => {
    if (type === "type") setSelectedTypes((prev) => prev.filter((t) => t !== value));
    if (type === "grade") setSelectedGrades((prev) => prev.filter((g) => g !== value));
    if (type === "brand") setSelectedBrands((prev) => prev.filter((b) => b !== value));
  };

  const toggleArrayItem = <T,>(arr: T[], value: T, setter: (v: T[]) => void) => {
    if (arr.includes(value)) setter(arr.filter((item) => item !== value));
    else setter([...arr, value]);
  };

  const renderCategoryFilter = () => (
    <div className="mb-6">
      <h3 className="font-bold text-gray-900 text-[18px] mb-4">Categories</h3>
      <div className="border border-[#eaeff5] rounded-[16px] p-5 bg-[#fcfdfe]">
        {[
          {
            title: "Food & Grocery",
            items: ["Grocery", "Fruits & Veg", "Dairy & Eggs", "Snacks"]
          },
          {
            title: "Beverages & Liquor",
            items: ["Beverages", "Liquor"]
          },
          {
            title: "Beauty & Fashion",
            items: ["Beauty", "Fashion"]
          },
          {
            title: "Home & Electronics",
            items: ["Home Care", "Electronics", "More"]
          }
        ].map((cat, index) => {
          const isOpen = openCategoryGroups.includes(cat.title);
          return (
            <div key={cat.title} className={index !== 3 ? "mb-5" : ""}>
              <button
                type="button"
                onClick={() => toggleArrayItem(openCategoryGroups, cat.title, setOpenCategoryGroups)}
                className="flex items-center justify-between font-bold text-[#0a1128] text-[14px] mb-3 text-left w-full hover:text-primary transition-colors"
              >
                <span>{cat.title}</span>

              </button>
              {cat.items.length > 0 && isOpen && (
                <div className="border-l border-[#d3dae3] ml-[6px] py-1 space-y-[14px]">
                  {cat.items.map((item) => {
                    const isActive = selectedTypes.includes(item);
                    return (
                      <div key={item} className="relative pl-5 flex items-center">
                        {isActive && (
                          <div className="absolute -left-[1px] top-[-2px] bottom-[-2px] w-[2.5px] bg-primary rounded-full" />
                        )}
                        <button
                          type="button"
                          onClick={() => toggleArrayItem(selectedTypes, item, setSelectedTypes)}
                          className={`block text-[13.5px] transition-colors text-left w-full ${isActive ? 'text-primary font-bold' : 'text-[#5e6a7e] hover:text-[#0a1128]'}`}
                        >
                          {item}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="w-full pr-4 text-sm scroll">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-gray-900 text-sm">Filter by:</span>
          {activeFiltersCount > 0 && (
            <button onClick={clearAllFilters} className="text-primary font-medium text-xs hover:underline">
              Clear All
            </button>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <div key={`type-${type}`} className="flex items-center gap-1.5 bg-gray-100 text-gray-800 text-[11px] px-3 py-1.5 rounded-full font-bold">
                {type}
                <button onClick={() => removeFilter("type", type)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            ))}
            {selectedGrades.map((grade) => (
              <div key={`grade-${grade}`} className="flex items-center gap-1.5 bg-gray-100 text-gray-800 text-[11px] px-3 py-1.5 rounded-full font-bold">
                {grade} & up
                <button onClick={() => removeFilter("grade", grade)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            ))}
            {priceFilterActive && (
              <div className="flex items-center gap-1.5 bg-gray-100 text-gray-800 text-[11px] px-3 py-1.5 rounded-full font-bold">
                ₹{priceRange[0]} – ₹{priceRange[1]}
                <button onClick={() => setPriceRange([priceBounds.min, priceBounds.max])} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* ── Categories ── */}
      {renderCategoryFilter()}

      <div className="border-t border-gray-200 my-4" />

      {/* ── Grade ── */}
      <div className="mb-4">
        <span className="font-bold text-gray-900 text-[13px]">Grade</span>
        <div className="mt-1">
          {gradeCounts.map(({ grade, count }) => {
            const isActive = selectedGrades.includes(grade);
            return (
              <button
                key={grade}
                onClick={() => toggleArrayItem(selectedGrades, grade, setSelectedGrades)}
                className="flex items-center justify-between w-full py-2 px-1 rounded-md transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < grade ? "fill-current" : "text-gray-300 fill-gray-300"}`} />
                    ))}
                  </div>
                  <span className={`text-[13px] ${isActive ? "text-gray-900 font-semibold" : "text-gray-600"}`}>{grade} & up</span>
                </div>
                <span className={`text-[13px] tabular-nums ${isActive ? "text-gray-900 font-semibold" : "text-gray-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* ── Price Range ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between py-2 mb-4">
          <span className="font-bold text-gray-900 text-[13px]">Price Range</span>
          {priceFilterActive && (
            <button
              onClick={() => setPriceRange([priceBounds.min, priceBounds.max])}
              className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="px-2">
          {/* Dual-thumb slider */}
          <div className="relative h-5 flex items-center mb-4">
            {/* Background track */}
            <div className="absolute inset-x-0 h-[3px] bg-gray-200 rounded-full pointer-events-none" />
            {/* Active fill between thumbs */}
            <div
              className="absolute h-[3px] bg-primary rounded-full pointer-events-none"
              style={{
                left: `${((priceRange[0] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                right: `${100 - ((priceRange[1] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
              }}
            />
            {/* Visual thumb for min */}
            <div
              className="absolute w-4 h-4 rounded-full bg-primary border-2 border-white shadow pointer-events-none"
              style={{
                left: `calc(${((priceRange[0] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}% - 8px)`,
                zIndex: 2,
              }}
            />
            {/* Visual thumb for max */}
            <div
              className="absolute w-4 h-4 rounded-full bg-primary border-2 border-white shadow pointer-events-none"
              style={{
                left: `calc(${((priceRange[1] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}% - 8px)`,
                zIndex: 2,
              }}
            />
            {/* Min range input (lower z-index, only active when near left) */}
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={1}
              value={priceRange[0]}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                setPriceRange([val, priceRange[1]]);
              }}
              className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: priceRange[0] > priceBounds.max - 10 ? 5 : 3 }}
              aria-label="Minimum price"
            />
            {/* Max range input (higher z-index by default) */}
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={1}
              value={priceRange[1]}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                setPriceRange([priceRange[0], val]);
              }}
              className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: 4 }}
              aria-label="Maximum price"
            />
          </div>

          {/* Min / Max value boxes */}
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center bg-gray-50">
              <span className="text-[10px] text-gray-400 block mb-0.5">Min</span>
              <span className="text-xs font-bold text-gray-900">₹{priceRange[0]}</span>
            </div>
            <span className="text-gray-300 text-sm">—</span>
            <div className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center bg-gray-50">
              <span className="text-[10px] text-gray-400 block mb-0.5">Max</span>
              <span className="text-xs font-bold text-gray-900">₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="bg-background min-h-screen pb-12 overflow-x-hidden">
      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden px-5 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Product List</h1>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-gray-100 px-3 py-1.5 rounded-full"
          >
            <Filter className="w-4 h-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>



        {/* Sort / Filter bar */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between gap-2 p-2 pl-4 bg-primary/5 rounded-2xl">
            <button
              type="button"
              onClick={() => setSortMenuOpen((v) => !v)}
              className="flex items-center gap-1 text-[13px] text-gray-500"
            >
              Sorted by <span className="font-bold text-gray-900 ml-1">{sortLabel}</span>
            </button>

            <div className="flex items-center bg-white rounded-full p-1 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sort panel — slides in from top */}
          {sortMenuOpen && (
            <>
              {/* Backdrop */}
              <button
                type="button"
                className="fixed inset-0 z-40 bg-black/20 "
                aria-label="Close sort menu"
                onClick={() => setSortMenuOpen(false)}
              />
              {/* Panel */}
              <div className="fixed left-0 right-0 top-0 z-50 bg-white rounded-b-3xl overflow-hidden shadow-xl animate-in slide-in-from-top duration-200">
                {/* Headline row */}
                <div className="flex items-center px-4 py-4 pt-5">
                  <button type="button" onClick={() => setSortMenuOpen(false)} className="p-1 hover:bg-muted rounded-full">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <h1 className="flex-1 text-center font-bold text-[17px] text-foreground pr-6">
                    Feature Product
                  </h1>

                </div>

                {/* Sort bar header row */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                  <button
                    type="button"
                    onClick={() => setSortMenuOpen(false)}
                    className="flex items-center gap-1 text-sm font-semibold text-foreground"
                  >
                    Sort by <ChevronUp className="w-4 h-4 text-foreground" />
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="w-px h-[14px] bg-border" />
                    <button
                      type="button"
                      onClick={() => { setSortMenuOpen(false); setFilterOpen(true); }}
                      className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
                    >
                      <Filter className="w-[18px] h-[18px]" />
                      Filter
                    </button>
                  </div>
                </div>

                {/* Sort options list */}
                {sortOptions.map((opt) => {
                  const selected = sortBy === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setSortBy(opt.value); setSortMenuOpen(false); }}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm  last:border-b-0 hover:bg-muted/30 transition-colors"
                    >
                      <span className={selected ? "font-semibold text-foreground" : "text-foreground"}>
                        {opt.label}
                      </span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-primary" : "border-zinc-300"}`}>
                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Mobile Filter bottom sheet */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="max-h-[90vh] rounded-t-2xl p-0 gap-0 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="p-1.5 -ml-1 rounded-full hover:bg-muted"
                aria-label="Close filters"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="flex-1 text-center font-bold text-base pr-7">Filter by</h2>
            </div>

            <div className="overflow-y-auto px-5 py-4 pb-28 max-h-[calc(90vh-120px)]">


              {/* Category filter */}
              {renderCategoryFilter()}

              {/* Price */}
              <div className="mb-2">

                <span className="font-bold text-sm text-foreground">Price</span>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    ₹{priceRange[0].toFixed(2).replace(/\.00$/, '')} - ₹{priceRange[1].toFixed(2).replace(/\.00$/, '')}
                  </p>
                  <div className="relative h-6 flex items-center mb-1 px-0.5">
                    <div className="absolute inset-x-0 h-1.5 rounded-full bg-zinc-200" />
                    <div
                      className="absolute h-1.5 rounded-full bg-primary"
                      style={{
                        left: `${((priceRange[0] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                        right: `${100 - ((priceRange[1] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                      }}
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                        setPriceRange([val, priceRange[1]]);
                      }}
                      className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
                      aria-label="Minimum price"
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                        setPriceRange([priceRange[0], val]);
                      }}
                      className="absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>

              </div>

              {/* Rating */}
              <div className="mb-5 mt-5">
                <span className="font-bold text-sm text-foreground block mb-3">Rating</span>
                <div className="space-y-1">
                  {gradeCounts.map(({ grade }) => {
                    const isActive = selectedGrades.includes(grade);
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => toggleArrayItem(selectedGrades, grade, setSelectedGrades)}
                        className="flex items-center justify-between w-full py-2.5 px-1 rounded-lg transition-colors hover:bg-muted/40"
                      >
                        <div className="flex gap-0.5 text-primary">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4.5 h-4.5 ${i < grade ? "fill-current w-5 h-5" : "text-gray-200 fill-gray-200 w-5 h-5"}`} />
                          ))}
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? "border-primary" : "border-zinc-300"}`}>
                          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm text-primary font-medium mt-4"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 bg-background border-t border-border">
              <Button
                onClick={() => setFilterOpen(false)}
                className="w-full h-12 rounded-full bg-primary hover:opacity-90 text-primary-foreground font-bold text-base border-0"
              >
                Apply
              </Button>
            </div>
          </SheetContent>
        </Sheet>



        {/* Product grid — 2 columns or list */}
        <div className={viewMode === 'grid' ? "grid grid-cols-2 gap-3 sm:gap-4" : "flex flex-col"}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} layout={viewMode} />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-2 text-center py-16">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your search or filters.</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block container mx-auto px-6 pt-6 pb-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-900">All Products</span>
        </div>

        <div className="flex flex-row gap-8 items-start">
          <aside className="w-[260px] shrink-0 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 hide-scrollbar">
            {renderSidebar()}
          </aside>

          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">All Products</h1>
                <p className="text-sm text-zinc-500 mt-1">{filteredProducts.length} products found</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">Sort by:</span>
                <Select value={sortBy} onValueChange={(val) => setSortBy(val || "popular")}>
                  <SelectTrigger className="w-[140px] bg-white h-9">
                    <SelectValue placeholder="Popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border mt-6">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find what you&apos;re looking for.</p>
                <Button variant="outline" className="mt-6" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
