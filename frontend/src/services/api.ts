// API service for SMS application
export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  deviceId: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalTransactions: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingVerifications: number;
  lowBalanceCustomers: number;
}

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'; // Client backend

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(sessionId && { 'X-Session-ID': sessionId }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Client APIs
  async getClientTransactions(): Promise<Transaction[]> {
    return this.request<Transaction[]>('/api/client/transactions');
  }

  async getClientBalance(): Promise<{ balance: number }> {
    return this.request<{ balance: number }>('/api/client/balance');
  }

  async deposit(amount: number, description?: string): Promise<Transaction> {
    return this.request<Transaction>('/api/client/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    });
  }

  async withdraw(amount: number, description?: string): Promise<Transaction> {
    return this.request<Transaction>('/api/client/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    });
  }

  async updateDeviceId(deviceId: string): Promise<void> {
    return this.request<void>('/api/client/device', {
      method: 'PUT',
      body: JSON.stringify({ deviceId }),
    });
  }
}

export const apiService = new ApiService();

