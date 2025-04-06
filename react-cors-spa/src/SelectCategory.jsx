import fetchCategories from "./services/CategoryServices";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

function SelectCategory({ category_id }) {
  // Populate categories from DB with useQuery
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
        <Select
          label="Category"
          variant="standard"
          defaultValue={category_id ?? ""}
        >
          {data?.map((cat) => (
            <MenuItem key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
