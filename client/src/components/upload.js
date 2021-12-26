import { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import CreateUpload from './upload/createUpload';
import { getDocs } from './data';
import DeleteUpload from './upload/deleteUpload';


const Upload = () => {
    const [files, setFiles] = useState([])

    useEffect(() => {
        getDocs().then(data => setFiles(data))
    }, [])

    return (
        <>
            <div className="d-flex justify-content-end">
                <DeleteUpload />
                <CreateUpload />
            </div>
            <TopSearch files={files}/>
        </>
    )
}

function TopSearch ({ files }) {
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'id_doc',
                width: 50,
                attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
                },
            },
            {
                label: 'Title',
                field: 'title',
                width: 270,
            },
            {
                label: 'User',
                field: 'profile',
                width: 270,
            },
            {
                label: 'Url',
                field: 'url',
                sort: 'disabled',
                width: 150,
            },
        ],
        rows: files
    }

    return (
        <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            searchTop
            searchBottom={false}
        />
    )
}

export default Upload;