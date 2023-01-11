import './homepage.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import MaterialTable from '@material-table/core';
import tableIcons from "./MaterialTableIcons";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Homepage() {

    const [collections, setCollections] = useState([]); 
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [itemProperties, setItemProperties] = useState([]);
    const [itemValues, setItemValues] = useState([]);

    useEffect(()=>{
        
        axios.get('https://reqres.in/api/products')
        .then((res)=> {
            setCollections(res.data.data);
        }
        )
        document.querySelector("input").type = "number";
        }, [])

    const tableHeaders = [
        {
          field: 'id',
          title: 'ID',
        },
        {
          field: 'name',
          title: 'Name',
          searchable: false,
        },
        {
          field: 'year',
          title: 'Year',
          searchable: false,
        },
    ]
    let tableBody = []
    let row;

    collections.forEach((collection) => {
        row = { id: collection.id, name: collection.name, year: collection.year };
        tableBody = [...tableBody, row];
    })

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false) ; setItemProperties([]) ; setItemValues([])};

    function handleOnClick (row){
      setModalTitle(`Full data of the item with ID: ${row.id}`)
      let item = collections.find(collection => collection.id === row.id)
      // setItemProperties(item)
      setItemProperties(Object.getOwnPropertyNames(item))
      setItemValues(Object.values(item))
      handleOpen();
    }
    function createProperties () {
      if (itemProperties){
        return(
          <>
          {itemProperties.map((property, index) => (<p key={property}>{property} : {itemValues[index]}</p>))}
          </>
        )
        
      }else return null
    }

    return (
      <>
      <MaterialTable
        columns={tableHeaders}
        icons={tableIcons}
        data={tableBody}
        options={{
          showTitle: false,
          showFirstLastPageButtons: false,
          pageSizeOptions: [],
          rowStyle: (rowData) =>{
            return {
              backgroundColor: collections.find(collection => collection.id === rowData.id).color ?? "#fff",
            }
          }
        }}
        onRowClick= {(event, rowData) => handleOnClick(rowData)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          {createProperties()}
        </Box>
      </Modal>

    </>
    );

}

export default Homepage;