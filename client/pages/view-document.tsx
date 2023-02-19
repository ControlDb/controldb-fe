import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDocumentInfo } from './api/middlewareApi';
import Header from '@/components/header';

export default function ViewDocument() {
  const router = useRouter();
  const [documentInfo, setDocumentInfo] = useState<any>([]);

  const user = router.query.user;
  const document = router.query.document;

  const viewDocument = () => {
    router.push({
      pathname: `/users/${user}`,
      query: {user: user}
    })
  }

  useEffect(() => {
    const getDocument = async () => {
      const res = await getDocumentInfo(document);
      console.log('document info: ', res);
      setDocumentInfo(res);
    };
    getDocument();
  }, [document]);

  return (
    <>
      <Header user={user} />
      <div className='justify-center flex items-center'>
        <div className='content-center'>
          <h1 className='text-6xl font-bold my-6'>Data Info</h1>
        </div>
      </div>
      <div className='w-full ml-4'>
        <div>
        <table className='table-auto'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Document Name</th>
              <th className='px-4 py-2'>Document Type</th>
              <th className='px-4 py-2'>Document Description</th>
            </tr>
          </thead>
          <tbody>
            {documentInfo.map((info: any) => (
              // if info is not null, display the info
              info && (
              <tr key={info.id}>
                <td className='border px-4 py-2'>{info.fieldName}</td>
                <td className='border px-4 py-2'>{info.type}</td>
                <td className='border px-4 py-2'>{info.value}</td>
              </tr>
              )
            ))}
          
          </tbody>
        </table>
        </div>
      </div>
      {/* Button to  view document */}
      <div className='flex justify-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-6'
          onClick={viewDocument}
        >
          View My Other Data
        </button>
        </div>
    </>
  );
}
