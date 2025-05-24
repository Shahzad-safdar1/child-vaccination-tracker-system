
import { apiService } from './apiService';

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  guardianName: string;
  address: string;
  vaccineName: string;
  vaccinationDate: string;
  nextDueDate: string;
  notes: string;
}

class VaccinationService {
  async getAll(): Promise<Child[]> {
    try {
      return await apiService.getAll();
    } catch (error) {
      console.error('Error loading vaccination records:', error);
      // Return empty array if API fails and no localStorage fallback
      return [];
    }
  }

  async create(child: Omit<Child, 'id'>): Promise<Child> {
    try {
      return await apiService.create(child);
    } catch (error) {
      console.error('Error creating vaccination record:', error);
      throw new Error('Failed to create vaccination record. Please check your connection and try again.');
    }
  }

  async update(id: string, updates: Omit<Child, 'id'>): Promise<Child | null> {
    try {
      return await apiService.update(id, updates);
    } catch (error) {
      console.error('Error updating vaccination record:', error);
      throw new Error('Failed to update vaccination record. Please check your connection and try again.');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      return await apiService.delete(id);
    } catch (error) {
      console.error('Error deleting vaccination record:', error);
      throw new Error('Failed to delete vaccination record. Please check your connection and try again.');
    }
  }
}

export const vaccinationService = new VaccinationService();
