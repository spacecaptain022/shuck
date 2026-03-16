"use client";

import { create } from "zustand";

type UIState = {
  mobileMenuOpen: boolean;
  filterDrawerOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  filterDrawerOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
}));
