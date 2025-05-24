
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Child } from '../services/vaccinationService';
import { Calendar, User, MapPin, Shield, UserCheck, Baby } from 'lucide-react';

interface VaccinationFormProps {
  onSubmit: (child: Omit<Child, 'id'>) => void;
  editingChild: Child | null;
  onCancel: () => void;
}

export const VaccinationForm: React.FC<VaccinationFormProps> = ({
  onSubmit,
  editingChild,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    guardianName: '',
    address: '',
    vaccineName: '',
    vaccinationDate: '',
    nextDueDate: '',
    notes: ''
  });

  useEffect(() => {
    if (editingChild) {
      setFormData(editingChild);
    } else {
      setFormData({
        name: '',
        dateOfBirth: '',
        gender: '',
        guardianName: '',
        address: '',
        vaccineName: '',
        vaccinationDate: '',
        nextDueDate: '',
        notes: ''
      });
    }
  }, [editingChild]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingChild) {
      setFormData({
        name: '',
        dateOfBirth: '',
        gender: '',
        guardianName: '',
        address: '',
        vaccineName: '',
        vaccinationDate: '',
        nextDueDate: '',
        notes: ''
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const commonVaccines = [
    'BCG', 'Hepatitis B', 'Polio (OPV)', 'DPT', 'MMR', 'Pneumococcal', 
    'Rotavirus', 'Varicella', 'Hepatitis A', 'Meningococcal', 'HPV', 'Influenza'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child Information Section */}
        <Card className="border-blue-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Baby className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">Child Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Child Name *</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter child's full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date of Birth *</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Information Section */}
        <Card className="border-green-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <UserCheck className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800">Guardian Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="guardianName" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Guardian Name *</span>
                </Label>
                <Input
                  id="guardianName"
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => handleChange('guardianName', e.target.value)}
                  placeholder="Enter guardian's full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Address *</span>
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  required
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vaccination Information Section */}
      <Card className="border-purple-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">Vaccination Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vaccineName">Vaccine Name *</Label>
              <Select value={formData.vaccineName} onValueChange={(value) => handleChange('vaccineName', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select vaccine" />
                </SelectTrigger>
                <SelectContent>
                  {commonVaccines.map(vaccine => (
                    <SelectItem key={vaccine} value={vaccine}>{vaccine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vaccinationDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Vaccination Date *</span>
              </Label>
              <Input
                id="vaccinationDate"
                type="date"
                value={formData.vaccinationDate}
                onChange={(e) => handleChange('vaccinationDate', e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="nextDueDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Next Due Date</span>
              </Label>
              <Input
                id="nextDueDate"
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => handleChange('nextDueDate', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes or observations"
              className="mt-1 resize-none"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-8 transition-all duration-200 transform hover:scale-105"
        >
          <Shield className="h-4 w-4 mr-2" />
          {editingChild ? 'Update Record' : 'Add Vaccination Record'}
        </Button>
        
        {editingChild && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
