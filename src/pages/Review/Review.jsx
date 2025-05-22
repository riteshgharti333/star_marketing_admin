import { useMemo } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";

const Review = ({ isDarkMode }) => {
  const [reviewData, setReviewData] = useState([]);


  useEffect(() => {
    const reviewAllData = async () => {
      const { data } = await axios.get(`${baseUrl}/review/all-reviews`);
      if (data && data.success) {
        setReviewData(data.reviews);
      }
    };
    reviewAllData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Review",
        cell: (info) => {
          const value = info.getValue();
          const words = value.split(" ");
          return words.length <= 5
            ? value
            : words.slice(0, 5).join(" ") + " ...";
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(" ", " ");
        },
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Review
        </h1>

        <Link to={"/review/new-review"} className="btn-primary">
          {" "}
          Add New Review
        </Link>
      </div>

      <Table data={reviewData} columns={columns} path="review" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Review;
