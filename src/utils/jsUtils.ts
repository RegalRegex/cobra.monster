let lastWidth: number;

export const DOMLoaded = (callback: () => void) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};

export const handleResize = (callback: () => void) => {
  const debouncedCallback = debounce(callback, 300);
  window.addEventListener("resize", debouncedCallback);

  return () => {
    window.removeEventListener("resize", debouncedCallback);
  };
};

export const hasViewportWidthChanged = (): boolean => {
  if (typeof window !== "undefined") {
    const currentWidth = window.innerWidth;
    const widthChanged = currentWidth !== lastWidth;

    if (widthChanged) {
      lastWidth = currentWidth;
    }

    return widthChanged;
  }

  return false;
};
