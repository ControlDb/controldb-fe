import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { useRouter, withRouter } from "next/router"


export default function CreateDocument() {
  const [fields, setFields] = useState<Field[]>([]);
  const [openFieldBox, setOpenFieldBox] = useState<boolean>(false);
  const router = useRouter()
  const user = router.query.user

  const addField = (field: Field) => {
    // check if field name already exists
    const fieldExists = fields.find((f) => f.fieldName === field.fieldName);
    if (fieldExists) {
      alert('Field name already exists');
      return;
    }
    // check if fields are empty
    if (field.fieldName === '' || field.type === '' || field.value === '') {
      alert('Fields cannot be empty');
      return;
    }
    // 
    setFields([...fields, field]);
    setOpenFieldBox(false);
  };
  
  const setPermission = () => {
    // check if fields are empty
    if (fields.length === 0) {
      alert('Fields cannot be empty');
      return;
    }
    // Set localStorage to store fields
    localStorage.setItem('fields', JSON.stringify(fields))

    router.push({
      pathname: '/set-permission',
      query: { user: user },
    })
  }

  return (
    <>
      <Header user={user}/>
      <div className='my-6 mx-auto max-w-7xl px-6'>
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-3xl font-bold text-gray-900">Create a new File and Upload to IPFS</h1>
        <p className='test-gray my-2'>
          Long storage, Fast retrieval without code on IPFS with ControlDB
        </p>
      </div>

    <div className="flex justify-center my-4 bg:gray ">
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Name</div>
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Type</div>
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Value</div>
    </div>

      {/* Fields */}
    {fields.map((field) => (
      <div className="flex justify-center my-4">
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.fieldName}</div>
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.type}</div>
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.value}</div>
      </div>
    ))}

    {/* Field Box */}
    {openFieldBox && (
      <div className="flex justify-center my-4">
        <div className="w-full md:w-1/4 p-4 text-lg font-semibold">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="field-name"
            type="text"
            placeholder="Field Name"
          />
        </div>

        <div className='w-full md:w-1/4 text-lg font-semibold mt-4'>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="field-type"
        >
          <option value={FieldType.String}>String</option>
        </select>
        </div>


        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="field-value"
            type="text"
            placeholder="Field Value"
          />

        </div>
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const fieldName = document.getElementById('field-name') as HTMLInputElement;
              const fieldType = document.getElementById('field-type') as HTMLSelectElement;
              const fieldValue = document.getElementById('field-value') as HTMLInputElement;
              addField({
                fieldName: fieldName.value,
                type: fieldType.value,
                value: fieldValue.value,
              });
            }}
          >
            Add Field
          </button>
        </div>
        </div>
    )}

    {/* Plus Button to add field */}
    {!openFieldBox && (   
       <div className="flex justify-center my-4">
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenFieldBox(true)}
        >
          Add Field
        </button>
      </div>
    </div>)}
  </div>
  <div className="flex justify-center my-4">
    <div className="w-full md:w-1/3 p-4 text-lg font-semibold my-20">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setPermission()}
      >
        Set Permission
      </button>
    </div>
  </div>
     
  </>
  );
}



interface Field {
  fieldName: string
  type: string
  value: string
}

enum FieldType {
  String = 'String',
  // Number = 'Number',
  // Boolean = 'Boolean',
}