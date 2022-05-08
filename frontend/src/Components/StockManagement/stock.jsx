import { useEffect, useState } from "react";
import GridFunctions from "../Common/Grid/GridFunctions";
import SiteLoading from "../Common/Siteloading/SiteLoading";
import Swal from "sweetalert2";
import { GetApiCaller, PostApiCaller } from "../../services/ApiCaller";
import { Button, Modal } from "react-bootstrap";

const Supplier = () => {
    const [isLoad, setLoad] = useState(false);
    const [strFormState, setFormState] = useState("Add");

    const [strItemName]=useState("");

    const [objStock, setStockObj] = useState({
        strItemID: "",
        strItemName: "",
        strQuantity: "",
        strBrand: "",
        strCategory:"",
        strDescription:"",
        strColor:"",
        strPrice:"",
    
    });

    const [arrStockDetails, setStockDetials] = useState([]);

    const columns = [
        {
            name: "Supplier ID",
            grow: 1,
            selector: "strItemID",
        },
        {
            name: "Supplier name",
            grow: 1,
            selector: "strItemName",
        },
        {
            name: "Email",
            grow: 1,
            selector: "strQuantity",
        },
        {
            name: "Contact",
            grow: 1,
            selector: "strBrand",
        },
        {
            name: "Address",
            grow: 1,
            selector: "strCategory",
        },
        {
            name: "NoOfItems",
            grow: 1,
            selector: "strDescription",
        },
        {
            name: "ItemNames",
            grow: 1,
            selector: "strColor",
        },
        {
            name: "ItemColor",
            grow: 1,
            selector: "strPrice",
        },
        {
            name: "Action",
            grow: 0.5,
            cell: (row) => (
                <>
                    <button
                        className="btn btn-sm btn-info m-0 p-2"
                        onClick={() => fnSelectStock(row)}
                    >
                        <i className="fas fa-edit" />
                    </button>
                </>
            )
        }
        
      ];

      useEffect(() => {
        fetchStockData();
      }, []);

      const fetchStockData = async () => {
        setLoad(true);
        const resStock = await GetApiCaller("stock/GetStock");
        setLoad(false);
        if (resStock.booStatus) {
            setStockDetials(resStock.objResponse);
        } else {
            showValidationError(false, resStock.objResponse);
        }
    };

    const fnSelectStock = (objRow) => {
        setStockObj({
            strItemID: objRow.strItemID,
            strItemName: objRow.strItemName,
            strQuantity: objRow.strQuantity,
            strBrand: objRow.strBrand,
            strCategory: objRow.strCategory,
            strDescription: objRow.strDescription,
            strColor: objRow.strColor,
            strPrice: objRow.strPrice,
          
      
        });

    setFormState("Inq");
    };

    const fnSave = async () => {

        if (objStock.strItemID === "") {
            showValidationError(false, "Please enter staff ID!");
         } 
          else if (objStock.strItemName === "") {
             showValidationError(false, "Please enter Staff name!")
        
         }
         else if(objStock.strQuantity=== ""){
             showValidationError(false, "Please enter valid email!")
    
         }else {
          
          const saveObj = {
              ...objStock,
           
              
    
          };
          setLoad(true);
          const resSave = await PostApiCaller(
              strFormState === "Add" ? "stock/SaveStock" : "stock/UpdateStock",
              saveObj
          );
    
          setLoad(false);
          if (resSave.booStatus) {
              showValidationError(true, resSave.objResponse);
              fnClear();
              fetchStockData();
          } else {
              showValidationError(false, resSave.objResponse);
          }
        }
    };

    const fnDelete = async () => {
        setLoad(true);
        const resDelete = await PostApiCaller("stock/DeleteStock", {
            strItemID: objStock.strItemID,
        });
        setLoad(false);
        if (resDelete.booStatus) {
            showValidationError(true, resDelete.objResponse);
            fnClear();
            fetchStockData();
        } else {
            showValidationError(false, resDelete.objResponse);
        }
    };

    const fnHandleOnChange = (e) => {
        e.persist();
        setStockObj((objStock) => ({
            ...objStock,
            [e.target.name]: e.target.value,
        }));
    };

    const showValidationError = (booSucess, msg) => {
        return Swal.fire({
            icon: booSucess ? "success" : "error",
            title: booSucess ? msg : "Something wrong in Student Attendance form!",
            text: !booSucess ? msg : "",
        });
    };

    const fnClear = () => {

        setStockObj({
            strItemID: "",
            strItemName: "",
            strQuantity: "",
            strBrand: "",
            strCategory:"",
            strDescription:"",
            strColor:"",
            strPrice:"",
      
        });
        setFormState("Add");
    };

    return (
        <>
            {isLoad && <SiteLoading />}
            <div className="container-fluid">
                <fieldset className="form-group mt-2 me-4">
                    <div className="row m-0 p-0 mt-1 ms-2">
                        <div className="form-floating">
                            <h4>Stock Information</h4>
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                        <label htmlFor="strGrade">StockID</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strItemID"
                                    name="strItemID"
                                    value={objStock.strItemID}
                                    onChange={(e) => fnHandleOnChange(e)}

                                />
                                <label htmlFor="strSupplierID">Stock ID</label>
                            </div>
                        </div>
                        <div className="col-md-8 m-0 p-2">
                        <label htmlFor="strGrade">Item Name</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strItemName"
                                    name="strItemName"
                                    value={objStock.strItemName}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strSupplierName">Item Name</label>
                            </div>
                        </div>
                    </div>

                    <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strGrade">Quantity</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strQuantity"
                                    name="strQuantity"
                                    value={objStock.strQuantity}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strSupplierEmail">Quantity</label>
                            </div>
                        </div>
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strSubject">Brand</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strBrand"
                                    name="strBrand"
                                    value={objStock.strBrand}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strSupplierContact">Brand</label>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strTime">Category</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strCategory"
                                    name="strCategory"
                                    value={objStock.strCategory}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strCategory">Category</label>
                            </div>
                        </div>                     
                    </div>

                    <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strTime">Item Description</label>
                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="strDescription"
                                    name="strDescription"
                                    value={objStock.strDescription}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strDescription">Item Description</label>
                            </div>
                        </div>
                        </div>

                        <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strTime">Item color</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strColor"
                                    name="strColor"
                                    value={objStock.strColor}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strColor">Item Color</label>
                            </div>
                        </div>
                        </div>

                        <div className="row m-0 p-0">
                        <div className="col-md-4 m-0 p-2">
                            <label htmlFor="strTime">Item Price</label>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="strPrice"
                                    name="strPrice"
                                    value={objStock.strPrice}
                                    onChange={(e) => fnHandleOnChange(e)}
                                    autoComplete="off"
                                />
                                <label htmlFor="strPrice">Item Price</label>
                            </div>
                        </div>
                        </div>


                    <div className="row m-0 p-0 mt-1 ms-2">
                        <div className="col-md-2 m-0 p-0 d-grid">
                            <button
                                className="btn btn-success fw-bold"
                                onClick={() => fnSave()}
                            >
                                {strFormState === "Add" ? "Save Stock" : "Update Stock"}
                            </button>
                        </div>
                        {strFormState === "Inq" && (
                            <div
                                className="col-md-2 m-0 p-0 d-grid ms-2"
                                onClick={() => fnDelete()}
                            >
                                <button className="btn btn-danger fw-bold">Delete Stock</button>
                            </div>
                        )}
                        <div className="col-md-2 m-0 p-0 d-grid ms-2">
                            <button
                                className="btn btn-secondary fw-bold"
                                onClick={() => fnClear()}
                            >
                                Clear Supplier
                            </button>
                        </div>
                    </div>
                    <div className="row m-0 p-0 col-md-12">
                        <div className="col-md-12 m-0">
                            <GridFunctions
                                title="Stock Details"
                                columns={columns}
                                dataSet={arrStockDetails}
                                strHeight={"24vh"}
                            />
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    );
};


export default Supplier;




