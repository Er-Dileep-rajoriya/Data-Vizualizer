import React from "react";

type FilterProps = {
  dateRange: { from: string; to: string };
  name: string;
  onFilterChange: (filters: {
    dateRange: { from: string; to: string };
    name: string;
  }) => void;
};

function FilterBar({ dateRange, name, onFilterChange }: FilterProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;

    if (fieldName === "from" || fieldName === "to") {
      onFilterChange({
        dateRange: {
          ...dateRange,
          [fieldName]: value,
        },
        name,
      });
    } else {
      onFilterChange({
        dateRange,
        name: value,
      });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row gap-4 justify-between">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">From:</label>
        <input
          type="date"
          name="from"
          value={dateRange.from}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        />
        <label className="text-sm font-medium">To:</label>
        <input
          type="date"
          name="to"
          value={dateRange.to}
          onChange={handleInputChange}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Filter by name(product a)"
          name="name"
          value={name}
          onChange={handleInputChange}
          className="border rounded px-4 py-1 w-full sm:w-64"
        />
      </div>
    </div>
  );
}

export default FilterBar;
