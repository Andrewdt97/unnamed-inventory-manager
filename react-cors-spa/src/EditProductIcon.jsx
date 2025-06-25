import "./EditProductIcon.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function EditProductIcon({ toggleEditDialog }) {
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
        onClick={toggleEditDialog}
      />
    </div>
  );
}

export default EditProductIcon;
