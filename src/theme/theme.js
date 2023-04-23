import { createTheme } from "@mui/material";
import { makeStyles } from '@mui/styles';

export const theme = createTheme(
    {
        typography: {
            allVariants: {
                fontFamily: `'Be Vietnam Pro', sans-serif`
            },
        },
        palette: {
            primary: { main: '#0A7E6E' },
            error: { main: '#A70100' },
        },
        shape: {
            borderRadius: 10,
        },
    }
);



export const useStyles = makeStyles({

    root: {
        "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important"
        },
        "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal"
        },
        "& .MuiDataGrid-row": {
            maxHeight: "none !important"
        },
        "&.MuiDataGrid-columnsContainer": {
            background: '#010310',
        },

    }
});
