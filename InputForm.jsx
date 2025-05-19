import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as quillToWord from "quill-to-word";
import { toast } from "react-toastify";
import { StepContext } from "./context/StepContext";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Navbar from "./Navbar";
import Chat from "./components/Chat";

function InputForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);
  const [displaySteps, setDisplaySteps] = useState(true);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(StepContext);
  const [displayHome, setDisplayHome] = useState(false);

  // state for getting the currently active category
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    category.length > 0 ? category[0].id : 1
  );

  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    var flag = 0;

    for (let i = 1; i < data.length; i++) {
      const ques = data[i];
      if (formData[ques.ques_id] === "") {
        toast.error("Please answer all the questions before submitting!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          // bodyClassName:"custom-toast"
        });
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      window.scrollTo(0, 0);
      context.setStep2(true);
      // // context.setStep3(true);
      // const formData = new FormData(event.target);

      // // console.log(formData);
      // // formData.push(data[0].form_id);
      // const formDataObj = Object.fromEntries(formData.entries());
      // formDataObj.form_id = data[0].form_id;
      // // formData.push(data[0].form_id)
      const obj = formData;
      obj["form_id"] = data[0].form_id;
      console.log(obj);
      const formDataJsonString = JSON.stringify(obj);
      // console.log(formDataJsonString);

      setDisplayForm(false);

      fetch(`http://127.0.0.1:5000/api/final-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataJsonString,
      })
        .then((response) => response.json())
        .then((data) => {
          setContent(data.content);
          console.log(content);
        });
    }
  };

  const saveText = async () => {
    // if(context.setStep3 === false)
    window.scrollTo(0, 0);
    context.setStep3(true);
    context.setStep4(true);
    setDisplayHome(true);

    const contents = quillRef.current.getEditor().getContents();
    const quillToWordConfig = {
      exportAs: "blob",
    };
    const doc = await quillToWord.generateWord(contents, quillToWordConfig);
    console.log(doc);
    // const blob = new Blob([doc], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(doc);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "file.docx";
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("Document downloaded successfully!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      // bodyClassName:"custom-toast"
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:5000/api/form-details?form_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        var filteredObjects = res.filter((obj) =>
          obj.hasOwnProperty("category_name")
        );
        setCategory(filteredObjects);
        const arr = ["form_id", "category_id"];
        filteredObjects = res.filter((obj) =>
          arr.some((key) => obj.hasOwnProperty(key))
        );
        setData(filteredObjects);

        console.log(filteredObjects);
        const initialFormData = {};
        for (let i = 1; i < filteredObjects.length; i++) {
          const obj = filteredObjects[i];
          initialFormData[obj.ques_id] = "";
        }
        console.log(initialFormData);
        setFormData(initialFormData);
        // console.log(res);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log(data);
    // console.log(category);

    if (category.length > 0) {
      setActiveCategory(category[0].id);
    }
  }, [category]);

  const handleQuillChange = (html) => {
    context.setEdit((prev) => prev + 1);

    if (context.edit > 1) {
      context.setStep3(true);
    }

    setContent(html);
  };

  const navHome = () => {
    navigate("/");
  };

  const handleClick = (category) => {
    // console.log(category.id);
    setActiveCategory(category.id);
  };

  useEffect(() => {
    console.log(activeCategory);
  }, [activeCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
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
            <li className={`step ${context.step2 ? "step-primary" : ""} text-lg font-medium`}>Select Document</li>
            <li className={`step ${context.step2 ? "step-primary" : ""} text-lg font-medium`}>Fill Details</li>
            <li className={`step ${context.step3 ? "step-primary" : ""} text-lg font-medium`}>Edit Document</li>
            <li className={`step ${context.step4 ? "step-primary" : ""} text-lg font-medium`}>Download</li>
          </ul>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {data.length > 0 && (
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {data[0].form_name}
            </h1>
          )}

          {displayForm ? (
            <form onSubmit={handleSubmit}>
              <Tabs value={activeCategory}>
                <TabsHeader className="bg-gray-100/50 backdrop-blur-lg border border-gray-200 rounded-lg">
                  {category.map((c) => (
                    <Tab
                      key={c.id}
                      value={c.id}
                      onClick={() => handleClick(c)}
                      className={`font-medium text-sm sm:text-base ${
                        activeCategory === c.id
                          ? "text-blue-600 bg-white shadow-sm"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {c.category_name}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {data.map(
                      (ques, index) =>
                        index !== 0 &&
                        ques.category_id === activeCategory && (
                          <TabPanel key={ques.ques_id} value={ques.category_id}>
                            <div className="relative group">
                              <input
                                type={ques.ques_type}
                                name={ques.ques_id}
                                value={formData[ques.ques_id] || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                                  focus:border-blue-500 focus:ring-0 transition-all
                                  peer bg-gray-50/50 backdrop-blur-sm
                                  placeholder-transparent"
                                placeholder=" "
                                required
                              />
                              <label
                                className="absolute left-4 -top-2.5 px-1 bg-white text-gray-500 
                                  text-sm transition-all 
                                  peer-placeholder-shown:text-base 
                                  peer-placeholder-shown:text-gray-400 
                                  peer-placeholder-shown:top-3 
                                  peer-focus:-top-2.5 
                                  peer-focus:text-sm 
                                  peer-focus:text-blue-600
                                  pointer-events-none"
                              >
                                {ques.ques_label}
                              </label>
                              <div
                                className="absolute inset-0 rounded-lg border-2 border-transparent 
                                  pointer-events-none  transition-all"
                              />
                            </div>
                          </TabPanel>
                        )
                    )}
                  </div>
                </TabsBody>
              </Tabs>

              {category.length > 0 &&
                activeCategory === category[category.length - 1].id && (
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 
                        text-white rounded-lg hover:shadow-lg transition-all
                        font-medium hover:scale-[1.02] active:scale-95"
                    >
                      Generate Document
                    </button>
                  </div>
                )}
            </form>
          ) : (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Document</h2>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleQuillChange}
                className="border rounded-lg overflow-hidden preserve-linebreaks bg-white"
                ref={quillRef}
                id="editor"
              />
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={saveText}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white rounded-lg hover:shadow-lg transition-all
                    font-medium hover:scale-[1.02] active:scale-95"
                >
                  Download Document
                </button>
                {displayHome && (
                  <button
                    onClick={navHome}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg 
                      hover:bg-gray-200 transition-all font-medium
                      hover:scale-[1.02] active:scale-95"
                  >
                    Return Home
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputForm;
