
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Transform backend data to frontend format
      return data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        dateOfBirth: item.dob,
        gender: item.gender,
        guardianName: item.guardian_name,
        address: item.address,
        vaccineName: item.vaccine_name,
        vaccinationDate: item.vaccination_date,
        nextDueDate: item.next_due_date || '',
        notes: item.notes || ''
      }));
    } catch (error) {
      console.error('Error fetching children:', error);
      throw error;
    }
  }

  async create(child: Omit<Child, 'id'>): Promise<Child> {
    try {
      const backendData = {
        name: child.name,
        dateOfBirth: child.dateOfBirth,
        gender: child.gender,
        guardianName: child.guardianName,
        address: child.address,
        vaccineName: child.vaccineName,
        vaccinationDate: child.vaccinationDate,
        nextDueDate: child.nextDueDate,
        notes: child.notes
      };

      const response = await fetch(`${API_BASE_URL}/children`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.child || { ...child, id: result.id?.toString() || Date.now().toString() };
    } catch (error) {
      console.error('Error creating child:', error);
      throw error;
    }
  }

  async update(id: string, child: Omit<Child, 'id'>): Promise<Child> {
    try {
      const backendData = {
        name: child.name,
        dateOfBirth: child.dateOfBirth,
        gender: child.gender,
        guardianName: child.guardianName,
        address: child.address,
        vaccineName: child.vaccineName,
        vaccinationDate: child.vaccinationDate,
        nextDueDate: child.nextDueDate,
        notes: child.notes
      };

      const response = await fetch(`${API_BASE_URL}/children/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
