import fetchCategories from "./services/CategoryServices";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";

function SelectCategory({ category_id, control }) {
  const { data } = useQuery({
    queryKey: ["categoryData"],
    queryFn: fetchCategories,
    select: (data) => {
      return data?.data?.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    },
  });

  return (
    <Box className="select-box">
      <FormControl className="select-form-control" fullWidth>
        <InputLabel>Category</InputLabel>
        <Controller
          name="category_id"
          control={control}
          defaultValue={category_id || ""}
          render={({ field }) => (
            <Select
              label="Category"
              variant="standard"
              value={field.value}
              onChange={(e) => field.onChange(e)} // requires field.onChange method and not just field.value
            >
              {data?.map((cat) => (
                <MenuItem key={cat.category_id} value={cat.category_id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
