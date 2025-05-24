
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
      // Fallback to localStorage if API fails
      return this.getFromLocalStorage();
    }
  }

  async create(child: Omit<Child, 'id'>): Promise<Child> {
    try {
      return await apiService.create(child);
    } catch (error) {
      console.error('Error creating vaccination record:', error);
      throw error;
    }
  }

  async update(id: string, updates: Omit<Child, 'id'>): Promise<Child | null> {
    try {
      return await apiService.update(id, updates);
    } catch (error) {
      console.error('Error updating vaccination record:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      return await apiService.delete(id);
    } catch (error) {
      console.error('Error deleting vaccination record:', error);
      throw error;
    }
  }

  // Fallback methods for localStorage
  private getFromLocalStorage(): Child[] {
    try {
      const data = localStorage.getItem('vaccination_records');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  }
}

export const vaccinationService = new VaccinationService();
