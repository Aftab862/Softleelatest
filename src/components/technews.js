import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Divider } from "@mui/material";
import { Helmet } from "react-helmet";

const abc = [
  { name: "A", value: "A" },
  { name: "B", value: "B" },
  { name: "C", value: "C" },
  { name: "D", value: "D" },
  { name: "E", value: "E" },
  { name: "F", value: "F" },
  { name: "G", value: "G" },
  { name: "H", value: "H" },
  { name: "I", value: "I" },
  { name: "J", value: "J" },
  { name: "K", value: "K" },
  { name: "L", value: "L" },
  { name: "M", value: "M" },
  { name: "N", value: "N" },
  { name: "O", value: "O" },
  { name: "P", value: "P" },
  { name: "Q", value: "Q" },
  { name: "R", value: "R" },
  { name: "S", value: "S" },
  { name: "T", value: "T" },
  { name: "U", value: "U" },
  { name: "V", value: "V" },
  { name: "W", value: "W" },
  { name: "X", value: "X" },
  { name: "Y", value: "Y" },
  { name: "Z", value: "Z" },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function TechNewsDialog(props) {
  const { dialogIsOpen, brands } = props;
  return (
    <>

      {/* <Helmet>
        <title>Gadgets - Mobile Phones And Tech Updates - Softliee.com</title>
        <meta
          name="description"
          content="Mobile Blog aims to focus upon latest news and seo friendly content related to technology, gadgets or Mobile phones."
        />
      </Helmet> */}

      <div>

        <BootstrapDialog
          onClose={props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={dialogIsOpen}
          // fullWidth={true}
          // maxWidth="lg"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1110px",
              },
            },
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
            className="text-center"
          >
            <Typography
              className="d-flex justify-content-center w-100 pe-3 fw-bolder"
              variant="h5"
            >
              Search Brand
            </Typography>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className="d-flex justify-content-center align-items-center  w-100 flex-column pt-2">
              <div className="searchContiner">
                <input className="searchbarinput" />
                <button className="searchButton">
                  <SearchIcon />
                  Search
                </button>
              </div>
              <div className="d-flex pt-4 flex-wrap">
                {abc.map((data) => (
                  <Typography
                    variant="body1"
                    className="m-2 cursor-pointer fw-bolder"
                  >
                    {data?.name}
                  </Typography>
                ))}
              </div>
            </div>
            <Divider orientation="horizontal" className="mt-3">
              {" "}
            </Divider>
            {/* <div className="d-flex  justify-content-start pt-4 w-100 flex-wrap pb-3">
            {brands?.data?.brands?.map((data) => (
              <Typography variant="body1" className="p-2 mt-2 cursor-pointer fw-bolder w-20 d-flex justify-content-center">{data?.brand_name}</Typography>
            ))}
          </div> */}
          </DialogContent>
        </BootstrapDialog>
      </div>
    </>
  );
}
