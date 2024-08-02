import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";

const LinkCard = ({ urls, fetchUrls }) => {
  const shortUrl = `https://vhh.com/${
    urls?.custom_url ? urls?.custom_url : urls?.short_url
  }`;
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };
  const handleDownload = () => {
    const fileName = urls?.title;
    const fileUrl = urls?.qr;

    const anchorElement = document.createElement("a");
    anchorElement.href = fileUrl;
    anchorElement.download = fileName;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    // anchorElement.download()
    document.body.removeChild(anchorElement);
  };
  return (
    <div className="flex flex-col gap-5 md:flex-row border-4 bg-gray-900 rounded-lg p-4">
      <img
        src={urls?.qr}
        className="h-32 object-contain ring-blue-500 ring border-2"
        alt="qr code"
      />
      <Link className="flex flex-col" to={`/link/${urls.id}`}>
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {urls?.title}
        </span>
        <span className="text-2xl text-blue-300 hover:underline cursor-pointer">
          {shortUrl}
        </span>
        <span className="text-xl hover:underline cursor-pointer">
          {urls?.original_url}
        </span>
        <span className="flex items-end flex-1 text-gray-400">
          {new Date(urls?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          className="border-2 border-blue-300"
          onClick={() => handleCopy()}
        >
          <Copy />
        </Button>
        <Button
          variant="ghost"
          className="border-2 border-blue-300"
          onClick={() => handleDownload()}
        >
          <Download />
        </Button>
        <Button variant="ghost" className="border-2 border-blue-300">
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
