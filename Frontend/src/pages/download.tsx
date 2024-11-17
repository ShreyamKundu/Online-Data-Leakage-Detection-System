import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/utils/axiosInstance"
import { Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function FileDetailsPage() {
  const [fileInfo, setFileInfo] = useState<any>(null);
  const { fileId } = useParams<{ fileId: string }>();
 
  useEffect(() => {
    // Fetch file details based on the fileId
    const fetchFileDetails = async () => {
      if (fileId) {
        try {
          const response = await axiosInstance.get(`/api/files/filename/${fileId}`);
          console.log("File details:", response.data);
          setFileInfo(response?.data?.file);
        } catch (error) {
          console.error("Error fetching file details:", error);
        }
      }
    };

    fetchFileDetails();
  }, [fileId]);


  const handleDownload = async () => {
    if (fileInfo) {
      try {
  
        // Trigger file download directly by calling the existing server route
        const downloadResponse = await axiosInstance.get(`/api/files/download/${fileId}`, {
          responseType: 'blob', // Ensure the response is handled as a file (blob)
        });
  
        // Create a link to trigger the file download
        const blob = new Blob([downloadResponse.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileInfo.filename; // Set the filename from the fileInfo
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error during file download:", error);
      }
    }
  };
  

  // Handle case where fileInfo is still null (loading or error state)
  if (!fileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">File Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">File Name</p>
            <p className="text-lg font-semibold text-gray-700">{fileInfo.filename}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Upload Date</p>
            <p className="text-lg text-gray-700">{new Date(fileInfo.uploadDate).toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">File Size</p>
            <p className="text-lg text-gray-700">{fileInfo.size}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleDownload} className="w-full bg-gray-800 hover:bg-gray-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download File
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
