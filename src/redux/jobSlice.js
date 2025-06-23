import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../superbase/config';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const { data, error } = await supabase.from('jobs').select('*')
  if (error) throw error
  return data
})

export const addJob = createAsyncThunk('jobs/addJob', async (job, { rejectWithValue }) => {
  const { data, error } = await supabase.from('jobs').insert([job]).select().single()
  if (error) return rejectWithValue(error.message)
  return data
})

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, data }) => {
  const { data: updated, error } = await supabase
    .from('jobs')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return updated
})

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id) => {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) throw error
  return id
})

export const applyJob = createAsyncThunk(
  'jobs/applyJob',
  async ({ jobId, name, email, filePath,resume }) => {
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, resume);

    if (uploadError) throw uploadError;
    return { jobId, name, email };
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    status: null,
    editingJob: null,
  },
  reducers: {
    setEditingJob: (state, action) => {
      state.editingJob = action.payload
    },
    clearEditingJob: (state) => {
      state.editingJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.items.findIndex((job) => job.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.items = state.items.filter((job) => job.id !== action.payload)
      })
  },
})

export const { setEditingJob, clearEditingJob } = jobSlice.actions
export default jobSlice.reducer
