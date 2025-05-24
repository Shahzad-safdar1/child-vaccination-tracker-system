
import React, { useState, useEffect } from 'react';
import { VaccinationForm } from '../components/VaccinationForm';
import { ChildrenList } from '../components/ChildrenList';
import { VaccinationStats } from '../components/VaccinationStats';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { vaccinationService, Child } from '../services/vaccinationService';
import { toast } from 'sonner';
import { Stethoscope, Users, Shield, Calendar } from 'lucide-react';

const Index = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVaccine, setFilterVaccine] = useState('');

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    filterChildren();
  }, [children, searchTerm, filterVaccine]);

  const loadChildren = () => {
    const loadedChildren = vaccinationService.getAll();
    setChildren(loadedChildren);
  };

  const filterChildren = () => {
    let filtered = children;

    if (searchTerm) {
      filtered = filtered.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.guardianName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterVaccine) {
      filtered = filtered.filter(child =>
        child.vaccineName.toLowerCase().includes(filterVaccine.toLowerCase())
      );
    }

    setFilteredChildren(filtered);
  };

  const handleSubmit = (childData: Omit<Child, 'id'>) => {
    try {
      if (editingChild) {
        vaccinationService.update(editingChild.id, childData);
        toast.success('Vaccination record updated successfully!');
        setEditingChild(null);
      } else {
        vaccinationService.create(childData);
        toast.success('New vaccination record added successfully!');
      }
      loadChildren();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleEdit = (child: Child) => {
    setEditingChild(child);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    try {
      vaccinationService.delete(id);
      toast.success('Vaccination record deleted successfully!');
      loadChildren();
    } catch (error) {
      toast.error('Failed to delete record. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingChild(null);
  };

  const stats = {
    totalChildren: children.length,
    vaccinesGiven: children.length,
    upcomingDue: Math.floor(children.length * 0.2),
    completedSeries: Math.floor(children.length * 0.8)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-blue-500 p-3 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Children Vaccination Management System
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive vaccination tracking and management platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Statistics Dashboard */}
        <VaccinationStats
          totalChildren={stats.totalChildren}
          vaccinesGiven={stats.vaccinesGiven}
          upcomingDue={stats.upcomingDue}
          completedSeries={stats.completedSeries}
        />

        {/* Vaccination Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span>{editingChild ? 'Update Vaccination Record' : 'Add New Vaccination Record'}</span>
            </h2>
            <p className="text-blue-100 mt-2">
              {editingChild ? 'Update the vaccination information below' : 'Enter child vaccination details below'}
            </p>
          </div>
          <div className="p-6">
            <VaccinationForm
              onSubmit={handleSubmit}
              editingChild={editingChild}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterVaccine={filterVaccine}
          onFilterChange={setFilterVaccine}
          vaccines={[...new Set(children.map(child => child.vaccineName))]}
        />

        {/* Children List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Vaccination Records ({filteredChildren.length})</span>
            </h2>
            <p className="text-green-100 mt-2">
              Complete list of children vaccination records
            </p>
          </div>
          <div className="p-6">
            <ChildrenList
              children={filteredChildren}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Stethoscope className="h-6 w-6" />
            <span className="text-xl font-semibold">Children Vaccination System</span>
          </div>
          <p className="text-gray-400">
            Ensuring every child receives proper vaccination care and tracking
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
