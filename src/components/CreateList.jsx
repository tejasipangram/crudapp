import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, Stack, TextareaAutosize } from "@mui/material";
import { Flare } from "@mui/icons-material";
import { GlobalContext } from "../globalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 4,
};

export default function CreateList({ name }) {
  const { createList } = React.useContext(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");

  const onChangeTitleHandler = (e) => {
    setModalTitle(e.target.value);
  };
  const onChangeBodyeHandler = (e) => {
    setModalBody(e.target.value);
  };

  const saveHandler = async () => {
    await createList(modalTitle, modalBody);
    setModalBody("");
    setModalTitle("");
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleOpen}>{name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={4}>
          <Input
            onChange={onChangeTitleHandler}
            type="text"
            name={`title`}
            placeholder={`Title`}
            value={modalTitle}
          />
          <TextareaAutosize
            onChange={onChangeBodyeHandler}
            minRows={3} // Minimum number of rows (initial height)
            maxRows={6} // Maximum number of rows (height will expand up to this)
            aria-label="maximum height"
            placeholder="Type your text here"
            value={modalBody}
          />
          <Stack direction={"row"}>
            <Button onClick={saveHandler} size="small">
              SAVE
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              size="small"
            >
              CANCEL
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
