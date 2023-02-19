import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDocumentInfo } from './api/middlewareApi';
import Header from '@/components/header';

export default function ViewDocument() {
  const router = useRouter();
  const [documentInfo, setDocumentInfo] = useState<any>([]);

  const user = router.query.user;
  const document = router.query.document;

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
          <h1 className='text-6xl font-bold my-6'>Document Info</h1>
        </div>
      </div>
      <div className='max-w-4xl mx-auto'>
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
              <tr key={info.id}>
                <td className='border px-4 py-2'>{info.fieldName}</td>
                <td className='border px-4 py-2'>{info.type}</td>
                <td className='border px-4 py-2'>{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
