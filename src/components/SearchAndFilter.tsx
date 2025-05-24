
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterVaccine: string;
  onFilterChange: (value: string) => void;
  vaccines: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterVaccine,
  onFilterChange,
  vaccines
}) => {
  return (
    <Card className="shadow-lg border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">Search & Filter Records</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search by Name or Guardian</span>
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filter" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter by Vaccine</span>
            </Label>
            <Select value={filterVaccine} onValueChange={onFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="All vaccines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All vaccines</SelectItem>
                {vaccines.map((vaccine) => (
                  <SelectItem key={vaccine} value={vaccine}>
                    {vaccine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
