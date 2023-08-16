import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { GlobalContext } from "../globalContext";
import BasicModal from "./PopUp";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ListCard({ title, body, id }) {
  const { deleteList } = useContext(GlobalContext);

  return (
    <Card sx={{ maxWidth: 475, minWidth: 475 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          List
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2">
          {body}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <BasicModal id={id} name={"EDIT"} title={title} body={body} />
        <Button
          onClick={() => {
            deleteList(id);
          }}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
