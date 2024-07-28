import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import useFetch from "@/Hooks/useFetch";
import { getUrls } from "@/db/urls";
import { urlContextState } from "@/context";
import { getClicks } from "@/db/clicks";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = urlContextState();
  // console.log(user)
  const { loading, error, data, fn: fnUrls } = useFetch(getUrls, user?.id);
  const {
    loading: loadingClick,
    error: errorClick,
    data: clickData,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    data?.map((url) => url?.id)
  );
  useEffect(() => {
    fnUrls();
  }, []);
  useEffect(() => {
    if (clickData?.length) fnClicks();
  }, [clickData?.length]);
  const filterUrlData = data?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filterUrlData);
  return (
    <div className="p-5">
      {loading ||
        (loadingClick && <BarLoader color="#3d6ef3" width={"100%"} />)}
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p>10</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between justify-center items-center">
        <h1 className="font-bold text-5xl py-8">My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links"
          onChange={(e) => e.target.value}
          value={searchQuery}
        />
        <Filter className="absolute top-2 p-1 right-1" />
      </div>
      {error && <Error message={error?.message} />}
      {/* //Need to check for search parmas   */}
      {/* {urls} */}
      {/* {data.title} */}
      {filterUrlData?.map((urlData) => {
        return (
          <div key={urlData.id}>
            <LinkCard />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
