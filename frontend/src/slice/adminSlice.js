import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const ADMIN_URL = "http://localhost:3500/api/admin/users";

export const getAllusers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await axios.get(ADMIN_URL, {
    withCredentials: true,
  });
  const users = response.data;
  console.log(users, "get all users");
  return users;
});

export const createUser = createAsyncThunk("users/createUser", async (data) => {
  const response = await axios.post(ADMIN_URL, data, {
    withCredentials: true,
  });
  const users = response.data;
  return users;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }) => {
    console.log(data, "thunk");
    const response = await axios.put(`${ADMIN_URL}/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(`${ADMIN_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

const usersSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: "idle",
    error: "",
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllusers.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        (state.loading = "idle"), (state.users = action.payload);
      })
      .addCase(getAllusers.rejected, (state, action) => {
        (state.loading = "idle"), (state.error = action.error.message);
      })
      .addCase(editUser.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = "idle";

        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = "idle";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = error.message;
      });
  },
});

export default usersSlice.reducer;
