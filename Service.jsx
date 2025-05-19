import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { StepContext } from "./context/StepContext";
import Chat from "./components/Chat";

function Service() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(true);
  const context = useContext(StepContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/forms?service_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Could not fetch data");

        const result = await response.json();
        setData(result);
        if (result.length > 0) setServiceName(result[0].service_name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, context]);

  const handleClick = () => {
    context.setStep1(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <div className="fixed bottom-6 right-6 z-50">
        <Chat />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-9">
        {/* Progress Steps */}
        <div className="mb-16">
          <ul className="steps steps-horizontal w-full">
            <li
              className={`step ${
                context.step1 ? "step-primary" : ""
              } text-lg font-medium`}
            >
              Select Document
            </li>
            <li
              className={`step ${
                context.step2 ? "step-primary" : ""
              } text-lg font-medium`}
            >
              Fill Details
            </li>
            <li
              className={`step ${
                context.step3 ? "step-primary" : ""
              } text-lg font-medium`}
            >
              Edit Document
            </li>
            <li
              className={`step ${
                context.step4 ? "step-primary" : ""
              } text-lg font-medium`}
            >
              Download
            </li>
          </ul>
        </div>

        {/* Service Title */}
        <h1 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {serviceName}
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-2xl font-medium text-gray-700">
              No Forms Available
            </h3>
            <p className="mt-2 text-gray-500">
              Please contact legal support for assistance.
            </p>
          </div>
        )}

        {/* Documents Grid */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data.map((form) => (
              <Link
                to={`/form/${form.form_id}`}
                key={form.form_id}
                onClick={handleClick}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold ml-4 text-gray-800">
                      {form.form_name}
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                      <span>View Document</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Service;
