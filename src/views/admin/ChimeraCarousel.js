import React, { useState, useEffect } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import Loader from "../../components/Loader/Loader";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import UpadateIcon from "@material-ui/icons/Update";
import Swal from "sweetalert2";
import axios from "axios";
import "../../assets/styles/upload.css";

import config from "config";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
      [theme.breakpoints.down("sm")]: {
        width: "20ch",
      },
      [theme.breakpoints.up("md")]: {
        width: "33ch",
      },
      [theme.breakpoints.up("lg")]: {
        width: "38ch",
      },
    },
  },
}));

export default function ChimeraCarousel() {
  const classes = useStyles();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [response, setResponse] = useState([]);

  function onChangeImageFile1(e) {
    setImage1(e[0]);
  }
  function onChangeImageFile2(e) {
    setImage2(e[0]);
  }
  function onChangeImageFile3(e) {
    setImage3(e[0]);
  }
  async function SubmitImage1() {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", image1);

      let res = await axios.post(`${config.host}/background/image1`, formData);
      console.log(res);
      await Swal.fire({
        icon: "success",
        text: "Image Updated Successfully!",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  async function SubmitImage2() {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", image2);

      let res = await axios.post(`${config.host}/background/image2`, formData);
      console.log(res);
      await Swal.fire({
        icon: "success",
        text: "Image Updated Successfully!",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  async function SubmitImage3() {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", image3);

      let res = await axios.post(`${config.host}/background/image3`, formData);
      console.log(res);
      await Swal.fire({
        icon: "success",
        text: "Image Updated Successfully!",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  async function callData() {
    try {
      setLoading(true);
      let res = await axios.get(`${config.host}/all/background/images`);
      console.log(res.data.image);
      setResponse(res.data.image);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    callData();
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {/* <CardSettings /> */}
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Chimera Carousel
                </h6>
              </div>
            </div>
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Image 1
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <img
                            className="shadow-2xl rounded"
                            style={{ width: "100%" }}
                            src={response.image1}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 xl:12/12 px-12 mt-12">
                        <div className="relative w-full mb-3 shadow-xl rounded">
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            dropzoneText={
                              "Drag and drop an image here or click"
                            }
                            // onChange={onChangeImageFile}
                            filesLimit={1}
                            maxFileSize={50000000}
                            onChange={onChangeImageFile1}
                          />
                        </div>
                        <div className={classes.root}>
                          <Button
                            disabled={!image1}
                            size="lg"
                            style={{
                              padding: 10,
                              paddingLeft: 100,
                              paddingRight: 100,
                              marginTop: 20,
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<UpadateIcon />}
                            onClick={SubmitImage1}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*Image2*/}
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <hr className="mt-12 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-5 mb-6 font-bold uppercase">
                      Image 2
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <img
                            className="shadow-2xl rounded"
                            style={{ width: "100%" }}
                            src={response.image2}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 xl:12/12 px-12 mt-12">
                        <div className="relative w-full mb-3 shadow-xl rounded">
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            dropzoneText={
                              <div className="checkClass">
                                <span>
                                  Drag and drop an image here or click
                                </span>
                              </div>
                            }
                            // onChange={onChangeImageFile}
                            filesLimit={1}
                            maxFileSize={50000000}
                            onChange={onChangeImageFile2}
                          />
                        </div>
                        <div className={classes.root}>
                          <Button
                            disabled={!image2}
                            size="xl"
                            style={{
                              padding: 10,
                              paddingLeft: 100,
                              paddingRight: 100,
                              marginTop: 20,
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<UpadateIcon />}
                            onClick={SubmitImage2}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*Image3*/}
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <hr className="mt-12 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-5 mb-6 font-bold uppercase">
                      Image 3
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <img
                            className="shadow-2xl rounded"
                            style={{ width: "100%" }}
                            src={response.image3}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-12/12 xl:12/12 px-12 mt-12">
                        <div className="relative w-full mb-3 shadow-xl rounded">
                          <DropzoneArea
                            acceptedFiles={["image/*"]}
                            dropzoneText={
                              "Drag and drop an image here or click"
                            }
                            // onChange={onChangeImageFile}
                            filesLimit={1}
                            maxFileSize={50000000}
                            onChange={onChangeImageFile3}
                          />
                        </div>
                        <div className={classes.root}>
                          <Button
                            disabled={!image3}
                            size="xl"
                            style={{
                              padding: 10,
                              paddingLeft: 100,
                              paddingRight: 100,
                              marginTop: 20,
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<UpadateIcon />}
                            onClick={SubmitImage3}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className="w-full lg:w-6/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}
