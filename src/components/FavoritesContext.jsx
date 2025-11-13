import React, { createContext, useContext, useEffect, useMemo } from "react";

const FavoritesContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const set = new Set(state.ids);
      set.has(action.id) ? set.delete(action.id) : set.add(action.id);
      return { ids: Array.from(set) };
    }
    case "SET": {
      return { ids: Array.from(new Set(action.ids || [])) };
    }
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, { ids: [] });

  // hydrate
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favorites-ids") || "[]");
      dispatch({ type: "SET", ids: saved });
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem("favorites-ids", JSON.stringify(state.ids));
  }, [state.ids]);

  const value = useMemo(
    () => ({
      ids: state.ids,
      isFav: (id) => state.ids.includes(id),
      toggle: (id) => dispatch({ type: "TOGGLE", id }),
      count: state.ids.length,
    }),
    [state.ids]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
