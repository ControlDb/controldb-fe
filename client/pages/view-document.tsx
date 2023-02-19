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
      <div className='my-6 mx-auto max-w-7xl px-6'>
      <div className="flex flex-col justify-center items-start">
        <h1 className="text-3xl font-bold text-gray-900">View Your File uploaded on IPFS</h1>
        <p className='test-gray my-2'>Your File has been uploaded through our infrastructure and stored on the place you know where it will last for loooong time - IPFS. </p>
      </div>
      </div>
      <div className='w-full ml-28 my-8'>
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
