import api from './api';
import type {
  CpuModel,
  PlacaMaeModel,
  GpuModel,
  MemoriaRamModel,
  ArmazenamentoModel,
  FonteModel,
  GabineteModel,
  RefrigeracaoModel
} from './recommendationService';

// CPU
export const cpuService = {
  async getAll(): Promise<CpuModel[]> {
    const response = await api.get('/cpu');
    return response.data;
  },

  async create(data: Omit<CpuModel, 'id'>): Promise<CpuModel> {
    const response = await api.post('/cpu', data);
    return response.data;
  },

  async update(id: number, data: Omit<CpuModel, 'id'>): Promise<CpuModel> {
    const response = await api.put(`/cpu/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/cpu/${id}`);
  }
};

// GPU
export const gpuService = {
  async getAll(): Promise<GpuModel[]> {
    const response = await api.get('/gpu');
    return response.data;
  },

  async create(data: Omit<GpuModel, 'id'>): Promise<GpuModel> {
    const response = await api.post('/gpu', data);
    return response.data;
  },

  async update(id: number, data: Omit<GpuModel, 'id'>): Promise<GpuModel> {
    const response = await api.put(`/gpu/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/gpu/${id}`);
  }
};

// Placa-mãe
export const placaMaeService = {
  async getAll(): Promise<PlacaMaeModel[]> {
    const response = await api.get('/placamae');
    return response.data;
  },

  async create(data: Omit<PlacaMaeModel, 'id'>): Promise<PlacaMaeModel> {
    const response = await api.post('/placamae', data);
    return response.data;
  },

  async update(id: number, data: Omit<PlacaMaeModel, 'id'>): Promise<PlacaMaeModel> {
    const response = await api.put(`/placamae/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/placamae/${id}`);
  }
};

// Memória RAM
export const memoriaRamService = {
  async getAll(): Promise<MemoriaRamModel[]> {
    const response = await api.get('/memoriaram');
    return response.data;
  },

  async create(data: Omit<MemoriaRamModel, 'id'>): Promise<MemoriaRamModel> {
    const response = await api.post('/memoriaram', data);
    return response.data;
  },

  async update(id: number, data: Omit<MemoriaRamModel, 'id'>): Promise<MemoriaRamModel> {
    const response = await api.put(`/memoriaram/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/memoriaram/${id}`);
  }
};

// Armazenamento
export const armazenamentoService = {
  async getAll(): Promise<ArmazenamentoModel[]> {
    const response = await api.get('/armazenamento');
    return response.data;
  },

  async create(data: Omit<ArmazenamentoModel, 'id'>): Promise<ArmazenamentoModel> {
    const response = await api.post('/armazenamento', data);
    return response.data;
  },

  async update(id: number, data: Omit<ArmazenamentoModel, 'id'>): Promise<ArmazenamentoModel> {
    const response = await api.put(`/armazenamento/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/armazenamento/${id}`);
  }
};

// Fonte
export const fonteService = {
  async getAll(): Promise<FonteModel[]> {
    const response = await api.get('/fonte');
    return response.data;
  },

  async create(data: Omit<FonteModel, 'id'>): Promise<FonteModel> {
    const response = await api.post('/fonte', data);
    return response.data;
  },

  async update(id: number, data: Omit<FonteModel, 'id'>): Promise<FonteModel> {
    const response = await api.put(`/fonte/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/fonte/${id}`);
  }
};

// Gabinete
export const gabineteService = {
  async getAll(): Promise<GabineteModel[]> {
    const response = await api.get('/gabinete');
    return response.data;
  },

  async create(data: Omit<GabineteModel, 'id'>): Promise<GabineteModel> {
    const response = await api.post('/gabinete', data);
    return response.data;
  },

  async update(id: number, data: Omit<GabineteModel, 'id'>): Promise<GabineteModel> {
    const response = await api.put(`/gabinete/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/gabinete/${id}`);
  }
};

// Refrigeração
export const refrigeracaoService = {
  async getAll(): Promise<RefrigeracaoModel[]> {
    const response = await api.get('/refrigeracao');
    return response.data;
  },

  async create(data: Omit<RefrigeracaoModel, 'id'>): Promise<RefrigeracaoModel> {
    const response = await api.post('/refrigeracao', data);
    return response.data;
  },

  async update(id: number, data: Omit<RefrigeracaoModel, 'id'>): Promise<RefrigeracaoModel> {
    const response = await api.put(`/refrigeracao/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/refrigeracao/${id}`);
  }
};
