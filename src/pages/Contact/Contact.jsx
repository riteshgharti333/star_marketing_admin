import { useMemo } from "react";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";

const Contact = ({ isDarkMode }) => {
  const reviewData = [
    {
      id: 1,
      name: "John Doe",
      Review: "Excellent product! Really helped me improve my productivity.",
      createdAt: "2023-11-15T10:23:00Z",
      phone: "+91 123456789",
    },
    {
      id: 2,
      name: "Jane Smith",
      Review: "Good value for the price, but the battery life could be better.",
      createdAt: "2023-12-05T14:45:00Z",
      phone: "+91 123456789",
    },
    {
      id: 3,
      name: "Michael Johnson",
      Review: "Customer support was super helpful when I had an issue.",
      createdAt: "2024-01-10T08:30:00Z",
      phone: "+91 123456789",
    },
    {
      id: 4,
      name: "Emily Davis",
      Review: "Not satisfied. The app crashes frequently on my phone.",
      createdAt: "2024-02-18T16:10:00Z",
      phone: "+91 123456789",
    },
    {
      id: 5,
      name: "Daniel Lee",
      Review: "Very user-friendly and intuitive interface.",
      createdAt: "2024-03-07T11:55:00Z",
      phone: "+91 123456789",
    },
    {
      id: 6,
      name: "Sophia Brown",
      Review: "Impressive features, especially the sleep tracking.",
      createdAt: "2024-04-01T09:20:00Z",
      phone: "+91 123456789",
    },
    {
      id: 7,
      name: "Chris Wilson",
      Review: "Decent product, but I expected more based on the reviews.",
      createdAt: "2024-04-15T13:40:00Z",
      phone: "+91 123456789",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      Review: "Love the sleek design and fast performance.",
      createdAt: "2024-04-28T07:15:00Z",
      phone: "+91 123456789",
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: (info) => info.getValue(),
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
          Contacts
        </h1>
      </div>

      <Table data={reviewData} columns={columns} path="contact" isDarkMode={isDarkMode} />
    </div>
  );
};

export default Contact;
