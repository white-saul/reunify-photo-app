
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  overlayEffect?: 'mirror';
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect, overlayEffect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setFileName(file.name);
        onFileSelect(file);
      } else {
        alert('Please select an image file.');
        onFileSelect(null);
      }
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onFileSelect(file);
    }
  }, [onFileSelect]);
  

  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="font-semibold text-gray-700 dark:text-gray-300">{label}</span>
      <label 
        htmlFor={`file-upload-${label}`} 
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-[#F4F5FA] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors p-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
            {overlayEffect === 'mirror' && (
                <div className="absolute inset-0 rounded-lg pointer-events-none ring-1 ring-inset ring-white/20 overflow-hidden">
                    <div className="absolute -top-1/4 left-[10%] h-[150%] w-[15%] bg-white/20 -rotate-[30deg] blur-md opacity-70"></div>
                </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadIcon />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or WEBP</p>
          </div>
        )}
        <input 
            ref={fileInputRef} 
            id={`file-upload-${label}`} 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept="image/png, image/jpeg, image/webp"
        />
      </label>
      {fileName && <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full px-2 text-center">{fileName}</p>}
    </div>
  );
};

export default FileUpload;
