// import { useState, ChangeEvent } from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Upload, Link as LinkIcon, Eye } from 'lucide-react'

// // Define types for file and access log data
// interface CustomFile {
//   id: number
//   name: string
//   uploadedAt: string
//   size: number // Size in bytes for easier conversion
// }

// interface AccessLog {
//   id: number
//   action: string
//   timestamp: string
//   user: string
// }

// // Mock data for demonstration
// const mockFiles: CustomFile[] = [
//   { id: 1, name: 'financial_report_2023.pdf', uploadedAt: '2023-11-07T14:30:00Z', size: 2621440 },
//   { id: 2, name: 'customer_data.xlsx', uploadedAt: '2023-11-06T09:15:00Z', size: 1887436 },
//   { id: 3, name: 'project_proposal.docx', uploadedAt: '2023-11-05T16:45:00Z', size: 512000 },
// ]

// const mockAccessLogs: AccessLog[] = [
//   { id: 1, action: 'View', timestamp: '2023-11-07T15:30:00Z', user: 'john@example.com' },
//   { id: 2, action: 'Download', timestamp: '2023-11-07T16:00:00Z', user: 'jane@example.com' },
//   { id: 3, action: 'Share', timestamp: '2023-11-07T16:30:00Z', user: 'admin@example.com' },
// ]

// export default function FilesPage() {
//   const [files, setFiles] = useState<CustomFile[]>(mockFiles)
//   const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null)
//   const [newFile, setNewFile] = useState<CustomFile | null>(null)

//   // Handle file selection
//   const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       setNewFile({
//         id: files.length + 1,
//         name: file.name,
//         uploadedAt: new Date().toISOString(),
//         size: file.size,  // Store size in bytes for easier conversion
//       })
//       console.log('Selected file:', file.name) // Log selected file name
//     }
//   }

//   // Handle file upload
//   const handleFileUpload = () => {
//     if (newFile) {
//       setFiles([newFile, ...files])
//       setFiles([newFile, ...files])
//       console.log('File uploaded:', newFile.name) // Log uploaded file name
//     } else {
//       console.log('No file selected for upload')
//     }
//   }

//   // Format date string to local format
//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleString()
//   }

//   // Function to format the size in a human-readable format
//   const formatFileSize = (sizeInBytes: number): string => {
//     const units = ['Bytes', 'KB', 'MB', 'GB', 'TB']
//     let i = 0
//     let size = sizeInBytes

//     while (size >= 1024 && i < units.length - 1) {
//       size /= 1024
//       i++
//     }

//     return `${size.toFixed(2)} ${units[i]}`
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Your Files</h1>

//       <div className="mb-6">
//         {/* Direct file input with custom class */}
//         <input
//           type="file"
//           className="file-input w-full max-w-xs"
//           onChange={handleFileSelection}
//           id="file-upload"
//         />

//         {/* Upload button */}
//         <Button variant="outline" onClick={handleFileUpload} className="mt-4">
//           <Upload className="mr-2 h-4 w-4" /> Upload File
//         </Button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>File Name</TableHead>
//               <TableHead>Uploaded At</TableHead>
//               <TableHead>Size</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {files.map((file) => (
//               <TableRow key={file.id}>
//                 <TableCell className="font-medium">{file.name}</TableCell>
//                 <TableCell>{formatDate(file.uploadedAt)}</TableCell>
//                 <TableCell>{formatFileSize(file.size)}</TableCell>  {/* Display file size */}
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" onClick={() => {
//                       // Copy link logic here
//                       alert('Link copied to clipboard!')
//                     }}>
//                       <LinkIcon className="h-4 w-4 mr-1" /> Copy Link
//                     </Button>
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm" onClick={() => setSelectedFile(file)}>
//                           <Eye className="h-4 w-4 mr-1" /> View Details
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>File Details: {selectedFile?.name}</DialogTitle>
//                         </DialogHeader>
//                         <div className="mt-4">
//                           <h3 className="text-lg font-semibold mb-2">Access Logs</h3>
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Action</TableHead>
//                                 <TableHead>Timestamp</TableHead>
//                                 <TableHead>User</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {mockAccessLogs.map((log) => (
//                                 <TableRow key={log.id}>
//                                   <TableCell>{log.action}</TableCell>
//                                   <TableCell>{formatDate(log.timestamp)}</TableCell>
//                                   <TableCell>{log.user}</TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }


