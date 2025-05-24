
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Child } from '../services/vaccinationService';
import { Edit, Trash2, User, Calendar, MapPin, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface ChildrenListProps {
  children: Child[];
  onEdit: (child: Child) => void;
  onDelete: (id: string) => void;
}

export const ChildrenList: React.FC<ChildrenListProps> = ({
  children,
  onEdit,
  onDelete
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      // Auto-cancel confirmation after 3 seconds
      setTimeout(() => {
        setDeleteConfirm(null);
      }, 3000);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const isVaccinationDue = (nextDueDate: string) => {
    if (!nextDueDate) return false;
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isVaccinationOverdue = (nextDueDate: string) => {
    if (!nextDueDate) return false;
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    return dueDate < today;
  };

  if (children.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No vaccination records found</h3>
        <p className="text-gray-500">Start by adding your first child vaccination record above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {children.map((child) => {
          const age = calculateAge(child.dateOfBirth);
          const isDue = isVaccinationDue(child.nextDueDate);
          const isOverdue = isVaccinationOverdue(child.nextDueDate);
          
          return (
            <Card key={child.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-600">Age: {age} years • {child.gender}</p>
                  </div>
                  <div className="flex space-x-2">
                    {isOverdue && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Overdue
                      </Badge>
                    )}
                    {isDue && !isOverdue && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Due Soon
                      </Badge>
                    )}
                    {!isDue && !isOverdue && child.nextDueDate && (
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Up to Date
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Guardian: {child.guardianName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{child.vaccineName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Given: {new Date(child.vaccinationDate).toLocaleDateString()}</span>
                  </div>
                  {child.nextDueDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Next: {new Date(child.nextDueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(child)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={deleteConfirm === child.id ? "destructive" : "outline"}
                    onClick={() => handleDelete(child.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {deleteConfirm === child.id ? 'Confirm' : 'Delete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-8 gap-4 font-semibold text-gray-700 text-sm">
            <div>Child Info</div>
            <div>Guardian</div>
            <div>Vaccine</div>
            <div>Given Date</div>
            <div>Next Due</div>
            <div>Status</div>
            <div>Address</div>
            <div>Actions</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {children.map((child) => {
            const age = calculateAge(child.dateOfBirth);
            const isDue = isVaccinationDue(child.nextDueDate);
            const isOverdue = isVaccinationOverdue(child.nextDueDate);
            
            return (
              <Card key={child.id} className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="grid grid-cols-8 gap-4 items-center text-sm">
                    <div>
                      <div className="font-semibold text-gray-800">{child.name}</div>
                      <div className="text-gray-600">{age} years • {child.gender}</div>
                      <div className="text-xs text-gray-500">{new Date(child.dateOfBirth).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="text-gray-700">{child.guardianName}</div>
                    
                    <div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                        {child.vaccineName}
                      </Badge>
                    </div>
                    
                    <div className="text-gray-700">
                      {new Date(child.vaccinationDate).toLocaleDateString()}
                    </div>
                    
                    <div className="text-gray-700">
                      {child.nextDueDate ? new Date(child.nextDueDate).toLocaleDateString() : 'Not set'}
                    </div>
                    
                    <div>
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Overdue
                        </Badge>
                      )}
                      {isDue && !isOverdue && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Due Soon
                        </Badge>
                      )}
                      {!isDue && !isOverdue && child.nextDueDate && (
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Up to Date
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-gray-600 text-xs max-w-32 truncate" title={child.address}>
                      {child.address}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(child)}
                        className="h-8 w-8 p-0"
                        title="Edit record"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={deleteConfirm === child.id ? "destructive" : "outline"}
                        onClick={() => handleDelete(child.id)}
                        className="h-8 w-8 p-0"
                        title={deleteConfirm === child.id ? "Click to confirm deletion" : "Delete record"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {child.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Notes:</strong> {child.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
