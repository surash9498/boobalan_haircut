import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AUDIT_HISTORY } from '../constants/apiConstants'

function Audit() {
    const columns = [

        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'mobileNumber',
            headerName: 'Mobile Number',
            width: 250,
            editable: true,
        },
        {
            field: 'serviceDate',
            headerName: 'Service Date',
            width: 250,
            editable: true,
            type: "date"
        },
        {
            field: 'Total',
            headerName: 'Total',
            type: 'number',
            width: 250,
            editable: true,
        },
        {
            field: 'Service',
            headerName: 'Service',

            width: 250,
            editable: true,

        },
    ];
    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get(AUDIT_HISTORY).then(({ data }) => {
            data.forEach((el) => {
                let result = el.serviceType.reduce((acc, value) => (acc + ", " + value.type), "")
                console.log(result)
            })
            let temp = [];
            data.forEach((element, index) => {
                temp.push({
                    id: index + 1,
                    mobileNumber: element.mobileNumber,
                    serviceDate: element.serviceDate.split("T")[0],
                    Total: element.invoice.total,
                    Service: element.serviceType.reduce((acc, value) => (acc + " " + value.type), "")

                })

            }
            );
            setRows(() => ([...temp]))

        })


        // {
        //     "invoice": {
        //         "tax": 27,
        //         "total": 177
        //     },
        //     "_id": "63a6cc37fb909be1b3037f9e",
        //     "mobileNumber": 967546789,
        //     "serviceDate": "2022-12-24T00:00:00.000Z",
        //     "serviceBy": "Boobalan",
        //     "serviceType": [
        //         {
        //             "type": "HAIRCUT",
        //             "price": 150,
        //             "_id": "63a6cc37fb909be1b3037f9f"
        //         }
        //     ],
        //     "__v": 0
        // }
    }, [])
    useEffect(() => {
        console.log(rows)
    }, [rows])
    return (<div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[100]}
            checkboxSelection
            disableSelectionOnClick
        />
    </div>

    )
}

export default Audit