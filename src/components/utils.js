import { useMediaQuery } from "react-responsive";

export const IsMobileWidth = () => {
  return useMediaQuery({
    maxWidth: "575.98px",
  });
};

export const IsTabletWidth = () => {
  return useMediaQuery({
    maxWidth: "768px",
  });
};

export const initialState = {
  data: false,
  loading: false,
  error: false,
}

export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#d0021b", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});


export function formatAmount(amount) {
  if (amount === undefined || amount === "" || amount === null) return "";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}