// import { useState, ChangeEvent } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Upload, Link as LinkIcon, Eye } from 'lucide-react';
// import axiosInstance from '@/utils/axiosInstance';
// import { useUser } from '@clerk/clerk-react';

// // Define types for file and access log data
// interface CustomFile {
//   id: number;
//   name: string;
//   uploadedAt: string;
//   size: number; // Size in bytes for easier conversion
// }

// interface AccessLog {
//   id: number;
//   action: string;
//   timestamp: string;
//   user: string;
// }


// // Mock data for demonstration
// const mockFiles: CustomFile[] = [
//   { id: 1, name: 'financial_report_2023.pdf', uploadedAt: '2023-11-07T14:30:00Z', size: 2621440 },
//   { id: 2, name: 'customer_data.xlsx', uploadedAt: '2023-11-06T09:15:00Z', size: 1887436 },
//   { id: 3, name: 'project_proposal.docx', uploadedAt: '2023-11-05T16:45:00Z', size: 512000 },
// ];

// const mockAccessLogs: AccessLog[] = [
//   { id: 1, action: 'View', timestamp: '2023-11-07T15:30:00Z', user: 'john@example.com' },
//   { id: 2, action: 'Download', timestamp: '2023-11-07T16:00:00Z', user: 'jane@example.com' },
//   { id: 3, action: 'Share', timestamp: '2023-11-07T16:30:00Z', user: 'admin@example.com' },
// ];

// export default function FilesPage() {
//   const [files, setFiles] = useState<CustomFile[]>(mockFiles);
//   const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
//   const [newFile, setNewFile] = useState<CustomFile | null>(null);
//   const {user}=useUser();
//   const userId=user?.id;

