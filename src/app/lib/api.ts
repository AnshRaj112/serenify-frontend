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

  // Therapist auth - accepts FormData with files and form fields
  therapistSignup: async (formData: FormData): Promise<ApiResponse<any>> => {
    const url = `${API_BASE_URL}/api/auth/therapist/signup`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type - browser will set it with boundary for multipart/form-data
      });

      const data = await response.json();

      if (!response.ok) {
        throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
      }

      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }
      throw { message: error instanceof Error ? error.message : 'An unknown error occurred', status: 500 } as ApiError;
    }
  },

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

  // File upload
  uploadFile: async (file: File, folder: string = ''): Promise<string> => {
    if (!file) {
      throw { message: 'No file provided', status: 400 } as ApiError;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Build URL with optional folder parameter
    let uploadUrl = `${API_BASE_URL}/api/upload`;
    if (folder) {
      uploadUrl += `?folder=${encodeURIComponent(folder)}`;
    }

    console.log('Uploading to:', uploadUrl);
    console.log('File:', file.name, file.size, file.type);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
      });

      console.log('Upload response status:', response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const text = await response.text();
        console.error('Failed to parse response as JSON:', text);
        throw { message: `Server error: ${text}`, status: response.status } as ApiError;
      }

      console.log('Upload response data:', data);

      if (!response.ok) {
        console.error('Upload error response:', data);
        throw { message: data.message || data.error || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
      }

      if (!data.success) {
        console.error('Upload not successful:', data);
        throw { message: data.message || 'Upload failed', status: 500 } as ApiError;
      }

      if (!data.url || data.url === "") {
        console.error('Upload response missing URL:', data);
        throw { message: 'Upload failed: No URL returned from server', status: 500 } as ApiError;
      }

      console.log('File uploaded successfully, URL:', data.url);
      return data.url;
    } catch (error) {
      console.error('Upload fetch error:', error);
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }
      throw { message: error instanceof Error ? error.message : 'Network error during upload', status: 500 } as ApiError;
    }
  },

  // Admin routes
  getPendingTherapists: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/therapists/pending`);
    const data = await response.json();
    if (!response.ok) {
      throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
    }
    return data;
  },

  getApprovedTherapists: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/therapists/approved`);
    const data = await response.json();
    if (!response.ok) {
      throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
    }
    return data;
  },

  approveTherapist: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/therapists/approve?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
    });
    const data = await response.json();
    if (!response.ok) {
      throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
    }
    return data;
  },

  rejectTherapist: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/therapists/reject?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
      throw { message: data.message || `HTTP error! status: ${response.status}`, status: response.status } as ApiError;
    }
    return data;
  },
};

