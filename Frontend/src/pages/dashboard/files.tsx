import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Link as LinkIcon, Eye } from "lucide-react";

interface FileItem {
  id: number;
  name: string;
  uploadedAt: string;
  size: string;
}

interface AccessLog {
  id: number;
  action: string;
  timestamp: string;
  user: string;
}

const mockFiles: FileItem[] = [
  { id: 1, name: "financial_report_2023.pdf", uploadedAt: "2023-11-07T14:30:00Z", size: "2.5 MB" },
  { id: 2, name: "customer_data.xlsx", uploadedAt: "2023-11-06T09:15:00Z", size: "1.8 MB" },
  { id: 3, name: "project_proposal.docx", uploadedAt: "2023-11-05T16:45:00Z", size: "500 KB" },
];

const mockAccessLogs: AccessLog[] = [
  { id: 1, action: "View", timestamp: "2023-11-07T15:30:00Z", user: "john@example.com" },
  { id: 2, action: "Download", timestamp: "2023-11-07T16:00:00Z", user: "jane@example.com" },
  { id: 3, action: "Share", timestamp: "2023-11-07T16:30:00Z", user: "admin@example.com" },
];

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    if (!inputFiles || inputFiles.length === 0) return;

    const file = inputFiles[0];
    const newFile: FileItem = {
      id: files.length + 1,
      name: file.name,
      uploadedAt: new Date().toISOString(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    };

    setFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Files</h1>

      <div className="mb-6">
        <Input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button asChild>
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </label>
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
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Copy link logic here
                        alert("Link copied to clipboard!");
                      }}
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
                      {selectedFile && selectedFile.id === file.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>File Details: {selectedFile.name}</DialogTitle>
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
                      )}
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