//   // Handle file selection
//   const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setNewFile({
//         id: files.length + 1,
//         name: file.name,
//         uploadedAt: new Date().toISOString(),
//         size: file.size, // Store size in bytes for easier conversion
//       });
//       console.log('Selected file:', file.name); // Log selected file name
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async () => {
//     if (newFile) {
//       const formData = new FormData();
//       formData.append('file', newFile as any); // Append the file to FormData
//       if (userId) {
//         formData.append('userId', userId);  // Include userId in the form data
//       }


//       try {
//         // Sending the POST request using axiosInstance
//         const response = await axiosInstance.post('/api/files/upload', formData);
//         console.log('File uploaded:', newFile.name); // Log uploaded file name

//         // Assuming response.data contains the uploaded file details
//         const uploadedFile = response.data;
//         setFiles([uploadedFile, ...files]); // Add the uploaded file to the files list
//       } catch (error) {
//         console.error('Error uploading file', error);
//       }
//     } else {
//       console.log('No file selected for upload');
//     }
//   };

//   // Format date string to local format
//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleString();
//   };

//   // Function to format the size in a human-readable format
//   const formatFileSize = (sizeInBytes: number): string => {
//     const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     let i = 0;
//     let size = sizeInBytes;

//     while (size >= 1024 && i < units.length - 1) {
//       size /= 1024;
//       i++;
//     }

//     return `${size.toFixed(2)} ${units[i]}`;
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Your Files</h1>

//       <div className="mb-6">
//         {/* Direct file input with custom class */}
//         <input
//           type="file"
//           className="file-input w-full max-w-xs"
//           onChange={handleFileSelection}
//           id="file-upload"
//         />

//         {/* Upload button */}
//         <Button variant="outline" onClick={handleFileUpload} className="mt-4">
//           <Upload className="mr-2 h-4 w-4" /> Upload File
//         </Button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>File Name</TableHead>
//               <TableHead>Uploaded At</TableHead>
//               <TableHead>Size</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {files.map((file) => (
//               <TableRow key={file.id}>
//                 <TableCell className="font-medium">{file.name}</TableCell>
//                 <TableCell>{formatDate(file.uploadedAt)}</TableCell>
//                 <TableCell>{formatFileSize(file.size)}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" onClick={() => {
//                       // Copy link logic here
//                       alert('Link copied to clipboard!');
//                     }}>
//                       <LinkIcon className="h-4 w-4 mr-1" /> Copy Link
//                     </Button>
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm" onClick={() => setSelectedFile(file)}>
//                           <Eye className="h-4 w-4 mr-1" /> View Details
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>File Details: {selectedFile?.name}</DialogTitle>
//                         </DialogHeader>
//                         <div className="mt-4">
//                           <h3 className="text-lg font-semibold mb-2">Access Logs</h3>
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Action</TableHead>
//                                 <TableHead>Timestamp</TableHead>
//                                 <TableHead>User</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {mockAccessLogs.map((log) => (
//                                 <TableRow key={log.id}>
//                                   <TableCell>{log.action}</TableCell>
//                                   <TableCell>{formatDate(log.timestamp)}</TableCell>
//                                   <TableCell>{log.user}</TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Link as LinkIcon, Eye } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useUser } from '@clerk/clerk-react';

// Define types for file and access log data
interface CustomFile {
  id: number;
  name: string;
  uploadedAt: string;
  size: number; // Size in bytes for easier conversion
}

interface AccessLog {
  id: number;
  action: string;
  timestamp: string;
  user: string;
}

// Mock data for demonstration
const mockFiles: CustomFile[] = [
  { id: 1, name: 'financial_report_2023.pdf', uploadedAt: '2023-11-07T14:30:00Z', size: 2621440 },
  { id: 2, name: 'customer_data.xlsx', uploadedAt: '2023-11-06T09:15:00Z', size: 1887436 },
  { id: 3, name: 'project_proposal.docx', uploadedAt: '2023-11-05T16:45:00Z', size: 512000 },
];

const mockAccessLogs: AccessLog[] = [
  { id: 1, action: 'View', timestamp: '2023-11-07T15:30:00Z', user: 'john@example.com' },
  { id: 2, action: 'Download', timestamp: '2023-11-07T16:00:00Z', user: 'jane@example.com' },
  { id: 3, action: 'Share', timestamp: '2023-11-07T16:30:00Z', user: 'admin@example.com' },
];

export default function FilesPage() {
  const [files, setFiles] = useState<CustomFile[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
  const [newFile, setNewFile] = useState<CustomFile | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  // Handle file selection
  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile({
        id: files.length + 1,
        name: file.name,
        uploadedAt: new Date().toISOString(),
        size: file.size, // Store size in bytes for easier conversion
      });
      console.log('Selected file:', file.name); // Log selected file name
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (newFile) {
      const formData = new FormData();
      
      // Instead of appending newFile, append the file directly
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      
      if (file) {
        formData.append('file', file);  // Append the file from input
        if (userId) {
          formData.append('userId', userId);  // Include userId in the form data
        }

        try {
          // Sending the POST request using axiosInstance
          const response = await axiosInstance.post('/api/files/upload', formData);
          console.log('File uploaded:', file.name); // Log uploaded file name

          // Assuming response.data contains the uploaded file details
          const uploadedFile = response.data;
          setFiles([uploadedFile, ...files]); // Add the uploaded file to the files list
        } catch (error) {
          console.error('Error uploading file', error);
        }
      } else {
        console.log('No file selected for upload');
      }
    }
  };

  // Format date string to local format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  // Function to format the size in a human-readable format
  const formatFileSize = (sizeInBytes: number): string => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let size = sizeInBytes;

    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }

    return `${size.toFixed(2)} ${units[i]}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Files</h1>

      <div className="mb-6">
        {/* Direct file input with custom class */}
        <input
          type="file"
          className="file-input w-full max-w-xs"
          onChange={handleFileSelection}
          id="file-upload"
        />

        {/* Upload button */}
        <Button variant="outline" onClick={handleFileUpload} className="mt-4">
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      // Copy link logic here
                      alert('Link copied to clipboard!');
                    }}>
                      <LinkIcon className="h-4 w-4 mr-1" /> Copy Link
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedFile(file)}>
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>File Details: {selectedFile?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">Access Logs</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Action</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>User</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockAccessLogs.map((log) => (
                                <TableRow key={log.id}>
                                  <TableCell>{log.action}</TableCell>
                                  <TableCell>{formatDate(log.timestamp)}</TableCell>
                                  <TableCell>{log.user}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
