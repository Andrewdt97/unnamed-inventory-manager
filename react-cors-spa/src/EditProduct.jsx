import "./EditProduct.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function EditProduct() {
  return (
    <div className="edit-icon">
      <EditOutlinedIcon
        sx={{
          /* Font size from an external CSS file on MUI icons 
          will not adjust the size, only the sx 
          prop will adjust this
          */
          fontSize: "medium",
        }}
      />
    </div>
  );
}

export default EditProduct;
