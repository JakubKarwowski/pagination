import './homepage.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import tableIcons from "./MaterialTableIcons";

function Homepage() {

    const [collections, setCollections] = useState([]); 

    useEffect(()=>{
        
        axios.get('https://reqres.in/api/products')
        .then((res)=> {
            setCollections(res.data.data);
            console.log(res.data.data)
        }
        )
        }, [])

    const tableHeaders = [
        {
          dataField: 'id',
          text: 'ID'
        },
        {
          dataField: 'name',
          text: 'Name'
        },
        {
          dataField: 'year',
          text: 'Year'
        },
    ]
    let tableBody = []
    let row;

    collections.forEach((collection) => {
        row = { id: collection.id, name: collection.name, year: collection.year };
        tableBody = [...tableBody, row];
    })

    return (
    <MaterialTable
    columns={[
      { title: 'Adı', field: 'name' },
      { title: 'Soyadı', field: 'surname' },
      { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
    ]}
    icons={tableIcons}
    // data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
    // title="Demo Title"
  />);

}

export default Homepage;