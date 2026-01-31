const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  user?: T;
  token?: string;
}

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}

export interface UserSigninData {
  email: string;
  password: string;
}

export interface TherapistSignupData {
  name: string;
  email: string;
  password: string;
  license_number: string;
  license_state: string;
  years_of_experience: number;
  specialization?: string;
  phone: string;
  college_degree: string;
  masters_institution: string;
  psychologist_type: string;
  successful_cases: number;
  dsm_awareness: string;
  therapy_types: string;
  certificate_image_path?: string;
  degree_image_path?: string;
}

export interface TherapistSigninData {
  email: string;
  password: string;
}

export interface Therapist {
  id: string;
  name: string;
  email: string;
  created_at: string;
  license_number: string;
  license_state: string;
  years_of_experience: number;
  specialization?: string;
  phone: string;
  college_degree: string;
  masters_institution: string;
  psychologist_type: string;
  successful_cases: number;
  dsm_awareness: string;
  therapy_types: string;
  certificate_image_path?: string;
  degree_image_path?: string;
  is_approved: boolean;
}

export interface TherapistStatusResponse {
  is_approved: boolean;
  email: string;
  name: string;
  message: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw { message: error.message, status: 500 } as ApiError;
    }
    throw { message: 'An unknown error occurred', status: 500 } as ApiError;
  }
}

export const api = {
  // User auth
  userSignup: (data: UserSignupData) =>
    apiRequest('/api/auth/user/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  userSignin: (data: UserSigninData) =>
    apiRequest('/api/auth/user/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Therapist auth
  therapistSignup: (data: TherapistSignupData) =>
    apiRequest('/api/auth/therapist/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  therapistSignin: (data: TherapistSigninData) =>
    apiRequest('/api/auth/therapist/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Therapist status
  checkTherapistStatus: async (email: string): Promise<TherapistStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/therapist/status?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
    }
    return data as TherapistStatusResponse;
  },
};

