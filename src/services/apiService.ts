
const API_BASE_URL = 'http://localhost:3001/api';

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

class ApiService {
  async getAll(): Promise<Child[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/children`);
      if (!response.ok) {
        throw new Error('Failed to fetch children');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  }

  async create(child: Omit<Child, 'id'>): Promise<Child> {
    try {
      const response = await fetch(`${API_BASE_URL}/children`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(child),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create child record');
      }
      
      const result = await response.json();
      return result.child;
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  }

  async update(id: string, child: Omit<Child, 'id'>): Promise<Child> {
    try {
      const response = await fetch(`${API_BASE_URL}/children/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(child),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update child record');
      }
      
      return { ...child, id };
    } catch (error) {
      console.error('Error updating child:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/children/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete child record');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
