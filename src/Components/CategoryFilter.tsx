import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { label: 'All', icon: '✨' },
  { label: 'Villas', icon: '🏡' },
  { label: 'Houses', icon: '🏠' },
  { label: 'Hotels', icon: '🏨' },
  { label: 'Apartments', icon: '🏢' },
  { label: 'Chalets', icon: '🏔️' },
  { label: 'Cabins', icon: '🪵' },
  { label: 'Beachfront', icon: '🏖️' },
  { label: 'Castles', icon: '🏰' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="sticky top-[80px] z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-4">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-none py-2">
          {categories.map((cat) => {
            // تنظيف النص لضمان التطابق التام عند الضغط
            const cleanSelected = selectedCategory.replace(/[^\w\s]/gi, '').trim().toLowerCase();
            const cleanCat = cat.label.toLowerCase();

            const isActive =
              selectedCategory === cat.label ||
              (cleanSelected.includes(cleanCat) && cat.label !== 'All') ||
              (selectedCategory === 'All' && cat.label === 'All');

            return (
              <button
                key={cat.label}
                onClick={() => onSelectCategory(cat.label)}
                className={`flex flex-col items-center gap-2 pb-2 border-b-2 transition whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'border-black text-black opacity-100 font-bold'
                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300 opacity-70'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};