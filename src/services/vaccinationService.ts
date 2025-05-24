
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
  private storageKey = 'vaccination_records';

  getAll(): Child[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : this.getInitialData();
    } catch (error) {
      console.error('Error loading vaccination records:', error);
      return this.getInitialData();
    }
  }

  create(child: Omit<Child, 'id'>): Child {
    const children = this.getAll();
    const newChild: Child = {
      ...child,
      id: this.generateId()
    };
    children.push(newChild);
    this.save(children);
    return newChild;
  }

  update(id: string, updates: Omit<Child, 'id'>): Child | null {
    const children = this.getAll();
    const index = children.findIndex(child => child.id === id);
    
    if (index === -1) return null;
    
    children[index] = { ...children[index], ...updates };
    this.save(children);
    return children[index];
  }

  delete(id: string): boolean {
    const children = this.getAll();
    const filteredChildren = children.filter(child => child.id !== id);
    
    if (filteredChildren.length === children.length) return false;
    
    this.save(filteredChildren);
    return true;
  }

  private save(children: Child[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(children));
    } catch (error) {
      console.error('Error saving vaccination records:', error);
    }
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getInitialData(): Child[] {
    const sampleData: Child[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        dateOfBirth: '2020-03-15',
        gender: 'Female',
        guardianName: 'Emily Johnson',
        address: '123 Maple Street, Springfield, IL 62701',
        vaccineName: 'MMR',
        vaccinationDate: '2024-03-15',
        nextDueDate: '2025-03-15',
        notes: 'No adverse reactions observed. Child was cooperative during vaccination.'
      },
      {
        id: '2',
        name: 'Michael Chen',
        dateOfBirth: '2019-07-22',
        gender: 'Male',
        guardianName: 'David Chen',
        address: '456 Oak Avenue, Springfield, IL 62702',
        vaccineName: 'DPT',
        vaccinationDate: '2024-07-22',
        nextDueDate: '2025-01-22',
        notes: 'Mild fever reported 24 hours post-vaccination, resolved with acetaminophen.'
      },
      {
        id: '3',
        name: 'Aisha Patel',
        dateOfBirth: '2021-11-08',
        gender: 'Female',
        guardianName: 'Priya Patel',
        address: '789 Pine Road, Springfield, IL 62703',
        vaccineName: 'Hepatitis B',
        vaccinationDate: '2024-11-08',
        nextDueDate: '2025-05-08',
        notes: 'Second dose in series. Next appointment scheduled for booster.'
      }
    ];

    // Save sample data to localStorage if none exists
    this.save(sampleData);
    return sampleData;
  }
}

export const vaccinationService = new VaccinationService();
