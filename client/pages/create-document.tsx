import { useState } from 'react';

export default function CreateDocument() {
  const [fields, setFields] = useState<Field[]>([]);
  const [openFieldBox, setOpenFieldBox] = useState<boolean>(false);

  const addField = (field: Field) => {
    setFields([...fields, field]);
    setOpenFieldBox(false);
  };


  return (
  <div className='my-6'>
    {/* Top left Text */}
    <div className="flex flex-col justify-center items-start">
      <h1 className="text-3xl font-bold text-gray-900">Create a new document</h1>
    </div>

    <div className="flex justify-center my-4">
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Name</div>
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Type</div>
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">Field Value</div>
    </div>

    {/* Field Box */}
    {openFieldBox && (
      <div className="flex justify-center my-4">
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="field-name"
            type="text"
            placeholder="Field Name"
          />
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="field-type"
          >
            <option value={FieldType.String}>String</option>
            <option value={FieldType.Number}>Number</option>
            <option value={FieldType.Boolean}>Boolean</option>
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
    {/* Fields */}
    {fields.map((field) => (
      <div className="flex justify-center my-4">
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.fieldName}</div>
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.type}</div>
        <div className="w-full md:w-1/3 p-4 text-lg font-semibold">{field.value}</div>
      </div>
    ))}
    {/* Plus Button to add field */}
    <div className="flex justify-center my-4">
      <div className="w-full md:w-1/3 p-4 text-lg font-semibold">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpenFieldBox(true)}
        >
          Add Field
        </button>
      </div>
    </div>
  </div>
  );
}



interface Field {
  fieldName: string
  type: string
  value: string
}

enum FieldType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
}