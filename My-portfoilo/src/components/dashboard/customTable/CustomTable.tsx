import { DecodedToken } from "@/Types/CustomJWTDecoded";
import Link from "next/link";
import React from "react";
import Button from "../../ul/Button";
import "./style.css";
import Image from "next/image";

type HandilProps = {
  data: {
    data: DecodedToken[];
  };
  getImageUrl: (avatar: string | undefined) => string;
  editPath: string;
  deleteUser: (id: number) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  TableName: string;
  headerName1: string;
  headerName2: string;
  headerName3: string;
  headerName4: string;
  headerName5: string;
  buttonLabel: string;
};

const CustomTable = ({
  data,
  getImageUrl,
  editPath,
  deleteUser,
  handlePageChange,
  currentPage,
  totalPages,
  TableName,
  headerName1,
  headerName2,
  headerName3,
  headerName4,
  headerName5,
  buttonLabel,
}: HandilProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{TableName}</h2>
        <Button label={buttonLabel} href="/dashboard/users/addUser" />
      </div>

      <div className="grid-container">
        <div className="box-2">
          <div className="table-container">
            <table className="table-ocean">
              <thead>
                <tr>
                  <th>{headerName1}</th>
                  <th>{headerName2}</th>
                  <th>{headerName3}</th>
                  <th>{headerName4}</th>
                  <th>{headerName5}</th>
                </tr>
              </thead>
              <tbody>
                {data?.data &&
                  data.data.map((user: DecodedToken, key: number) => (
                    <tr key={key}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Image
                          src={getImageUrl(user.avatar)}
                          alt={user.name || "User avatar"}
                          width={50}
                          height={50}
                          style={{ borderRadius: "4px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            href={`${editPath}/${user.id}`}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#3b82f6",
                              color: "white",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
                              textDecoration: "none",
                            }}
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => user.id && deleteUser(user.id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#ef4444",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* pagention */}
            <div className="w-full flex justify-center mt-9">
              <div className="min-w-[500px] md:min-w-[500px] lg:min-w-[600px] max-w-full">
                <nav aria-label="Pagination">
                  <ul className="flex justify-center items-center flex-wrap gap-3">
                    {/* Previous */}
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                      >
                        &laquo;
                      </button>
                    </li>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 rounded-md border transition ${
                            currentPage === i + 1
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    {/* Next */}
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
