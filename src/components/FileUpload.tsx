import React, { useState, type Dispatch } from 'react';
import { FiCheckCircle, FiFile, FiUploadCloud } from 'react-icons/fi';
import { getAllDocs, uploadFile } from '../api';
import type { UserDoc } from './Sidebar';

const FileUpload = ({ onUploadComplete, chunking_method, chunking_mode }: { onUploadComplete: Dispatch<React.SetStateAction<UserDoc[]>>, chunking_method: string, chunking_mode: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      await uploadFile(file, chunking_method, chunking_mode)
      const docs = await getAllDocs()
      setUploadSuccess(true);
      setFile(null);
      onUploadComplete(prev => [
        ...prev,
        ...docs.data
      ])
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred while uploading the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg text-black">
      <div className="relative border-2 border-dashed border-gray-500 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx"
        />
        <div className="flex flex-col items-center">
          {file ? (
            <FiFile className="text-4xl mb-2" />
          ) : (
            <FiUploadCloud className="text-4xl mb-2" />
          )}
          <p className="text-sm">
            {file ? file.name : 'Click to upload a document'}
          </p>
          <p className="text-xs">PDF, DOC, DOCX</p>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      {uploadSuccess && (
        <div className="flex items-center text-green-400 mt-2">
          <FiCheckCircle className="mr-2" />
          <p className="text-sm">File uploaded successfully!</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-4 w-full bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};

export default FileUpload;
