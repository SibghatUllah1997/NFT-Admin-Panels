import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import Web3 from "web3";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import Loader2 from "../../components/Loader/Loader2";

const MPContract = require("../../contracts/MarketplaceSettings.json");

// components
let MP, web3, accounts;

export default function CommissionFee() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [primaryFee, setPrimaryFee] = useState("");
  const [secondaryFee, setSecondaryFee] = useState("");
  const [notValidPrimaryFee, setNotPrimaryValidFee] = useState(false);
  const [notValidSecondaryFee, setNotSecondaryValidFee] = useState(false);

  function onChangePrimaryFee(e) {
    setNotPrimaryValidFee(false);
    let value = e.target.value;
    if (/[^0-9]+/.test(value)) {
      value = value.replace(/[^0-9]*/g, "");
    } else if (value > 99 || value < 0) {
      setNotPrimaryValidFee(true);
      setPrimaryFee("");
    } else {
      setPrimaryFee(value);
    }
  }
  function onChangeSecondaryFee(e) {
    setNotSecondaryValidFee(false);
    let value = e.target.value;
    if (/[^0-9]+/.test(value)) {
      value = value.replace(/[^0-9]*/g, "");
    } else if (value > 99 || value < 0) {
      setNotSecondaryValidFee(true);
      setSecondaryFee("");
    } else {
      setSecondaryFee(value);
    }
  }
  async function submitPrimaryFee(e) {
    setLoading(true);
    e.preventDefault();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      MP = await new web3.eth.Contract(
        MPContract.abi,
        config.MarketPlaceSettings
      );

      try {
        let res = await MP.methods
          .setERC721ContractPrimarySaleFeePercentage(config.Chimera, primaryFee)
          .send({ from: accounts[0] });
        console.log(res);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoading(false);
        console.log(error);
      }
    }
  }
  async function submitSecondaryFee(e) {
    setLoading2(true);
    e.preventDefault();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      MP = await new web3.eth.Contract(
        MPContract.abi,
        config.MarketPlaceSettings
      );

      try {
        let res = await MP.methods
          .setERC721ContractPrimarySaleFeePercentage(
            config.Chimera,
            secondaryFee
          )
          .send({ from: accounts[0] });
        console.log(res);
        setLoading2(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoading2(false);
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          {/* <CardSettings /> */}
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Commission Fee
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Set Fee
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-12">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Primary Fee
                      </label>
                      <input
                        onChange={onChangePrimaryFee}
                        value={primaryFee}
                        type="number"
                        className="border-0 uppercase px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // defaultValue={ownerData.name}
                      />
                      {notValidPrimaryFee ? (
                        <>
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "10px",
                            }}
                          >
                            * Fee should be greater than 0 and less than 100
                          </p>
                        </>
                      ) : null}
                      {loading ? (
                        <>
                          <Loader2 />
                        </>
                      ) : (
                        <>
                          {!primaryFee ? (
                            <>
                              <button
                                disabled
                                // class=" mt-5 bg-black hover:bg-black-700 text-white font-bold py-2 px-12 rounded"
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  borderRadius: "5px",
                                  fontWeight: "bold",
                                  cursor: "not-allowed",
                                }}
                                className="py-2 mt-5 px-12"
                              >
                                Set
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                // class=" mt-5 bg-black hover:bg-black-700 text-white font-bold py-2 px-12 rounded"
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  borderRadius: "5px",
                                  fontWeight: "bold",
                                }}
                                onClick={submitPrimaryFee}
                                className="py-2 mt-5 px-12"
                              >
                                Set
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Secondary Fee
                      </label>
                      <input
                        onChange={onChangeSecondaryFee}
                        value={secondaryFee}
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />

                      {notValidSecondaryFee ? (
                        <>
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "10px",
                            }}
                          >
                            * Fee should be greater than 0 and less than 100
                          </p>
                        </>
                      ) : null}
                      {loading2 ? (
                        <>
                          <Loader2 />
                        </>
                      ) : (
                        <>
                          {!secondaryFee ? (
                            <>
                              <button
                                disabled
                                // class=" mt-5 bg-black hover:bg-black-700 text-white font-bold py-2 px-12 rounded"
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  borderRadius: "5px",
                                  fontWeight: "bold",
                                  cursor: "not-allowed",
                                }}
                                className="py-2 mt-5 px-12"
                              >
                                Set
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={submitSecondaryFee}
                                // class=" mt-5 bg-black hover:bg-black-700 text-white font-bold py-2 px-12 rounded"
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  borderRadius: "5px",
                                  fontWeight: "bold",
                                }}
                                className="py-2 mt-5 px-12"
                              >
                                Set
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
