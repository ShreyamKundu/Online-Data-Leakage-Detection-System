import { useState, useEffect, ChangeEvent } from 'react';
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
  _id: number;
  filename: string;
  uploadDate: string;
  fileSize: string; 
}

interface AccessLog {
  id: number;
  action: string;
  timestamp: string;
  user: string;
}

// Mock access logs
const mockAccessLogs: AccessLog[] = [
  { id: 1, action: 'View', timestamp: '2023-11-07T15:30:00Z', user: 'john@example.com' },
  { id: 2, action: 'Download', timestamp: '2023-11-07T16:00:00Z', user: 'jane@example.com' },
  { id: 3, action: 'Share', timestamp: '2023-11-07T16:30:00Z', user: 'admin@example.com' },
];

export default function FilesPage() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CustomFile | null>(null);
  const [newFile, setNewFile] = useState<CustomFile | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  // Fetch files from the server
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (userId) {
          console.log('Fetching files for user:', userId);
          const response = await axiosInstance.get(`/api/files/user-files/${userId}`); // Endpoint to fetch files
          console.log('Files:', response.data);
          setFiles(response.data);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  // Handle file selection
  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile({
        _id: files.length + 1,
        filename: file.name,
        uploadDate: new Date().toISOString(),
        fileSize: `${file.size}`,
      });
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (newFile) {
      const formData = new FormData();
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      const file = fileInput?.files?.[0];

      if (file) {
        formData.append('file', file);
        if (userId) {
          formData.append('userId', userId);
        }

        try {
          const response = await axiosInstance.post('/api/files/upload', formData);
          const uploadedFile = response.data;
          setFiles([uploadedFile, ...files]);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
  };

  // Format date string to local format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

    // Handle copy link functionality
    const handleCopyLink = (file: CustomFile) => {
      const fileLink = `https://dataguard-shreyam-kundus-projects.vercel.app/download/${file._id}`; // Construct the URL for the file
      navigator.clipboard.writeText(fileLink).then(() => {
        alert('Link copied to clipboard!');
      }).catch((err) => {
        console.error('Failed to copy the link: ', err);
      });
    };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Files</h1>

      <div className="mb-6">
        <input
          type="file"
          className="file-input w-full max-w-xs"
          onChange={handleFileSelection}
          id="file-upload"
        />

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
              <TableRow key={file._id}>
                <TableCell className="font-medium">{file.filename}</TableCell>
                <TableCell>{formatDate(file.uploadDate)}</TableCell>
                <TableCell>{file.fileSize}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyLink(file)} 
                    >
                      <LinkIcon className="h-4 w-4 mr-1" /> Copy Link
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(file)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>File Details: {selectedFile?.filename}</DialogTitle>
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

